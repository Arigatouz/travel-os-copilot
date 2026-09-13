/* ============================================
   Travel Co-Pilot — Shared Trip State
   Single source of truth. User UI and AI co-pilot
   both call these same methods. Persists to localStorage,
   emits change events so every panel stays in sync.
   ============================================ */
(function () {
  const KEY = 'tcp_trip_v1';
  const AUTH_KEY = 'tcp_auth_v1';

  const SEED = {
    name: 'Japan — Neon Circuit',
    region: 'Japan',
    style: 'Urban + Culture',
    pace: 'Balanced',
    startDate: '2026-04-08',
    endDate: '2026-04-18',
    travelerCount: 2,
    travelers: [
      { id: 't1', name: 'Lead Traveler', type: 'Adult', notes: 'Window seat, vegetarian' },
      { id: 't2', name: 'Companion', type: 'Adult', notes: '' }
    ],
    budget: 6200,
    currency: 'USD',
    stops: [
      { id: 's1', name: 'Tokyo', location: 'Kantō, Japan', day: 1, nights: 4, status: 'confirmed',
        costTier: 3, x: 0.74, y: 0.46, activities: ['teamLab Planets', 'Shibuya night walk', 'Tsukiji breakfast'] },
      { id: 's2', name: 'Hakone', location: 'Kanagawa, Japan', day: 5, nights: 1, status: 'confirmed',
        costTier: 2, x: 0.68, y: 0.52, activities: ['Open-Air Museum', 'Onsen ryokan'] },
      { id: 's3', name: 'Kyoto', location: 'Kansai, Japan', day: 6, nights: 3, status: 'suggested',
        costTier: 2, x: 0.55, y: 0.55, activities: ['Fushimi Inari at dawn', 'Arashiyama bamboo'] }
    ]
  };

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return JSON.parse(JSON.stringify(SEED));
  }
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  const listeners = new Set();
  function emit(detail) {
    persist();
    listeners.forEach(fn => { try { fn(state, detail || {}); } catch (e) { console.error(e); } });
    window.dispatchEvent(new CustomEvent('trip:change', { detail: detail || {} }));
  }

  // ---------- derived ----------
  function daysBetween(a, b) {
    if (!a || !b) return 0;
    const d = (new Date(b) - new Date(a)) / 86400000;
    return d >= 0 ? Math.round(d) + 1 : 0;
  }
  function derived() {
    const t = state;
    const totalNights = t.stops.reduce((s, x) => s + (Number(x.nights) || 0), 0);
    const dateDays = daysBetween(t.startDate, t.endDate);
    return {
      totalDays: dateDays || (totalNights + (t.stops.length ? 1 : 0)),
      totalNights,
      stopCount: t.stops.length,
      travelerCount: Number(t.travelerCount) || t.travelers.length,
      estCost: estimateCost(t),
      confirmed: t.stops.filter(s => s.status === 'confirmed').length,
      suggested: t.stops.filter(s => s.status === 'suggested').length,
      conflicts: conflicts(t),
      completion: completion(t)
    };
  }
  function estimateCost(t) {
    // rough per-stop estimate driven by cost tier + nights + travelers
    const tierRate = { 1: 120, 2: 210, 3: 340, 4: 520 };
    const pax = Number(t.travelerCount) || t.travelers.length || 1;
    const stops = t.stops.reduce((s, x) => s + (tierRate[x.costTier] || 200) * (Number(x.nights) || 1), 0);
    return Math.round((stops * pax * 0.6 + pax * 850)); // lodging+activities + flights baseline
  }
  function conflicts(t) {
    const out = [];
    if (t.startDate && t.endDate && new Date(t.endDate) < new Date(t.startDate))
      out.push({ level: 'danger', msg: 'End date is before start date.' });
    const nights = t.stops.reduce((s, x) => s + (Number(x.nights) || 0), 0);
    const span = daysBetween(t.startDate, t.endDate);
    if (span && nights > span)
      out.push({ level: 'warning', msg: `Stops total ${nights} nights but trip window is only ${span} days.` });
    if (t.stops.some(s => s.status === 'suggested'))
      out.push({ level: 'warning', msg: `${t.stops.filter(s=>s.status==='suggested').length} stop(s) still need confirmation.` });
    return out;
  }
  function completion(t) {
    let done = 0, total = 5;
    if (t.name) done++;
    if (t.startDate && t.endDate) done++;
    if ((Number(t.travelerCount) || t.travelers.length) > 0) done++;
    if (t.stops.length > 0) done++;
    if (t.stops.length && t.stops.every(s => s.status === 'confirmed')) done++;
    return Math.round((done / total) * 100);
  }

  function uid(p) { return p + Math.random().toString(36).slice(2, 8); }

  // ---------- public API (used by UI AND AI tools) ----------
  const Store = {
    get: () => state,
    derived,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },

    updateTrip(patch, meta) {
      Object.assign(state, patch);
      emit({ type: 'trip', ...(meta || {}) });
    },

    addStop(stop, meta) {
      const last = state.stops[state.stops.length - 1];
      const day = last ? last.day + (Number(last.nights) || 1) : 1;
      const full = Object.assign({
        id: uid('s'), name: 'New Stop', location: '', day, nights: 2,
        status: 'suggested', costTier: 2, x: 0.5, y: 0.5, activities: []
      }, stop);
      state.stops.push(full);
      resequence();
      emit({ type: 'stop:add', id: full.id, source: (meta && meta.source) || 'user' });
      return full;
    },

    removeStop(id, meta) {
      state.stops = state.stops.filter(s => s.id !== id);
      resequence();
      emit({ type: 'stop:remove', id, source: (meta && meta.source) || 'user' });
    },

    updateStop(id, patch, meta) {
      const s = state.stops.find(s => s.id === id);
      if (s) Object.assign(s, patch);
      resequence();
      emit({ type: 'stop:update', id, source: (meta && meta.source) || 'user' });
    },

    reorderStops(order, meta) {
      // order = array of ids
      const map = Object.fromEntries(state.stops.map(s => [s.id, s]));
      state.stops = order.map(id => map[id]).filter(Boolean);
      resequence();
      emit({ type: 'stop:reorder', source: (meta && meta.source) || 'user' });
    },

    moveStop(id, dir, meta) {
      const i = state.stops.findIndex(s => s.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= state.stops.length) return;
      [state.stops[i], state.stops[j]] = [state.stops[j], state.stops[i]];
      resequence();
      emit({ type: 'stop:reorder', id, source: (meta && meta.source) || 'user' });
    },

    reset() { state = JSON.parse(JSON.stringify(SEED)); emit({ type: 'reset' }); },
    snapshot() { return JSON.stringify(state); },
    replace(json, meta) {
      try { state = typeof json === 'string' ? JSON.parse(json) : json; } catch (e) { return; }
      emit({ type: 'replace', source: (meta && meta.source) || 'user' });
    },
    clear() {
      state = { name: '', region: '', style: '', pace: 'Balanced', startDate: '', endDate: '',
        travelerCount: 1, travelers: [{ id: 't1', name: 'Lead Traveler', type: 'Adult', notes: '' }],
        budget: 0, currency: 'USD', stops: [] };
      emit({ type: 'clear' });
    }
  };

  function resequence() {
    let day = 1;
    state.stops.forEach(s => { s.day = day; day += (Number(s.nights) || 1); });
  }

  // ---------- auth (mock) ----------
  const Auth = {
    isAuthed() { try { return localStorage.getItem(AUTH_KEY) === '1'; } catch (e) { return false; } },
    signIn() { try { localStorage.setItem(AUTH_KEY, '1'); } catch (e) {} },
    signOut() { try { localStorage.removeItem(AUTH_KEY); } catch (e) {} }
  };

  window.TripStore = Store;
  window.TripAuth = Auth;
})();

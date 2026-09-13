/* ============================================
   App shell: rail nav, command bar, toasts, theme, tweaks.
   Each page sets <body data-route="..."> and calls Shell.mount().
   ============================================ */
(function () {
  const NAV = [
    { group: 'Workspace', items: [
      { id: 'dashboard', label: 'Dashboard', href: 'index.html', icon: 'dashboard' },
      { id: 'search', label: 'Search', href: 'search.html', icon: 'search' },
      { id: 'builder', label: 'Itinerary', href: 'builder.html', icon: 'clipboard' },
      { id: 'planner', label: 'Day Planner', href: 'planner.html', icon: 'route' },
    ]},
    { group: 'Intelligence', items: [
      { id: 'copilot', label: 'Co-Pilot', href: 'copilot.html', icon: 'sparkles', badge: 'AI' },
    ]},
    { group: 'Finalize', items: [
      { id: 'review', label: 'Review', href: 'review.html', icon: 'checkCircle' },
      { id: 'states', label: 'States', href: 'states.html', icon: 'layers' },
    ]},
  ];

  /* ---------- Tweaks (cross-page via localStorage) ---------- */
  const TWEAK_KEY = 'tcp_tweaks_v1';
  const TWEAK_DEFAULTS = { accent: 'cyan', glow: 1, grid: true, density: 'comfortable', mono: false };
  const ACCENTS = {
    cyan:    { c: '#00f3ff', rgb: '0, 243, 255' },
    magenta: { c: '#ff00ff', rgb: '255, 0, 255' },
    violet:  { c: '#ba84ff', rgb: '186, 132, 255' },
    green:   { c: '#05ffa1', rgb: '5, 255, 161' },
  };
  function loadTweaks() {
    try { return Object.assign({}, TWEAK_DEFAULTS, JSON.parse(localStorage.getItem(TWEAK_KEY) || '{}')); }
    catch (e) { return Object.assign({}, TWEAK_DEFAULTS); }
  }
  let tweaks = loadTweaks();
  function applyTweaks() {
    const root = document.documentElement;
    const a = ACCENTS[tweaks.accent] || ACCENTS.cyan;
    if (!root.classList.contains('light')) {
      root.style.setProperty('--accent', a.c);
      root.style.setProperty('--accent-rgb', a.rgb);
    } else {
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-rgb');
    }
    root.style.setProperty('--glow-strength', String(tweaks.glow));
    root.style.setProperty('--density', tweaks.density === 'compact' ? '0.8' : '1');
    document.body.classList.toggle('no-grid', !tweaks.grid);
    document.body.style.fontFamily = tweaks.mono ? 'var(--font-mono)' : 'var(--font-sans)';
  }
  function saveTweaks() {
    try { localStorage.setItem(TWEAK_KEY, JSON.stringify(tweaks)); } catch (e) {}
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: tweaks }, '*'); } catch (e) {}
  }

  /* ---------- Theme ---------- */
  const THEME_KEY = 'tcp_theme_v1';
  function loadTheme() { try { return localStorage.getItem(THEME_KEY) || 'dark'; } catch (e) { return 'dark'; } }
  function applyTheme(t) {
    document.documentElement.classList.toggle('light', t === 'light');
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    applyTweaks();
  }

  /* ---------- Toast ---------- */
  function toast(opts) {
    if (typeof opts === 'string') opts = { msg: opts };
    const wrap = document.getElementById('toasts') || (function () {
      const w = document.createElement('div'); w.className = 'toast-wrap'; w.id = 'toasts';
      document.body.appendChild(w); return w;
    })();
    const kind = opts.kind || 'success';
    const ic = { success: 'checkCircle', warning: 'alert', danger: 'x', info: 'info' }[kind] || 'checkCircle';
    const el = document.createElement('div');
    el.className = 'toast ' + kind;
    el.innerHTML = `${window.icon(ic, 18)}<div><div class="t-title">${opts.title || kind}</div>
      <div class="t-msg">${opts.msg || ''}</div></div>`;
    wrap.appendChild(el);
    setTimeout(() => { el.style.transition = 'opacity .3s, transform .3s';
      el.style.opacity = '0'; el.style.transform = 'translateX(40px)';
      setTimeout(() => el.remove(), 320); }, opts.duration || 3200);
  }
  window.toast = toast;

  /* ---------- Render rail ---------- */
  function renderRail(route) {
    const groups = NAV.map(g => `
      <div class="nav-group-label">${g.group}</div>
      ${g.items.map(it => `
        <a class="nav-item ${it.id === route ? 'active' : ''}" href="${it.href}">
          ${window.icon(it.icon, 18)}<span>${it.label}</span>
          ${it.badge ? `<span class="badge pill solid" style="font-size:8px;padding:2px 7px">${it.badge}</span>` : ''}
        </a>`).join('')}
    `).join('');
    return `
      <div class="rail-head">
        <a class="logo" href="index.html">
          <div class="logo-mark">&gt;_</div>
          <div class="logo-txt">Co-Pilot<small>TRAVEL OS</small></div>
        </a>
      </div>
      <nav class="nav">${groups}</nav>
      <div class="rail-foot">
        <div class="account" id="account-btn">
          <div class="avatar">AK</div>
          <div class="account-meta">
            <b>Ali Karim</b><span>● Signed in</span>
          </div>
        </div>
      </div>`;
  }

  /* ---------- Render topbar ---------- */
  function renderTopbar(opts) {
    const d = window.TripStore.derived();
    const t = window.TripStore.get();
    return `
      <div class="crumbs">
        <span>${opts.crumb || 'Workspace'}</span>
        <span class="sep">/</span>
        <b>${opts.title || 'Dashboard'}</b>
      </div>
      <div class="topbar-spacer"></div>
      <a class="trip-chip" href="review.html" title="Active trip">
        <span class="dot"></span>
        <b>${t.name || 'Untitled trip'}</b>
        <span class="muted">· ${d.totalDays}d · ${d.stopCount} stops</span>
      </a>
      <button class="icon-btn" id="sync-btn" title="All changes saved">${window.icon('save', 18)}</button>
      <button class="icon-btn" id="theme-btn" title="Toggle theme">${window.icon(document.documentElement.classList.contains('light') ? 'moon' : 'sun', 18)}</button>
      <button class="icon-btn" id="tweaks-btn" title="Tweaks" style="display:none">${window.icon('sliders', 18)}</button>`;
  }

  function refreshTopbar(opts) {
    const tb = document.getElementById('topbar');
    if (tb) { tb.innerHTML = renderTopbar(opts); wireTopbar(opts); }
  }

  function wireTopbar(opts) {
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) themeBtn.onclick = () => {
      const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
      applyTheme(next); refreshTopbar(opts);
    };
    const tw = document.getElementById('tweaks-btn');
    if (tw) tw.onclick = () => toggleTweaks(true);
    const sync = document.getElementById('sync-btn');
    if (sync) sync.onclick = () => toast({ title: 'Synced', msg: 'Trip state saved to your workspace.' });
  }

  /* ---------- Tweaks panel UI ---------- */
  function buildTweaksPanel() {
    let root = document.getElementById('tweaks-root');
    if (!root) { root = document.createElement('div'); root.id = 'tweaks-root'; document.body.appendChild(root); }
    const accentBtns = Object.entries(ACCENTS).map(([k, v]) =>
      `<button class="tw-swatch ${tweaks.accent === k ? 'on' : ''}" data-accent="${k}"
        style="background:${v.c}" title="${k}"></button>`).join('');
    root.innerHTML = `
      <div class="tw-panel" id="tw-panel">
        <div class="tw-head">
          <span class="kicker">Tweaks</span>
          <button class="tw-close" id="tw-close">${window.icon('x', 16)}</button>
        </div>
        <div class="tw-body">
          <div class="tw-row"><label>Accent</label><div class="tw-swatches">${accentBtns}</div></div>
          <div class="tw-row"><label>Glow intensity</label>
            <input type="range" id="tw-glow" min="0" max="1.6" step="0.2" value="${tweaks.glow}"></div>
          <div class="tw-row"><label>Density</label>
            <div class="tw-seg" id="tw-density">
              <button data-v="comfortable" class="${tweaks.density==='comfortable'?'on':''}">Comfortable</button>
              <button data-v="compact" class="${tweaks.density==='compact'?'on':''}">Compact</button>
            </div></div>
          <div class="tw-row between"><label>Grid background</label>
            <button class="tw-toggle ${tweaks.grid?'on':''}" id="tw-grid"><span></span></button></div>
          <div class="tw-row between"><label>Mono body font</label>
            <button class="tw-toggle ${tweaks.mono?'on':''}" id="tw-mono"><span></span></button></div>
        </div>
      </div>`;
    // swatches
    root.querySelectorAll('[data-accent]').forEach(b => b.onclick = () => {
      tweaks.accent = b.dataset.accent; applyTweaks(); saveTweaks(); buildTweaksPanel(); openPanel(); });
    root.querySelector('#tw-glow').oninput = e => { tweaks.glow = parseFloat(e.target.value); applyTweaks(); saveTweaks(); };
    root.querySelectorAll('#tw-density button').forEach(b => b.onclick = () => {
      tweaks.density = b.dataset.v; applyTweaks(); saveTweaks(); buildTweaksPanel(); openPanel(); });
    root.querySelector('#tw-grid').onclick = () => { tweaks.grid = !tweaks.grid; applyTweaks(); saveTweaks(); buildTweaksPanel(); openPanel(); };
    root.querySelector('#tw-mono').onclick = () => { tweaks.mono = !tweaks.mono; applyTweaks(); saveTweaks(); buildTweaksPanel(); openPanel(); };
    root.querySelector('#tw-close').onclick = () => { toggleTweaks(false);
      try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {} };
  }
  function openPanel() { const p = document.getElementById('tw-panel'); if (p) p.classList.add('open'); }
  function toggleTweaks(on) {
    buildTweaksPanel();
    const p = document.getElementById('tw-panel');
    if (p) p.classList.toggle('open', on);
    const btn = document.getElementById('tweaks-btn');
    if (btn) btn.style.display = '';
  }

  /* ---------- Mount ---------- */
  function mount(opts) {
    opts = opts || {};
    applyTheme(loadTheme());
    applyTweaks();
    const rail = document.getElementById('rail');
    if (rail) rail.innerHTML = renderRail(opts.route);
    refreshTopbar(opts);
    const acct = document.getElementById('account-btn');
    if (acct) acct.onclick = () => { window.location.href = 'auth.html'; };

    // keep topbar trip chip live
    window.TripStore.subscribe(() => refreshTopbar(opts));

    // Tweaks host protocol — listener first, then announce
    window.addEventListener('message', (e) => {
      const t = e.data && e.data.type;
      if (t === '__activate_edit_mode') toggleTweaks(true);
      if (t === '__deactivate_edit_mode') toggleTweaks(false);
    });
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
    // expose tweaks button always too
    const twBtn = document.getElementById('tweaks-btn');
    if (twBtn) twBtn.style.display = '';
  }

  window.Shell = { mount, toast, refreshTopbar };
})();

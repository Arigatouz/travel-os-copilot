# خريطة الحلقات

12 حلقة، كل واحدة مربوطة بـ route من التطبيق و feature واحدة في Angular. التواريخ خطة عمل، مش وعد نشر.

| Episode | Route | الموضوع الأساسي | Tag | الحالة |
|---|---|---|---|---|
| TOS-001 | `/states` + guest screen | أول شاشة ببيانات fixture و outcome واحد ظاهر | `tos-001` | مخطط |
| TOS-002 | `/` dashboard | trip state model المشترك | `tos-002` | مخطط |
| TOS-003 | `/search` | destination search | `tos-003` | مخطط |
| TOS-004 | `/builder` | بناء itinerary متعدد الخطوات | `tos-004` | مخطط |
| TOS-005 | `/planner` | ترتيب وتوزيع الـ stops | `tos-005` | مخطط |
| TOS-006 | `/planner` | edit و remove stop | `tos-006` | مخطط |
| TOS-007 | `/auth` | authentication gateway | `tos-007` | مخطط |
| TOS-008 | `/review` | validate و budget | `tos-008` | مخطط |
| TOS-009 | `/states` | state gallery لكل حالات الـ UI | `tos-009` | مخطط |
| TOS-010 | `/copilot` | AI tool actions مع diff ظاهر | `tos-010` | مخطط |
| TOS-011 | `/copilot` | تجربة المحادثة و streaming | `tos-011` | مخطط |
| TOS-012 | `/review` | review و export و undo policy | `tos-012` | مخطط |

## قواعد الـ scope

- كل حلقة بتشرح slice ضيقة، مش الـ curriculum كله.
- أي API claim لازم يتأكد من Angular documentation أو من الـ `.d.ts` بتاع الـ package المثبت قبل التصوير.
- لو feature مش شغالة فعلًا، متتقالش إنها شغالة في الفيديو.

## Routes التطبيق كامل

| Route | الغرض |
|---|---|
| `/auth` | authentication gateway |
| `/` أو `/dashboard` | مركز التحكم في الرحلة وحالة الـ co-pilot |
| `/search` | البحث عن الوجهات |
| `/builder` | بناء الـ itinerary |
| `/planner` | ترتيب أيام الرحلة |
| `/copilot` | مساحة الـ AI مع إظهار الـ tools |
| `/review` | مراجعة الرحلة والميزانية |
| `/states` | معرض حالات الـ UI للتطوير و QA |

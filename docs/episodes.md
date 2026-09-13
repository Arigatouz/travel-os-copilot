# خريطة الحلقات

الحلقات الـ 12 هي الـ 12 درس بناء من كورس "Angular 21 & 22 — Zero to Advanced" اللي فيه 49 درس. كل حلقة هي الـ Co-Pilot Build (أو Capstone) اللي بيختم module من الـ 12 module، وبتتبني عليها فيه feature حقيقية في التطبيق.

العناوين دي منزل من مصدر إنجليزي، ولسه مش متأكدة من Angular docs. أي API claim بيتذكر في فيديو لازم يتأكد من documentation أو من `.d.ts` بتاع الـ package المثبت قبل التصوير.

## الحلقات والمصدر

| Episode | Module | Co-Pilot build lesson | مصدر الدرس | تحضير |
|---|---|---|---|---|
| TOS-001 | 1 — Foundations & The New Era | Co-Pilot Build #1: Scaffolding the Agentic Travel App (Zoneless Shell) | 05 | 01-04 |
| TOS-002 | 2 — Templates & Components | Co-Pilot Build #2: Destination Cards & Itinerary UI with New Control Flow | 10 | 06-09 |
| TOS-003 | 3 — Signals: The New Reactivity | Co-Pilot Build #3: The Signal-Based Trip Store (No NgRx) | 15 | 11-14, 16-17 |
| TOS-004 | 4 — Services, DI & Routing | Co-Pilot Build #4: Routing, Guards & Lazy Panels for the Trip Planner | 20 | 18 |
| TOS-005 | 5 — Forms: The Signal Forms Era | Co-Pilot Build #5: The Itinerary Builder with Signal Forms | 23 | 21-22 |
| TOS-006 | 6 — Data Fetching & HTTP | Co-Pilot Build #6: Live Destination Data with httpResource | 26 | 24-25 |
| TOS-007 | 7 — Architecture & Advanced Components | Co-Pilot Build #7: Refactoring to a Scalable, Selectorless Architecture | 31 | 28-30 |
| TOS-008 | 8 — Performance, SSR & Hydration | Co-Pilot Build #8: SSR, Incremental Hydration & @defer for Speed | 35 | 32-34 |
| TOS-009 | 9 — Testing the Modern Way | Co-Pilot Build #9: Testing the App with Vitest & Playwright | 39 | 36-38 |
| TOS-010 | 10 — AI-Native Angular | Co-Pilot Build #10: WebMCP Tools — Let the AI Agent Drive the App | 41 | 40 |
| TOS-011 | 10 — AI-Native Angular | Co-Pilot Build #11: The Streaming AI Chat Panel (Zoneless) | 42 | — |
| TOS-012 | 12 — Capstone & Career | Capstone Finale Part 1 + Part 2 | 46-47 | 45 |

## دروس خارج السنة الأولى

الدروس دي في الـ curriculum بس مش جزء من الـ 12 حلقة السنة الأولى. ممكن تبقى deep dive بعدين:

- 19 — injectAsync & Lazy Services
- 27 — Selectorless Components
- 43 — Nx Monorepos for Angular
- 44 — Migrating Legacy Angular to v21/v22
- 49 — Your Angular Roadmap After This Course

Module 11 (Tooling, Nx & Migration) ملهاش حلقة في السنة الأولى؛ دروسها (43، 44) في الـ backlog.

## ملاحظات على الـ scope

- الحلقة الواحدة بتشرح slice ضيقة، مش الـ curriculum كله. تحضير كل حلقة هو دروس متراكمة بتتشرح مشاهد منفصلة، مش 49 فيديو متضغوط في 12.
- TOS-012 بيجمع جزءين Capstone في حلقة واحدة.
- TOS-001 محدودة على شاشة guest ببيانات fixture و outcome واحد ظاهر. مفيش AI، ولا بيانات سفر live، ولا authentication، ولا deployment. التفاصيل في [tos-001-scope.md](tos-001-scope.md).
- أي عنوان درس أو feature هنا بيفضل "مصدر عنوان فقط" لحد ما MSM-004 يوثقه مقابل Angular docs والـ `.d.ts`.
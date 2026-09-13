# TOS-001: أول شاشة

## الـ outcome الواحد الظاهر

المستخدم يفتح شاشة الرحلة كـ guest، يشوف رحلة جاهزة من fixture data فيها عدد من الـ stops، وبعدين نغير value واحدة في الـ fixture ونشوف الشاشة بتعكس التغيير.

ده هو كل الـ episode. حاجة واحدة تقدر تشاور عليها على الكاميرا وتقول: ده اللي بنى نفسه من الكود ده.

## داخل الـ scope

- شاشة واحدة تعرض trip من fixture.
- عرض قائمة الـ stops.
- تغيير value واحدة في الـ fixture ويظهر أثره على الشاشة.
- check واحد ناجح على الـ behavior المعروض.

## خارج الـ scope

- authentication حقيقي.
- بيانات سفر live أو أي API خارجي.
- أي AI response أو tool call.
- persistence أو database.
- deployment أو hosting.
- باقي الـ 7 routes.

## Acceptance

- الكود متسجل على tag `tos-001`.
- في check واحد ناجح على الـ behavior اللي ظهر في الفيديو.
- الإصدارات المثبتة متسجلة في `docs/versions.md`.
- كل API claim في الفيديو له مصدر من Angular documentation أو من `.d.ts` بتاع الـ package.

## الـ fixture

بيانات الرحلة التجريبية في [`../fixtures/trip.fixture.json`](../fixtures/trip.fixture.json). ثابتة ومقصودة تكون قليلة، عشان الشاشة تفضل مقروءة في الفيديو.

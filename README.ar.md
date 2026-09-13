# Travel OS Copilot

مساحة عمل لتخطيط السفر بمساعدة AI، بنتبنيها على الكاميرا خطوة بخطوة في سلسلة Angular و AI على قناة [@ArabicAngular](https://www.youtube.com/@ArabicAngular).

الشرح بالعامية المصرية والكود كله بالإنجليزي.

English version: [README.md](README.md)

## الفكرة

كل حلقة بتبني slice صغيرة من التطبيق وبتشرح feature واحدة في Angular بشكل واضح. التطبيق نفسه هو وسيلة التعليم، مش مجرد demo مصطنع.

الأساس التقني المقصود:

- كل الـ routes بتشترك في trip state model واحد.
- الـ AI co-pilot بيستخدم نفس الـ six domain tools اللي المستخدم بيستخدمها: `search`, `add_stop`, `remove_stop`, `reorder_itinerary`, `edit_stop`, `get_trip_state`.
- أي تغيير بيعمله الـ AI لازم يكون visible و reversible.

## الحالة الحالية

التطبيق في أول الطريق. مفيش build شغال ولا AI متوصل ولا authentication لسه.

أول حلقة TOS-001 محدودة على: guest demo screen ببيانات fixture و outcome واحد ظاهر على الشاشة.

مش داخل في TOS-001: real authentication، live travel data، AI responses، persistence، deployment.

## الحلقات

خريطة الحلقات و scope كل واحدة في [`docs/episodes.md`](docs/episodes.md).
تفاصيل أول حلقة في [`docs/tos-001-scope.md`](docs/tos-001-scope.md).

## الكود لكل حلقة

كل حلقة ليها git tag بنفس رقمها، يعني `tos-001` هو بالظبط الكود اللي ظهر في الفيديو.

```bash
git clone https://github.com/Arigatouz/travel-os-copilot.git
cd travel-os-copilot
git checkout tos-001
npm install
npm start
```

الـ `main` بيكمل بعد الحلقة، فلو بتتابع فيديو معين استخدم الـ tag بتاعه.

## التشغيل محليًا

الإصدارات الفعلية لـ Angular و Node بتتسجل مع أول commit للكود في [`docs/versions.md`](docs/versions.md)، ومش مكتوبة هنا قبل ما تتأكد من الـ `package.json` المثبت.

## المساهمة

الريبو ده أساسًا مادة تعليمية. لو لقيت غلطة تقنية أو حاجة غير واضحة في حلقة، افتح issue وقول رقم الحلقة والدقيقة.

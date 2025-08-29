document.addEventListener("DOMContentLoaded", function () {
    // التأكد من أن الـ DOM تم تحميله بالكامل قبل ربط الأحداث
    const calculateBtn = document.getElementById('calculateBtn');
    
    // التأكد من أن الزر موجود في DOM
    if (!calculateBtn) {
        console.error("الزر غير موجود في الصفحة");
        return;
    }

    calculateBtn.addEventListener('click', calculateMaterials);

    function calculateMaterials() {
        // الحصول على المدخلات من المستخدم
        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);
        const glassPrice = parseFloat(document.getElementById('glassPrice').value); // سعر متر مربع الكزاز

        // التحقق من صحة المدخلات
        if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0 || isNaN(glassPrice) || glassPrice <= 0) {
            alert("يرجى إدخال قيم صحيحة لجميع الحقول.");
            return;
        }

        // حساب المساحة (مربع الشباك)
        const area = (length * width) / 10000; // تحويل المساحة من سنتيمتر مربع إلى متر مربع

        // حساب المواد الأخرى
        const screws = 2; // السكرتين (عدد ثابت)
        const handle = 1; // يد الريشت (عدد ثابت)
        const wheels = 6; // العجلات (عدد ثابت)

        // حساب التكلفة
        const weight = area * 9; // وزن الشباك (كيلو)
        const materialCost = weight * 25; // تكلفة الشباك (بناءً على الوزن وسعر الكيلو)
        const screwsCost = screws * 9; // تكلفة السكرتين
        const handleCost = handle * 4; // تكلفة يد الريشت
        const wheelsCost = wheels * 1.25; // تكلفة العجلات

        // التكلفة الإجمالية قبل الزجاج
        const totalCostBeforeGlass = materialCost + screwsCost + handleCost + wheelsCost;

        // حساب مساحة الزجاج:
        const glassLength = length - 15.2; // الطول المعدل بعد تنقيص 15.2
        const glassWidth = (width - 2.7) / 2 - 5.7; // العرض المعدل بعد تنقيص 2.7 ثم القسمة على 2 ثم تنقيص 5.7

        const glassArea = (glassLength * glassWidth) / 10000; // حساب مساحة الزجاج (متر مربع)

        // حساب تكلفة الزجاج لكل كزازة
        const glassCost = glassArea * glassPrice; // تكلفة الزجاج (مساحة الزجاج × سعر متر مربع الزجاج)

        // حساب التكلفة الإجمالية للعدد الكلي من الكزازات (2 كزازات)
        const totalGlassCost = glassCost * 2; // تكاليف الزجاج للعدد الكامل من الكزازات

        // التكلفة الإجمالية بعد إضافة الزجاج
        const totalCost = totalCostBeforeGlass + totalGlassCost;

        // تأكد من وجود العناصر في DOM قبل محاولة تحديثها
        const elementsToUpdate = [
            'area', 'screws', 'handle', 'wheels', 
            'totalCostBeforeGlass', 'glassCost', 'totalCost',
            'glassArea', 'glassLength', 'glassWidth', 'glassCount'
        ];

        // تأكد من أن جميع العناصر موجودة في DOM
        elementsToUpdate.forEach(id => {
            const element = document.getElementById(id);
            if (!element) {
                console.error(`العنصر ${id} غير موجود`);
            }
        });

        // عرض النتائج
        document.getElementById('area').innerText = area.toFixed(2);
        document.getElementById('screws').innerText = screws;
        document.getElementById('handle').innerText = handle;
        document.getElementById('wheels').innerText = wheels;
        document.getElementById('totalCostBeforeGlass').innerText = totalCostBeforeGlass.toFixed(2);
        document.getElementById('glassCost').innerText = glassCost.toFixed(2);
        document.getElementById('totalGlassCost').innerText = totalGlassCost.toFixed(2);
        document.getElementById('totalCost').innerText = totalCost.toFixed(2);
        document.getElementById('glassArea').innerText = glassArea.toFixed(2);
        document.getElementById('glassCount').innerText = 2; // كزازتين (عدد ثابت)

        // عرض الأبعاد النهائية للزجاج:
        document.getElementById('glassLength').innerText = glassLength.toFixed(2);
        document.getElementById('glassWidth').innerText = glassWidth.toFixed(2);

        // إظهار النتيجة
        document.getElementById('result').style.display = 'block';
    }
});

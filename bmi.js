
(() => {
  const form = document.getElementById('bmiForm');
  const result = document.getElementById('bmiResult');
  if (!form || !result) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const weight = Number(document.getElementById('weight').value);
    const heightCm = Number(document.getElementById('height').value);

    if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
      result.textContent = 'يرجى إدخال قيم صحيحة.';
      return;
    }

    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    let label = '';

    if (bmi < 18.5) label = 'أقل من النطاق المعتاد';
    else if (bmi < 25) label = 'ضمن النطاق المعتاد';
    else if (bmi < 30) label = 'أعلى من النطاق المعتاد';
    else label = 'مرتفع';

    result.textContent = `مؤشر كتلة الجسم: ${bmi.toFixed(1)} — ${label}. النتيجة إرشادية فقط.`;
  });
})();

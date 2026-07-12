
(() => {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('bookingName').value.trim();
    const phone = document.getElementById('bookingPhone').value.trim();
    const service = document.getElementById('bookingService').value;
    const day = document.getElementById('bookingDay').value;
    const notes = document.getElementById('bookingNotes').value.trim();

    if (!name || !phone || !service || !day) {
      alert('يرجى إكمال الاسم ورقم الهاتف والخدمة واليوم.');
      return;
    }

    const message = [
      'مرحباً ماس جيم، أرغب بإرسال طلب حجز:',
      `الاسم: ${name}`,
      `رقم الهاتف: ${phone}`,
      `الخدمة: ${service}`,
      `اليوم: ${day}`,
      `ملاحظات: ${notes || 'لا توجد'}`
    ].join('\n');

    window.open(`https://wa.me/9647759648050?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
})();

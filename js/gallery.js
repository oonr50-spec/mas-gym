
(() => {
  const lightbox = document.getElementById('lightbox');
  const content = document.getElementById('lightboxContent');
  const close = document.getElementById('lightboxClose');
  if (!lightbox || !content || !close) return;

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-gallery]').forEach(item => {
    item.addEventListener('click', () => {
      content.textContent = item.dataset.gallery || 'MAS Gym';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      close.focus();
    });
  });

  close.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
})();

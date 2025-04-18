
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = 0;
      modal.style.left = 0;
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
      modal.style.display = 'flex';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      modal.style.zIndex = 1000;

      const popup = document.createElement('img');
      popup.src = img.src;
      popup.style.maxWidth = '90%';
      popup.style.maxHeight = '90%';
      popup.style.borderRadius = '10px';

      modal.appendChild(popup);
      document.body.appendChild(modal);

      modal.addEventListener('click', () => {
        modal.remove();
      });
    });
  });
});

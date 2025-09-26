// tutoriales.js

console.log("Tutoriales cargados");

// Videos de prueba que SÍ permiten embed (funcionan en cualquier lugar)
const videos = [
  {
    id: "tKj0q6ZzgWQ", // Cómo usar una calculadora científica
    title: "Cómo usar una calculadora científica"
  },
  {
    id: "L_jWHffIx5E", // Funciones básicas de la calculadora
    title: "Funciones básicas de la calculadora"
  }
];

let currentIndex = 0;

function renderCarousel() {
  const carouselInner = document.querySelector('.carousel-inner');
  carouselInner.innerHTML = '';

  videos.forEach(video => {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.innerHTML = `
      <div class="video-embed-container">
        <iframe 
          src="https://www.youtube.com/embed/${video.id}" 
          frameborder="0" 
          allowfullscreen
          class="youtube-embed">
        </iframe>
      </div>
      <h4>${video.title}</h4>
    `;
    carouselInner.appendChild(item);
  });

  updateTitle();
}

function updateTitle() {
  const titleEl = document.querySelector('.video-title');
  if (titleEl && videos[currentIndex]) {
    titleEl.textContent = videos[currentIndex].title;
  }
}

function nextVideo() {
  currentIndex = (currentIndex + 1) % videos.length;
  scrollToCurrent();
  updateTitle();
}

function prevVideo() {
  currentIndex = (currentIndex - 1 + videos.length) % videos.length;
  scrollToCurrent();
  updateTitle();
}

function scrollToCurrent() {
  const carouselInner = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  if (items[currentIndex]) {
    carouselInner.scrollTo({
      left: items[currentIndex].offsetLeft,
      behavior: 'smooth'
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCarousel();

  const leftBtn = document.querySelector('.title-arrow.left');
  const rightBtn = document.querySelector('.title-arrow.right');

  if (leftBtn) leftBtn.addEventListener('click', prevVideo);
  if (rightBtn) rightBtn.addEventListener('click', nextVideo);

  // Sincronización al hacer scroll manual
  const carouselInner = document.querySelector('.carousel-inner');
  if (carouselInner) {
    let scrollTimeout;
    carouselInner.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const items = Array.from(document.querySelectorAll('.carousel-item'));
        const scrollLeft = carouselInner.scrollLeft + carouselInner.offsetWidth / 2;
        let newIndex = 0;

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const center = item.offsetLeft + item.offsetWidth / 2;
          if (Math.abs(center - scrollLeft) < item.offsetWidth / 2) {
            newIndex = i;
            break;
          }
        }

        if (newIndex !== currentIndex) {
          currentIndex = newIndex;
          updateTitle();
        }
      }, 150);
    });
  }
});

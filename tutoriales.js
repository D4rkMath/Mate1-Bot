// tutoriales.js

// ✅ Datos de videos integrados directamente (sin JSON externo)
const videosData = [
  {
    title: "Tabular: FX-991LA CW",
    embedUrl: "https://www.youtube.com/embed/5Boyptd7wY8"
  },
  {
    title: "Tabular: FX-82MS",
    embedUrl: "https://www.youtube.com/embed/9i-y5DV-f3E"
  },
  {
    title: "Ecuaciones: FX-82MS",
    embedUrl: "https://www.youtube.com/embed/_ztzuv_hUEc"
  },
  {
    title: "Límites: FX-991CW",
    embedUrl: "https://www.youtube.com/embed/2DgH4wlJ-iA"
  }
];

// Renderiza los videos en el carrusel
function renderVideos() {
  const carouselInner = document.querySelector('.carousel-inner');
  const itemWidth = 280 + 15; // Ancho + gap

  // Limpiar contenedor
  carouselInner.innerHTML = '';

  // Crear items
  videosData.forEach(video => {
    const item = document.createElement('div');
    item.classList.add('carousel-item');
    item.innerHTML = `
      <div class="video-embed-container">
        <iframe 
          src="${video.embedUrl}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen 
          title="${video.title}"
          class="youtube-embed">
        </iframe>
      </div>
      <h4>${video.title}</h4>
    `;
    carouselInner.appendChild(item);
  });

  // Flechas de navegación
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');

  leftArrow.addEventListener('click', () => {
    carouselInner.scrollLeft -= itemWidth;
  });

  rightArrow.addEventListener('click', () => {
    carouselInner.scrollLeft += itemWidth;
  });
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', function() {
  renderVideos();
});

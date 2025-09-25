// tutoriales.js

console.log("Tutoriales cargados");

const carouselInner = document.querySelector('.carousel-inner');
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

// Ancho de un item + gap
const itemWidth = 280 + 15;

// Datos de los videos (integrados directamente)
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

// Función para crear un item de video
function createVideoItem(video, index) {
  const item = document.createElement('div');
  item.classList.add('carousel-item');
  item.innerHTML = `
    <div class="video-embed-container">
      <iframe 
        id="youtube-video-${index}" 
        src="${video.embedUrl}?enablejsapi=1&autoplay=0" 
        frameborder="0" 
        allowfullscreen 
        title="${video.title}"
        class="youtube-embed">
      </iframe>
    </div>
    <h4>${video.title}</h4>
  `;
  return item;
}

// Renderiza los videos en el carrusel
function renderVideos() {
  // Limpiar contenedor
  carouselInner.innerHTML = '';

  // Crear items
  videosData.forEach((video, index) => {
    const item = createVideoItem(video, index);
    carouselInner.appendChild(item);

    // Inicializar el reproductor de YouTube
    if (typeof YT !== 'undefined' && YT.Player) {
      new YT.Player(`youtube-video-${index}`, {
        events: {
          'onReady': (event) => {
            event.target.setVolume(50); // Establece el volumen inicial
          }
        }
      });
    } else {
      console.warn("YouTube API no cargada. El video se mostrará sin control de volumen.");
    }
  });

  // Lógica para las flechas
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

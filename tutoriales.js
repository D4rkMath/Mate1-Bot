// tutoriales.js

console.log("Tutoriales cargados");

// 1. Datos de los videos
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

// 2. Variables del DOM
const carouselInner = document.querySelector('.carousel-inner');
const itemWidth = 280 + 15; // Ancho del item + gap

// 3. Función para crear un item de video
function createVideoItem(video, index) {
  const item = document.createElement('div');
  item.classList.add('carousel-item');
  item.innerHTML = `
    <div class="video-embed-container">
      <iframe 
        id="youtube-video-${index}" 
        src="${video.embedUrl}?enablejsapi=1&autoplay=0" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen 
        title="${video.title}"
        class="youtube-embed">
      </iframe>
    </div>
    <h4>${video.title}</h4>
  `;
  return item;
}

// 4. Función para renderizar los videos
function renderVideos() {
  carouselInner.innerHTML = '';

  videosData.forEach((video, index) => {
    const item = createVideoItem(video, index);
    carouselInner.appendChild(item);

    // Inicializar reproductor si la API de YouTube está lista
    if (typeof YT !== 'undefined' && YT.Player) {
      new YT.Player(`youtube-video-${index}`, {
        events: {
          'onReady': (event) => {
            event.target.setVolume(50); // Establece el volumen inicial
          },
          'onStateChange': (event) => {
            // Ocultar flechas cuando el video empieza a reproducirse
            const leftArrow = document.querySelector('.carousel-arrow.left');
            const rightArrow = document.querySelector('.carousel-arrow.right');
            if (event.data === YT.PlayerState.PLAYING) {
              leftArrow.style.display = 'none';
              rightArrow.style.display = 'none';
            } else {
              leftArrow.style.display = 'flex';
              rightArrow.style.display = 'flex';
            }
          }
        }
      });
    }
  });

  // Flechas de navegación
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');

  if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
      carouselInner.scrollLeft -= itemWidth;
    });

    rightArrow.addEventListener('click', () => {
      carouselInner.scrollLeft += itemWidth;
    });
  }
}

// 5. Ejecutar al cargar
document.addEventListener('DOMContentLoaded', function() {
  renderVideos();
});

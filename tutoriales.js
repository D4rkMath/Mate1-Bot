// tutoriales.js

console.log("Tutoriales cargados");

const carouselInner = document.querySelector('.carousel-inner');
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

// Ancho de un item + gap
const itemWidth = 280 + 15;

// Función para cargar los videos
function loadVideos() {
  fetch('videos.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        carouselInner.innerHTML = '<div class="carousel-placeholder">No hay videos disponibles.</div>';
        return;
      }

      // Limpiar el carrusel
      carouselInner.innerHTML = '';

     // Dentro del bucle forEach en tutoriales.js
data.forEach(video => {
  const cleanUrl = video.embedUrl.trim(); // ← Elimina espacios
  const item = document.createElement('div');
  item.classList.add('carousel-item');
  item.innerHTML = `
    <div class="video-embed-container">
      <iframe 
        src="${cleanUrl}" 
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

      // Lógica para las flechas
      leftArrow.addEventListener('click', () => {
        carouselInner.scrollLeft -= itemWidth;
      });

      rightArrow.addEventListener('click', () => {
        carouselInner.scrollLeft += itemWidth;
      });
    })
    .catch(error => {
      console.error('Error al cargar los videos:', error);
      carouselInner.innerHTML = '<div class="carousel-placeholder">Error al cargar los videos.</div>';
    });
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', function() {
  loadVideos();
});

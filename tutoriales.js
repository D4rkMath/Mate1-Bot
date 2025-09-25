// tutoriales.js 
console.log("Tutoriales cargados");

const carouselInner = document.querySelector('.carousel-inner');
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');
const itemWidth = 280 + 15; // Ancho mínimo de .carousel-item + gap (ajusta si es necesario)

fetch('videos.json') // Cambia la ruta si el JSON está en otra carpeta, ej: 'data/videos.json'
  .then(response => response.json())
  .then(data => {
    if (data.length === 0) {
      carouselInner.innerHTML = '<div class="carousel-placeholder">No hay videos disponibles.</div>';
      return;
    }

    data.forEach(video => {
      const item = document.createElement('div');
      item.classList.add('carousel-item');
      item.innerHTML = `
        <div class="video-embed-container">
          <iframe src="${video.embedUrl}" frameborder="0" allowfullscreen></iframe>
        </div>
        <h4>${video.title}</h4>
      `;
      carouselInner.appendChild(item);
    });

    // Lógica para las flechas (scroll horizontal)
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

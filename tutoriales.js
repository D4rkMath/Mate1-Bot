// tutoriales.js

// Datos de los videos (puedes agregar más)
const tutorialVideos = {
  tabular: [
    { title: "Cómo tabular funciones", thumbnail: "https://i.ytimg.com/vi/VIDEO_ID_1/hqdefault.jpg", url: "https://www.youtube.com/watch?v=VIDEO_ID_1" },
    { title: "Tabulación paso a paso", thumbnail: "https://i.ytimg.com/vi/VIDEO_ID_2/hqdefault.jpg", url: "https://www.youtube.com/watch?v=VIDEO_ID_2" }
  ],
  dar-valores: [
    { title: "Dar valores a funciones", thumbnail: "https://i.ytimg.com/vi/VIDEO_ID_3/hqdefault.jpg", url: "https://www.youtube.com/watch?v=VIDEO_ID_3" },
    { title: "Ejercicios de evaluación", thumbnail: "https://i.ytimg.com/vi/VIDEO_ID_4/hqdefault.jpg", url: "https://www.youtube.com/watch?v=VIDEO_ID_4" }
  ],
  resolver-ecuaciones: [
    { title: "Resolver ecuaciones paso a paso", thumbnail: "https://i.ytimg.com/vi/VIDEO_ID_5/hqdefault.jpg", url: "https://www.youtube.com/watch?v=VIDEO_ID_5" },
    { title: "Métodos de resolución", thumbnail: "https://i.ytimg.com/vi/VIDEO_ID_6/hqdefault.jpg", url: "https://www.youtube.com/watch?v=VIDEO_ID_6" }
  ],
  limites: [
    { title: "Introducción a límites", thumbnail: "https://i.ytimg.com/vi/VIDEO_ID_7/hqdefault.jpg", url: "https://www.youtube.com/watch?v=VIDEO_ID_7" },
    { title: "Límites indeterminados", thumbnail: "https://i.ytimg.com/vi/VIDEO_ID_8/hqdefault.jpg", url: "https://www.youtube.com/watch?v=VIDEO_ID_8" }
  ],
  derivadas: [
    { title: "Reglas básicas de derivadas", thumbnail: "https://i.ytimg.com/vi/VIDEO_ID_9/hqdefault.jpg", url: "https://www.youtube.com/watch?v=VIDEO_ID_9" },
    { title: "Derivadas aplicadas", thumbnail: "https://i.ytimg.com/vi/VIDEO_ID_10/hqdefault.jpg", url: "https://www.youtube.com/watch?v=VIDEO_ID_10" }
  ]
};

// Función para cargar los videos en el carrusel
function loadVideos(category) {
  const carouselInner = document.querySelector('.carousel-inner');
  carouselInner.innerHTML = '';

  const videos = tutorialVideos[category] || [];

  videos.forEach(video => {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.innerHTML = `
      <img src="${video.thumbnail}" alt="${video.title}">
      <h4>${video.title}</h4>
      <a href="${video.url}" target="_blank">Ver en YouTube</a>
    `;
    carouselInner.appendChild(item);
  });

  // Si no hay videos, mostrar mensaje
  if (videos.length === 0) {
    carouselInner.innerHTML = '<p>No hay videos disponibles para esta categoría.</p>';
  }
}

// Función para manejar el clic en los títulos
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('tutorial-item')) {
    // Remover clase 'active' de todos los elementos
    document.querySelectorAll('.tutorial-item').forEach(item => {
      item.classList.remove('active');
    });

    // Añadir clase 'active' al elemento clickeado
    e.target.classList.add('active');

    // Cargar los videos correspondientes
    const category = e.target.dataset.category;
    loadVideos(category);
  }
});

// Función para navegar en el carrusel
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('carousel-arrow')) {
    const carousel = document.querySelector('.carousel-inner');
    const scrollAmount = 300; // Puedes ajustar este valor

    if (e.target.classList.contains('left')) {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
});

// Cargar videos por defecto al abrir la sección
document.addEventListener('DOMContentLoaded', function() {
  loadVideos('tabular'); // Por defecto, carga los videos de "Tabular"
});
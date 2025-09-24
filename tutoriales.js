// tutoriales.js

// 🎥 Datos reales de videos de YouTube (reemplaza VIDEO_ID con IDs reales)
const tutorialData = {
  tabular: [
    { title: "Tabular funciones en calculadora Casio", videoId: "ABC123xyz" },
    { title: "Cómo hacer tablas de valores en TI-84", videoId: "DEF456uvw" }
  ],
  "dar-valores": [
    { title: "Evaluar funciones en x = a", videoId: "GHI789rst" },
    { title: "Sustituir valores en expresiones", videoId: "JKL012mno" }
  ],
  "resolver-ecuaciones": [
    { title: "Resolver ecuaciones con solve()", videoId: "MNO345pqr" },
    { title: "Ecuaciones cuadráticas paso a paso", videoId: "STU678vwx" }
  ],
  limites: [
    { title: "Calcular límites en calculadora", videoId: "VWX901yzA" },
    { title: "Límites laterales en TI-Nspire", videoId: "YZA234bcd" }
  ],
  derivadas: [
    { title: "Derivadas con d/dx en Casio", videoId: "BCD567efg" },
    { title: "Encontrar derivadas en TI-84", videoId: "EFG890hij" }
  ]
};

// Genera la URL de miniatura de YouTube
function getThumbnailUrl(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
}

// Genera el enlace de YouTube
function getVideoUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

// Renderiza los videos en el carrusel
function renderVideos(category) {
  const container = document.querySelector('.carousel-inner');
  const videos = tutorialData[category] || [];

  if (videos.length === 0) {
    container.innerHTML = '<p class="carousel-placeholder">No hay tutoriales disponibles para esta categoría.</p>';
    return;
  }

  container.innerHTML = videos.map(video => `
    <div class="carousel-item">
      <img src="${getThumbnailUrl(video.videoId)}" 
           alt="${video.title}" 
           onclick="window.open('${getVideoUrl(video.videoId)}', '_blank')">
      <h4>${video.title}</h4>
    </div>
  `).join('');
}

// Maneja clics en el menú
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('tutorial-item')) {
    // Actualiza clase activa
    document.querySelectorAll('.tutorial-item').forEach(btn => {
      btn.classList.remove('active');
    });
    e.target.classList.add('active');

    // Carga los videos
    const category = e.target.dataset.category;
    renderVideos(category);
  }
});

// Maneja flechas del carrusel
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('carousel-arrow')) {
    const container = document.querySelector('.carousel-inner');
    const scrollAmount = 295; // ancho de un item + gap

    if (e.target.classList.contains('left')) {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
});

// Inicializa al cargar
document.addEventListener('DOMContentLoaded', function() {
  renderVideos('tabular'); // Carga la primera categoría por defecto
});

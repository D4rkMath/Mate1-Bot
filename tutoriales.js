// tutoriales.js

let tutorialData = {}; // Almacenará los datos del Excel

// Función para cargar el archivo Excel
async function loadExcelData() {
  try {
    const response = await fetch('Videos_youtube.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    // Leer la primera hoja
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convertir a JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Organizar los datos por tema
    tutorialData = {};
    jsonData.forEach(row => {
      const tema = row.TEMAS; // Primera columna
      const videoLink = row.LINKS; // Tercera columna
      const titulo = row.MODELO; // Cuarta columna

      if (!tutorialData[tema]) {
        tutorialData[tema] = [];
      }

      tutorialData[tema].push({
        title: titulo,
        videoId: getVideoIdFromUrl(videoLink) // Extraer el ID del video
      });
    });

    // Renderizar los videos iniciales
    renderVideos('tabular'); // Por defecto, carga "Tabular"

  } catch (error) {
    console.error("Error cargando el archivo Excel:", error);
    document.querySelector('.carousel-inner').innerHTML = '<p class="carousel-placeholder">No se pudo cargar el archivo de videos.</p>';
  }
}

// Extrae el ID del video de YouTube
function getVideoIdFromUrl(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.*?v=))([^"&?\/\s]{11})/);
  return match ? match[1] : '';
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
      <div class="video-embed-container">
        <iframe 
          src="https://www.youtube.com/embed/${video.videoId}?autoplay=0&rel=0&showinfo=0&modestbranding=1"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          title="${video.title}"
          class="youtube-embed">
        </iframe>
      </div>
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
  loadExcelData(); // Carga el Excel al abrir la página
});

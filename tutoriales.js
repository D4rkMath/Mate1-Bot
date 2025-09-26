// tutoriales.js

console.log("Tutoriales cargados");

document.querySelector('.carousel-inner').innerHTML = `
  <div class="carousel-item">
    <div class="video-embed-container">
      <iframe 
        src="https://www.youtube.com/embed/5Boyptd7wY8" 
        frameborder="0" 
        allowfullscreen
        class="youtube-embed">
      </iframe>
    </div>
    <!-- Contenedor para alinear botones y título -->
    <div class="video-title-row">
      <button class="title-arrow left">❮</button>
      <h4 class="video-title">Tabular: FX-991LA CW</h4>
      <button class="title-arrow right">❯</button>
    </div>
  </div>
`;

console.log("Tutoriales cargados");

const carouselInner = document.querySelector('.carousel-inner');
const volumeSlider = document.createElement('input');
volumeSlider.type = 'range';
volumeSlider.min = 0;
volumeSlider.max = 100;
volumeSlider.value = 50;
volumeSlider.style.width = '100px';
volumeSlider.style.margin = '10px 0';

carouselInner.innerHTML = `
  <div class="carousel-item">
    <div class="video-embed-container">
      <iframe id="youtube-video" src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&autoplay=0" frameborder="0" allowfullscreen></iframe>
    </div>
    <h4>Ejemplo de video</h4>
  </div>
`;

const player = new YT.Player('youtube-video', {
  events: {
    'onReady': (event) => {
      event.target.setVolume(50); // Establece el volumen inicial
      document.querySelector('.carousel-item').appendChild(volumeSlider);
    }
  }
});

volumeSlider.addEventListener('input', (e) => {
  if (player && player.setVolume) {
    player.setVolume(e.target.value);
  }
});

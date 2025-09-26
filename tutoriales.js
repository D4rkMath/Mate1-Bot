// tutoriales.js

console.log("Tutoriales cargados");

// Inicializar Swiper
const swiper = new Swiper('.mySwiper', {
  loop: false,
  slidesPerView: 1,
  spaceBetween: 15,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  on: {
    slideChange: function () {
      // Actualiza el título si lo necesitas (opcional)
      const currentSlide = this.slides[this.activeIndex];
      const title = currentSlide.querySelector('.video-title').textContent;
      console.log("Video actual:", title);
    }
  }
});

// Opcional: Si quieres que el título esté fuera del slider (como en tu diseño original)
// document.addEventListener('DOMContentLoaded', () => {
//   const updateTitle = () => {
//     const currentSlide = swiper.slides[swiper.activeIndex];
//     const title = currentSlide.querySelector('.video-title').textContent;
//     document.querySelector('.video-title').textContent = title;
//   };
//   swiper.on('slideChange', updateTitle);
//   updateTitle(); // Inicializar
// });

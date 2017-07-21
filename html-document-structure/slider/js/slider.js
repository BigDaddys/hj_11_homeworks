window.addEventListener('DOMContentLoaded', () => {

  const sliders = document.querySelectorAll('.slider');

  for (let slider of sliders) {
    initSlider(slider);
  }

  function initSlider(slider) {
    const sliderNav = slider.querySelector('.slider-nav');
    const first = sliderNav.querySelector('[data-action="first"]');
    const prev = sliderNav.querySelector('[data-action="prev"]');
    const next = sliderNav.querySelector('[data-action="next"]');
    const last = sliderNav.querySelector('[data-action="last"]');
    const slides = slider.querySelector('.slides');

    slides.firstElementChild.classList.add('slide-current');

    let currentSlide = slides.querySelector('.slide-current');

    updateControl(currentSlide);

    sliderNav.addEventListener('click', (event) => {
      if (!event.target.classList.contains('disabled')) {
        currentSlide.classList.remove('slide-current');
        switch(event.target) {
          case first:
            currentSlide = slides.firstElementChild;
            break;
          case prev:
            currentSlide = currentSlide.previousElementSibling;
            break;
          case next:
            currentSlide = currentSlide.nextElementSibling;
            break;
          case last:
            currentSlide = slides.lastElementChild;
            break;
        }
        updateControl(currentSlide);
        currentSlide.classList.add('slide-current');
      }
    });

    function updateControl(currentSlide) {
      if(!currentSlide.previousElementSibling) {
        first.classList.add('disabled');
        prev.classList.add('disabled');
      } else {
        first.classList.remove('disabled');
        prev.classList.remove('disabled');
      }

      if(!currentSlide.nextElementSibling) {
        next.classList.add('disabled');
        last.classList.add('disabled');
      } else {
        next.classList.remove('disabled');
        last.classList.remove('disabled');
      }
    }
  }

});
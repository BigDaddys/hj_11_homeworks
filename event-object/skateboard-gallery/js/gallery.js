;(function () {

  const galleryView = document.getElementById('view');
  const galleryNav = document.getElementById('nav');
  const galleryNavList = galleryNav.getElementsByTagName('a');

  function setImage(event) {
    event.preventDefault();

    for (let item of galleryNavList) {
      item.classList.remove('gallery-current');
    }

    event.currentTarget.classList.add('gallery-current');
    galleryView.src = event.currentTarget.href;
  }

  for (let item of galleryNavList) {
    item.addEventListener('click', setImage);
  }

})();
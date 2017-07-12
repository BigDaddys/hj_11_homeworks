;(function () {

  const prevBtn = document.getElementById('prevPhoto');
  const nextBtn = document.getElementById('nextPhoto');
  const currentPhoto = document.getElementById('currentPhoto');
  const photoList = ['breuer-building', 'guggenheim-museum', 'headquarters', 'IAC', 'new-museum'];
  let index = 0;

  currentPhoto.src = `i/${photoList[0]}.jpg`;

  function prevPhoto() {
    if (index <= 0) {
      index = photoList.length - 1;
    } else {
      index--;
    }
  }

  function nextPhoto() {
    if (index >= photoList.length - 1) {
      index = 0;
    } else {
      index++;
    }
  }

  function setCurrentPhoto() {
    currentPhoto.src = `i/${photoList[index]}.jpg`;
  }

  prevBtn.onclick = function () {
    prevPhoto()
    setCurrentPhoto();
  }

  nextBtn.onclick = function () {
    nextPhoto()
    setCurrentPhoto();
  }
})();
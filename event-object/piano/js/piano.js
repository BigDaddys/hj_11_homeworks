;(function () {

  const piano = document.getElementById('pianoKeys');
  const pianoKeysList = piano.getElementsByTagName('li');
  const pianoSongList = ['first', 'second', 'third', 'fourth', 'fifth'];
  let type = 'middle';

  Array.from(pianoKeysList).forEach((key, ind) => {
    const audio = key.getElementsByTagName('audio')[0];

    document.addEventListener('keydown', (event) => {
      if (event.shiftKey && event.repeat) {
        type = 'lower';
        piano.classList.add('lower');
        piano.classList.remove('middle', 'higher');
      }

      if (event.altKey && event.repeat) {
        type = 'higher';
        piano.classList.add('higher');
        piano.classList.remove('middle', 'lower');
      }
    });

    document.addEventListener('keyup', (event) => {
      type = 'middle';
      piano.classList.add('middle');
      piano.classList.remove('higher', 'lower');
    });

    key.addEventListener('click', () => {
      audio.src = `./sounds/${type}/${pianoSongList[ind]}.mp3`;
      audio.play();
    });

  });

})();
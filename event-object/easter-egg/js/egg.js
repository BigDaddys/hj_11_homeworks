;(function () {

  const navPanel = document.getElementsByTagName('nav')[0];
  const secretPanel = document.getElementsByClassName('secret')[0];
  const secretCode = 'KeyYKeyTKeyNKeyJKeyKKeyJKeyUKeyBKeyZ';
  const inputStr = [];

  function showSecret(event) {
    inputStr.push(event.code);

    if (inputStr.join('') !== secretCode) {
      if (secretCode.indexOf(inputStr.join('')) === -1) {
        inputStr.length = 0;
        // alert('Ошибка при вводе секретного слова. Повторите ещё раз.');
      }
    } else {
      secretPanel.classList.add('visible');
    }
  }

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
      navPanel.classList.toggle('visible');
    }

    showSecret(event);
  });

})();
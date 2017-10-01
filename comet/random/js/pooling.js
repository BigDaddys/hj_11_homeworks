'use strict';

const rowPooling = document.querySelector('.pooling');
const cardsPooling = rowPooling.querySelectorAll('div');

function loadNumber(event) {
  if (event.target.status === 200) {
    const response = event.target.responseText;

    Array.from(cardsPooling)
      .forEach(card => {
        card.textContent === response.trim() ? card.classList.add('flip-it') : card.removeAttribute('class');
      });
  }
}

function init() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
  xhr.addEventListener('load', loadNumber);
  xhr.send();
}

setInterval(init, 5000);
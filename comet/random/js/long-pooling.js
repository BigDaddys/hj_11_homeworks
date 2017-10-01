'use strict';

const rowLongPooling = document.querySelector('.long-pooling');
const cardsLongPooling = rowLongPooling.querySelectorAll('div');

function initLongPolling() {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
  request.addEventListener('load', loadData);
  request.send();
}

function loadData(event) {
  if (event.target.status >= 200 && event.target.status < 300) {
    if (event.target.responseText) {
      const response = event.target.responseText;

      Array.from(cardsLongPooling)
        .forEach(card => {
          card.textContent === response.trim() ? card.classList.add('flip-it') : card.removeAttribute('class');
        });
    }
  }

  initLongPolling();
}

initLongPolling();

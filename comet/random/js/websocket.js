'use strict';

const rowWS = document.querySelector('.websocket');
const cardsWS = rowWS.querySelectorAll('div');

const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

ws.addEventListener('message', (event) => {
  Array.from(cardsWS)
    .forEach(card => {
      card.textContent === event.data.trim() ? card.classList.add('flip-it') : card.removeAttribute('class');
    });
});
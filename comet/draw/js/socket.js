'use strict';

const WS = new WebSocket('wss://neto-api.herokuapp.com/draw');

function reportNewDraw(event) {
  const cnvs = document.getElementById(event.id);
  const ctx = canvas.getContext('2d');
  event.canvas.toBlob(blob => WS.send(blob));
}

WS.addEventListener('open', (event) => {
  editor.addEventListener('update', reportNewDraw);
});

WS.addEventListener('close', (event) => {
  editor.removeEventListener('update', reportNewDraw);
});

WS.addEventListener('error', (error) => {
  console.error(error.data);
})

window.addEventListener('beforeunload', () => {
  WS.close(1000, 'Сессия закрыта');
});
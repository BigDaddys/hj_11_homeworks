'use strict';

const cnvs = document.querySelector('canvas');
const ctx = cnvs.getContext('2d');

const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];

cnvs.addEventListener('click', (e) => {
  const countStars = randomNumber(200, 400);
});

function randomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
'use strict';

const wall = document.getElementById('wall');
const ctx = wall.getContext('2d');
const wallW = window.innerWidth;
const wallH = window.innerHeight;
// const figureCount = Math.floor((Math.random() * 1000) + 1);
const figureCount = 1000;
const PI = Math.PI;
const functionsTime = [nextPoint1, nextPoint2];
const fps = 20;

wall.setAttribute('width', wallW);
wall.setAttribute('height', wallH);

class Figure {
  constructor() {
    this.x = Math.floor(Math.random() * wallW);
    this.y = Math.floor(Math.random() * wallH);
    this.nextPoint = functionsTime[randomNumber(0, 1)];
    this.size = randomNumber(0.1, 0.6, true);
    this.color = '#ffffff';
    this.strokeWidth = 5 * this.size;
  }
}

class Tac extends Figure {
  constructor() {
    super();
    this.radius = 12 * this.size;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * PI);
    ctx.lineWidth = this.size;
    ctx.strokeStyle = this.color;
    ctx.closePath();
    ctx.stroke();
  }
}

class Tic extends Figure {
  constructor() {
    super();
    this.width = 20 * this.size;
    this.angel = randomNumber(0, 360);
    this.speedRotate = randomNumber(-0.2, 0.2, true);
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y - this.width / 2);
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.width / 2);
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.width / 2, this.y);
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width / 2, this.y);
    ctx.lineWidth = this.size;
    ctx.strokeStyle = this.color;
    ctx.rotate(this.angel * PI / 360);
    ctx.closePath();
    ctx.stroke();
  }
}

function randomNumber(min, max, float = false) {
  return float ? (min + (Math.random() * (max - min))).toFixed(1) : Math.floor(min + Math.random() * (max + 1 - min));
}

function nextPoint1(x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
}

function nextPoint2(x, y, time) {
  return {
    x: x + Math.sin((x + (time / 10)) / 100) * 5,
    y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
  }
}

for (let i = 1; i < figureCount; i++) {
  const tic = new Tic();

  tic.draw();
  animateFigure(tic);
}

for (let i = 1; i < figureCount; i++) {
  const tac = new Tac();

  tac.draw();
  animateFigure(tac);
}

function animateFigure(figure) {
  const time = new Date().getTime() * (fps / 1000);

  figure.x = figure.nextPoint(figure.x, figure.y, time).x;
  figure.y = figure.nextPoint(figure.x, figure.y, time).y;

  ctx.clearRect(0, 0, wallW, wallH);

  figure.draw();

  window.requestAnimationFrame(() => animateFigure(figure));
}
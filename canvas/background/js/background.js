'use strict';

const wall = document.getElementById('wall');
const ctx = wall.getContext('2d');
const wallW = window.innerWidth;
const wallH = window.innerHeight;

const figureCount = Math.floor((Math.random() * 1000) + 1);
const figures = [];

const PI = Math.PI;
const FPS = 20;

const functionsTime = [nextPoint1, nextPoint2];


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

  draw() {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size;
  }
}

class Tac extends Figure {
  constructor() {
    super();
    this.radius = 12 * this.size;
  }

  draw() {
    super.draw();
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * PI);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

class Tic extends Figure {
  constructor() {
    super();
    this.width = 20 * this.size;
    this.angel = randomNumber(0, 360);
  }

  draw() {
    super.draw();
    ctx.save();
    ctx.beginPath();
    ctx.rotate(this.angel * PI / 360);
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y - this.width / 2);
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.width / 2);
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.width / 2, this.y);
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width / 2, this.y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
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

for (let i = 0; i < figureCount; i++) {
  const figure = (i <= figureCount / 2) ? new Tic() : new Tac();
  figures.push(figure);
  figure.draw();
}

animateFigure();

function animateFigure() {
  const time = new Date().getTime() * (FPS / 1000);

  ctx.clearRect(0, 0, wallW, wallH);

  figures.forEach((figure) => {
    const { x, y } = figure.nextPoint(figure.x, figure.y, time);
    figure.x = x;
    figure.y = y;
    figure.draw();
  });

  window.requestAnimationFrame(animateFigure);
}
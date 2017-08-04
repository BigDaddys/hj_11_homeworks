'use strict';

const colorSwatch = document.getElementById('colorSwatch');
const sizeSwatch = document.getElementById('sizeSwatch');
const quickCart = document.getElementById('quick-cart');
// const quickCartPrice = document.getElementById('quick-cart-price');
const cartForm = document.getElementById('AddToCartForm');
const colorDefault = 'red';
const urls = [
  'https://neto-api.herokuapp.com/cart/colors',
  'https://neto-api.herokuapp.com/cart/sizes',
  'https://neto-api.herokuapp.com/cart'
];

Promise.all(urls.map(url => fetch(url)))
  .then(resp => Promise.all(resp.map(result => result.json())))
  .then(([dataColors, dataSizes, dataCart]) => {
    snippetSwatchColor(dataColors, colorDefault);
  });

function snippetSwatchColor(data, color) {
  if (localStorage.selectedColor === undefined) {
    localStorage.selectedColor = color;
  }

  for (let item of data) {
    const tpl = document.createElement('div');

    tpl.dataset.value = item.type;
    tpl.classList.add('swatch-element', 'color', item.type, item.isAvailable ? 'available' : 'soldout');
    tpl.innerHTML = `
      <div class="tooltip">${item.title}</div>
      <input quickbeam="color" id="swatch-1-${item.type}" type="radio" name="color" value="${item.type}" ${item.type === colorDefault ? 'checked' : ''} ${!item.isAvailable ? 'disabled' : ''}>
      <label for="swatch-1-${item.type}" style="border-color: ${item.code};">
        <span style="background-color: ${item.code};"></span>
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    `;

    const radio = tpl.querySelector('input');

    radio.checked = localStorage.selectedColor === radio.value;

    radio.addEventListener('change', (event) => {
      localStorage.selectedColor = event.target.value;
    });

    colorSwatch.appendChild(tpl);
  }
}
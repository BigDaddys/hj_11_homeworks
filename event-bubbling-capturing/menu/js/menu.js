'use strict';

function toggleMenu(event) {
  const current = event.currentTarget;

  if (current.classList.contains('show')) {
    current.classList.remove('show');
    current.classList.add('hide');
  } else {
    current.classList.add('show');
    current.classList.remove('hide');
  }
}

function openLink(event) {
  event.preventDefault();
  console.log(this.textContent);
  event.stopPropagation();
}

function init(node) {
  node.addEventListener('click', toggleMenu);
}

function initLink(node) {
  if (node.dataset.toggle) {
    return;
  }
  node.addEventListener('click', openLink, true);
}

Array
  .from(document.querySelectorAll('.dropdown'))
  .forEach(init);

Array
  .from(document.querySelectorAll('a'))
  .forEach(initLink);

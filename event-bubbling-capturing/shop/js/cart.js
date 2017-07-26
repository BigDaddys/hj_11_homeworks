'use strict';

list.addEventListener('click', buttonAddToCart);

function buttonAddToCart(event) {
  event.preventDefault();

  if (!event.target.classList.contains('add-to-cart')) {
    return;
  }

  const itemData = {
    title: event.target.dataset.title,
    price: event.target.dataset.price
  };

  addToCart(itemData);
}

const addBtn = document.querySelectorAll('.box > .add');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');

window.addEventListener('load', () => {
  let totalPrice = 0;
  let totalItems = 0;

  function addToCart(event) {
    totalItems++;
    totalPrice += parseInt(event.currentTarget.dataset.price);

    cartCount.innerHTML = totalItems;
    cartTotalPrice.innerHTML = getPriceFormatted(totalPrice);
  }

  for (let btn of addBtn) {
    btn.addEventListener('click', addToCart);
  }
});

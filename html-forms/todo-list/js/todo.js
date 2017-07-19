window.addEventListener('DOMContentLoaded', () => {

  const listBlock = document.querySelector('.list-block');
  const listCheckbox = listBlock.querySelectorAll('input[type="checkbox"]');
  const result = document.querySelector('output');
  let finish = 0;

  listCheckbox.forEach((el) => {
    if (el.checked) {
      finish++;
    }

    el.addEventListener('change', (event) => {
      event.currentTarget.checked ? finish++ : finish--;
      result.value = `${finish} из ${listCheckbox.length}`;
      finish === listCheckbox.length ? listBlock.classList.add('complete') : listBlock.classList.remove('complete');
    });
  });

  result.value = `${finish} из ${listCheckbox.length}`;

});
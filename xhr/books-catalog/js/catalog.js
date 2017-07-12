const XHR = new XMLHttpRequest();
const content = document.getElementById('content');

XHR.addEventListener('load', renderCatalog);

XHR.open('GET', 'https://netology-fbb-store-api.herokuapp.com/book/');
XHR.send();

function renderCatalog(event) {
  const data = JSON.parse(event.target.responseText);
  for (let item of data) {
    content.innerHTML += `<li
                            data-title="${item.title}"
                            data-author="${item.author.name}"
                            data-info="${item.info}"
                            data-price="${item.price}">
                          <img src="${item.cover.small}">
                        </li>`;
  }
}
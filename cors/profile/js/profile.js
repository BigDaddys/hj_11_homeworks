'use strict';

const content = document.querySelector('.content');

function renderProfile(data) {
  for (const key in data) {
    switch(key) {
      case 'id':
        loadData('renderTechnology', `https://neto-api.herokuapp.com/profile/${data[key]}/technologies`)
          .then(content.removeAttribute('style'));
        break;
      case 'pic':
        document.querySelector(`[data-${key}]`).src = replacePortUrl(data[key]);
        break;
      default:
        document.querySelector(`[data-${key}]`).textContent = data[key];
    }
  }
}

function renderTechnology(data) {
  const listTechnology = document.querySelector('[data-technologies]');
  for (const key in data) {
    const tpl = document.createElement('span');
    tpl.classList.add('devicons', `devicons-${data[key]}`);
    listTechnology.appendChild(tpl);
  }
}

function loadData(callbackName, url) {
  return new Promise((done, fail) => {
    const script = document.createElement('script');
    script.src = `${url}?callback=${callbackName}`;
    document.body.appendChild(script);
    window.callbackName = done;
  });
}

function replacePortUrl(url) {
  return url.replace(/:\d+?\//ig, '/');
}

loadData('renderProfile', 'https://neto-api.herokuapp.com/profile/me');
'use strict';

function initWidget(data) {
  for (const key in data) {
    if (key === 'wallpaper' || key === 'pic') {
      document.querySelector(`[data-${key}]`).src = replacePortUrl(data[key]);
    } else {
      document.querySelector(`[data-${key}]`).textContent = data[key];
    }
  }
}

function loadData(url) {
  return new Promise((done, fail) => {
    const script = document.createElement('script');
    script.src = `${url}?callback=initWidget`;
    document.body.appendChild(script);

    window[initWidget] = done;
  });
}

function replacePortUrl(url) {
  return url.replace(/:\d+?\//ig, '/');
}

loadData('//neto-api.herokuapp.com/twitter/jsonp');
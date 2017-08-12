'use strict';

const urlFood = 'https://neto-api.herokuapp.com/food/42';

const urlList = [
  {
    url: urlFood,
    funcName: 'infoRecipe'
  },{
    url: `${urlFood}/rating`,
    funcName: 'ratingRecipe'
  },{
    url: `${urlFood}/consumers`,
    funcName: 'listUsers'
  }
];

const pic = document.querySelector('[data-pic]');
const title = document.querySelector('[data-title]');
const ingredients = document.querySelector('[data-ingredients]');
const rating = document.querySelector('[data-rating]');
const star = document.querySelector('[data-star]');
const votes = document.querySelector('[data-votes]');
const consumers = document.querySelector('[data-consumers]');

function infoRecipe(data) {
  pic.setAttribute('style', `background-image: url('${replacePortUrl(data.pic)}');`);
  title.textContent = data.title;
  ingredients.textContent = data.ingredients.join(', ');
}

function ratingRecipe(data) {
  let graduation = '';
  let numVotes = data.votes;

  numVotes %= 100;

  if (numVotes >= 5 && numVotes <= 20) {
    graduation = 'оценок';
  }

  numVotes %= 10;

  if (numVotes === 1) {
    graduation = 'оценка';
  } else if (numVotes >= 2 && numVotes <= 4) {
    graduation = 'оценки';
  } else {
    graduation = 'оценок';
  }

  star.setAttribute('style', `width: ${(data.rating / 10) * 100}%;`);
  rating.textContent = data.rating.toFixed(2);
  votes.textContent = `(${data.votes} ${graduation})`;
}

function listUsers(data) {
  const total = document.createElement('span');
  total.textContent = `(+${data.total})`;

  data.list.forEach(item => {
    const tplUser = document.createElement('img');
    tplUser.src = replacePortUrl(item.pic);
    tplUser.title = item.name;
    consumers.appendChild(tplUser);
  });

  consumers.appendChild(total);
}

urlList.forEach((item) => {
  loadData(item.url, item.funcName);
});

function loadData(url, callbackName) {
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

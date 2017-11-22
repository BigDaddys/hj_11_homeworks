'use strict';

const app = document.querySelector('.app');
const controls = document.querySelector('.controls');
const btnTakePhoto = controls.querySelector('#take-photo');
const errors = document.getElementById('error-message');
const listImages = document.querySelector('.list');

const video = document.createElement('video');
const audio = document.createElement('audio');

audio.src = './audio/click.mp3';

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then((stream) => {
      video.src = URL.createObjectURL(stream);
      video.play();
      app.appendChild(video);

      controls.style.display = 'flex';

      btnTakePhoto.addEventListener('click', () => takePicture(stream));
    })
    .catch((error) => {
      errors.textContent = `Нет доступа к камере. Ошибка ${error.name}`;
      errors.style.display = 'block';
    });
} else {
  errors.textContent = 'Ваш браузер не поддерживает mediaDevices';
  errors.style.display = 'block';
}

function tmplImg(imgUrl) {
  return el('figure', {}, [
    el('img', {src: imgUrl}),
    el('figcaption', {}, [
      el('a', {href: imgUrl, download: 'snapshot.png'}, [
        el('i', {class: 'material-icons'}, 'file_download')
      ]),
      el('a', {}, [
        el('i', {class: 'material-icons fileUpload'}, 'file_upload')
      ]),
      el('a', {}, [
        el('i', {class: 'material-icons fileDelete'}, 'delete')
      ])
    ])
  ]);
}

function takePicture(stream) {
  const img = document.createElement('img');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let imgTpl;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0);

  imgTpl = tmplImg(canvas.toDataURL());

  imgTpl.addEventListener('click', (e) => {
    switch(e.target.textContent) {
      case 'file_upload':
        fetchRequest(canvas.toDataURL());
        break;
      case 'delete':
        imgTpl.parentNode.removeChild(imgTpl);
        break;
    }
  });

  listImages.appendChild(imgTpl);

  audio.play();
}

function el(tagName, attributes, children) {
  const element = document.createElement(tagName);

  if (typeof attributes === 'object') {
    Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));
  }

  if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof Array) {
    children.forEach(child => element.appendChild(child));
  }

  return element;
}

function fetchRequest(img) {
  const data = new FormData();

  data.append('image', img);

  fetch('https://neto-api.herokuapp.com/photo-booth', {
    body: data,
    credentials: 'same-origin',
    method: 'POST'
  })
  .then((result) => {
    if (200 <= result.status && result.status < 300) {
      return result;
    }
    throw new Error(result.statusText);
  })
  .then((result) => result.json())
  .then((data) => {
    if (data.error) {
      console.error(data.message);
    } else {
      console.log(data);
    }
  });
}

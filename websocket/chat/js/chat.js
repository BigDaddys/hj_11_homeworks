'use strict'

const chat = document.querySelector('.chat');
const chatElems = init(chat);
const ws = new WebSocket('wss://neto-api.herokuapp.com/chat');

ws.addEventListener('open', () => {
  triggerStatus('Пользователь появился в сети');
  chatElems.status.textContent = chatElems.status.dataset.online;
  chatElems.submit.disabled = false;
});

ws.addEventListener('close', () => {
  triggerStatus('Пользователь не в сети');
  chatElems.status.textContent = chatElems.status.dataset.offline;
  chatElems.submit.disabled = true;
});

ws.addEventListener('message', (event) => {
  const data = event.data;
  const typingMessage = chatElems.templates.loading;
  const messageUser = chatElems.templates.messageUser.cloneNode(true);

  if (data === '...') {
    chatElems.content.appendChild(typingMessage);
  } else {
    addMessage(messageUser, data);
    chatElems.content.removeChild(typingMessage);
    chatElems.content.appendChild(messageUser);
  }
});

chatElems.form.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = chatElems.input.value;
  const messageMy = chatElems.templates.messageMy.cloneNode(true);

  addMessage(messageMy,value);
  chatElems.content.appendChild(messageMy);

  ws.send(value);

  chatElems.form.reset();
});

function init(chatElem) {
  return {
    form: chatElem.querySelector('.message-box'),
    input: chatElem.querySelector('.message-input'),
    submit: chatElem.querySelector('.message-submit'),
    content:chatElem.querySelector('.messages-content'),
    status: chatElem.querySelector('.chat-status'),
    templates: {
      messageUser: chatElem.querySelector('[class="message"]'),
      messageMy: chatElem.querySelector('.message.message-personal'),
      loading: chatElem.querySelector('.message.loading').cloneNode(true),
      status: chatElem.querySelector('.message.message-status')
    }
  };
}

function triggerStatus(messageStatus) {
  const message = chatElems.templates.status.cloneNode(true);
  message.querySelector('.message-text').textContent = messageStatus;
  chatElems.content.appendChild(message);
}

function addMessage(who, data) {
  const time = new Date();
  who.querySelector('.message-text').textContent = data;
  who.querySelector('.timestamp').textContent = `${time.getHours()}:${time.getMinutes()}`;
}
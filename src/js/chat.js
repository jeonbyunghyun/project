"use strict"
const socket = io();

const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('.chatting-input');
const sendButton = document.querySelector('.send-button');
const displayContainer = document.querySelector('.display-container');

chatInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      send();
    }
  });

function send() {
    const param = {
      name: "나",
      msg: chatInput.value,
    };
    socket.emit('chatting', param);
  }

sendButton.addEventListener('click', send);


socket.on('chatting', (data) => {
    const { name, msg, time } = data;
    const item = new LiModel(name, msg, time);
    item.makeLi();
    const item2 = new Chatbot(name, msg, time);
    item2.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
  });  

function LiModel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;
  
    this.makeLi = () => {
      const li = document.createElement('li');
      li.classList.add('sent');
      const dom = `
      <span class="message">${this.msg}</span>
      <span class="time">${this.time}</span>`;
  
      li.innerHTML = dom;
      chatList.appendChild(li);
    };
  }

  function Chatbot(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;
  
    this.makeLi = () => {
      const li = document.createElement('li');
      li.classList.add('received');
      const dom = `<span class="profile">
      <img class="received-image" src=img/icon.png alt="any">
      <span class="user">CHAT-GCT</span>
      </span>
      <span class="message">안녕하세요.</span>
      <span class="time">${this.time}</span>`;
  
      li.innerHTML = dom;
      chatList.appendChild(li);
    };
  }
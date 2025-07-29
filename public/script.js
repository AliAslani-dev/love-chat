const socket = io();
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const toggleTheme = document.getElementById('toggle-theme');

const name = prompt('اسمتو بگو عشقم 😍');
appendMessage('شما وارد شدید', 'system');
socket.emit('new-user', name);

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`, 'other');
});

socket.on('user-connected', name => {
  appendMessage(`${name} وارد شد`, 'system');
});

socket.on('user-disconnected', name => {
  appendMessage(`${name} خارج شد`, 'system');
});

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  if (!message) return;
  appendMessage(`شما: ${message}`, 'you');
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

function appendMessage(message, type) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  if (type) messageElement.classList.add(type);
  messageContainer.append(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

// تغییر تم
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleTheme.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

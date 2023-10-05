const WebSocket = require('ws');
const readline = require('readline');
require('dotenv').config();
const PORT = process.env.PORT || 8080;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new WebSocket(`ws://localhost:${PORT}`);
let username = '';

client.addEventListener('open', () => {
  // Change 'socket' to 'client' here
  console.log('Connected to chat server.');

  rl.question('Enter your username: ', (enteredUsername) => {
    username = enteredUsername; // Set the username here
    console.log(`Welcome, ${username}!`);
    rl.setPrompt('> ');

    rl.on('line', (input) => {
      // send message to server with the username
      client.send(
        JSON.stringify({ type: 'message', username, message: input })
      );
    });
  });
});

client.addEventListener('message', (event) => {
  // Change 'socket' to 'client' here
  const data = JSON.parse(event.data);
  if (data.type === 'message') {
    displayMessage(data.username, data.message);
  }
});

function displayMessage(username, message) {
  console.log(`[${username}]: ${message}`);
}

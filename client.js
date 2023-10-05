const WebSocket = require('ws');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new WebSocket('ws://localhost:8080');

client.on('open', () => {
  console.log('Connected to chat server.');

  rl.question('Enter your username: ', (username) => {
    console.log(`Welcome, ${username}!`);
    rl.setPrompt('> ');

    rl.on('line', (input) => {
      // send message to server
      client.send(`[${username}]: ${input}`);
    });
  });
});

client.on('message', (message) => {
  console.log(message);
});

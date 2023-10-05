const WebSocket = require('ws');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const server = new WebSocket.Server({ port: PORT });

const clients = new Set();

server.on('connection', (ws) => {
  // add client to clients set on connection
  clients.add(ws);

  ws.on('message', (message) => {
    messageQueue.push(message.toString());
    setInterval(processMessageQueue, 2000);
  });

  ws.on('close', () => {
    // delete client from clients set on close
    clients.delete(ws);
  });
});

const messageQueue = [];
function processMessageQueue(ws) {
  while (messageQueue.length > 0) {
    const message = messageQueue.shift(); // Get and remove the first message in the queue

    // Broadcast the message to all connected clients
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log(message);
        client.send(message);
      }
    });
  }
}

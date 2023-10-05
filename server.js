const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

server.on('connection', (ws) => {
  // add client to clients set on connection
  clients.add(ws);

  ws.on('message', (message) => {
    messageQueue.push(message.toString());
    // when a message is received, broadcast it to all clients
    // Call processMessageQueue every 100 milliseconds (adjust the interval as needed)
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

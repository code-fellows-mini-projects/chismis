const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

server.on('connection', (ws) => {
  // add client to clients set on connection
  clients.add(ws);

  ws.on('message', (message) => {
    // when a message is received, broadcast it to all clients
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    // delete client from clients set on close
    clients.delete(ws);
  });
});

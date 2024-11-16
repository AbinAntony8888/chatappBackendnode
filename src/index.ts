import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Your Next.js frontend URL
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.send('Socket.IO server is running');
});

// Socket.IO connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Example of handling a custom event
  socket.on('message', (msg) => {
    console.log(`Message received: ${msg}`);
    // io.emit('message', msg);                  // Broadcast the message to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server on port 4000
server.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});
  
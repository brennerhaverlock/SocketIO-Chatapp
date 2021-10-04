const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let clients = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  console.log('a user connected');
  clients++;
  socket.broadcast.emit('newClientConnect',{ description: clients + ' clients connected!'});
  socket.emit('newClientConnect',{ description: clients + ' clients connected!'});
    // Broadcast when user connects 

  io.emit('chat message', 'A user has connected');
  socket.on('disconnect', function () {
        clients--;
        socket.broadcast.emit('newClientConnect',{ description: clients + ' clients connected!'});
        io.emit('chat message', 'some user disconnected');
    });
});


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});
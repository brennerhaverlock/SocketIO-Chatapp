const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

    console.log('Yay, connection was recorded')

    //emit message to all front-end clients
    io.emit('chat message', 'A user has connected');

    //handling disconnects
    socket.on('disconnect', function() {
       io.emit('chat message', 'some user disconnected');
    });

});



io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });

io.on('connection', (socket) => {
socket.broadcast.emit('hi');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

  
server.listen(3000, () => {
  console.log('listening on *:3000');
});
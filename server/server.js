const path = require('path');
// http is another native node api - needed w/ socket.io
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


// path is a native node api that condenses paths
// here we get the pathcoming to this file, we back out, then enter public
// using path, this public path just goes straight to public!
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
// this creates the web socket server
let io = socketIO(server)

// middlewares
app.use(express.static(publicPath));

// event listener for the io
io.on('connection', (socket) => {
  console.log('new user connected')

  socket.on('createMessage', (message) => {
    console.log('Created Message:', message)
    // io.emit sends message to every connection
    // socket.emit sends message to a single connection
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('user was disconnected')
  })
})

server.listen(port, () => console.log(`Started on Port ${port}`));

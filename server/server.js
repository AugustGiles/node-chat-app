const path = require('path');
// http is another native node api - needed w/ socket.io
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message')


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

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // broadcast sends messages to everyone but the current socket
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined the chat'));

  socket.on('createMessage', (message, callback) => {
    console.log('Created Message:', message)
    // io.emit sends message to every connection
    // socket.emit sends message to a single connection
    io.emit('newMessage', generateMessage(message.from, message.text));
    // acknowledgement from server to client that it received the data
    callback('This is from the server');
  });

  socket.on('disconnect', () => {
    console.log('user was disconnected')
  })
})

server.listen(port, () => console.log(`Started on Port ${port}`));

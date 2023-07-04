// Core requirements
const path = require('path');
const http = require('http');
require('dotenv').config();

// Express Initilization
const express = require('express');
const app = express();

// Socket Set up
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

// Chat bot for welcome message
const admin = 'adminChat';

//  Utility functions
const messageForum = require('./utils/message');
const {
  joinChat,
  currentUser,
  userLeaves,
  chatRoom,
} = require('./utils/users');

const PORT = process.env.PORT || 3000;

// Connect front-end static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect when client connects
io.on('connection', (socket) => {
  socket.on('joinChat', ({ username, chatroom }) => {
    const user = joinChat(socket.id, username, chatroom);

    socket.join(user.chatroom);

    // Welcome current user and annouce user
    socket.emit('message', messageForum(admin, 'Welcome to the chat!'));
    socket.broadcast.to(user.chatroom).emit('message', messageForum(admin, `${user.username} has joined the chat.`));

    // Send user and room info
    io.to(user.chatroom).emit('chatRoom', {
      room: user.chatroom,
      users: chatRoom(user.chatroom),
    });
  });

  // Listen for Chat messages
  socket.on('chatMessage', (msg) => {
    const user = currentUser(socket.id);
    io.to(user.chatroom).emit('message', messageForum(user.username, msg));
  });

  // Client disconnects
  socket.on('disconnect', () => {
    const user = userLeaves(socket.id);

    if (user) {
      io.to(user.chatroom).emit('message',
        messageForum(admin, `${user.username} has left the chat`));

      // Send user and room info
      io.to(user.chatroom).emit('chatRoom', {
        room: user.chatroom,
        users: chatRoom(user.chatroom),
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const PORT = 3000 || process.env.PORT;
const formatMessage = require('./utils/messages')

//Set Static Folder
app.use(express.static('./public'));


//Run when client connects 
io.on('connection',socket => {
    console.log('New WS connection...');
    socket.emit('message',formatMessage('Admin','welcome to chat room'));

    //Broadcast when a user connects
   socket.broadcast.emit('message',formatMessage('Admin','A user has joined the chat'));

   //Runs when client disconnects
   socket.on('disconnect',() =>{
       io.emit('message','A user has left the chat');


   });

       //Listen for chatMessage

       socket.on('chatMessage',msg =>{
        io.emit('message',formatMessage('',msg));
    });

   


});




server.listen(PORT,() => console.log(`Server running on port ${PORT}`));
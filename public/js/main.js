// const e = require("cors");

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();
//Message from server
socket.on('message',message=>{
    console.log(message);
    outputMessage(message);

    // Scroll Down 
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Message Submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
//Get Message text
    const msg = e.target.elements.msg.value;
//Emitting Mesaage to server
socket.emit('chatMessage',msg);
//Clear Input
e.target.elements.msg.value='';
e.target.elements.msg.focus();
});




//output message for DOM

function outputMessage(message){
    const div = document.createElement('div');

    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
						<p class="text">
							${message.text}
						</p>`;

    document.querySelector('.chat-messages').appendChild(div);
}
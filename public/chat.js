// Make connection
const socket = io.connect("http://localhost:8080");

//  Query DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// Emit events

btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
        id: socket.id
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

//Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = "";
    if(data.id == socket.id){
        output.innerHTML += `<div class="row">
                                <div class="col-3">
                                    <strong>${data.handle}:</strong>
                                </div>
                                <div class="user col-8">${data.message}</div>
                            </div>`;
    }else{
        output.innerHTML += `<div class="row">
                                <div class="col-3">
                                    <strong>${data.handle}:</strong>
                                </div>
                                <div class="other col-8">${data.message}</div>
                            </div>`;
    }
});

socket.on('typing', function(data){
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
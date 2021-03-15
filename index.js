let express = require('express');
let socket = require('socket.io');

// App setup
let app = express();
let server = app.listen(8080, function(){
    console.log('listening to requests on port 8080');
});

// Static files
app.use(express.static('public'));

// Socket setup
let io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);
});
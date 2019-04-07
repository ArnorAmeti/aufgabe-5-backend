var express = require('express');
var socket = require('socket.io');

var app = express();


app.all('*', function (req, res, next) {
    var origin = req.get('origin');
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Socket setup & pass server variable
//pingTimeout: time inactivity allowed (in milliseconds) until the connection between the server and the client(s) is considered closed.
const io = socket(server, {pingTimeout: 15000});


//listen for connection and execute callback function when connection is made
io.on('connection', socket => {
    console.log('Server connection established with: ', socket.id);

    //broadcast to all other clients
    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    })
});

app.listen(process.env.PORT || 4000, function () {
    console.log('Your node js server is running');
});
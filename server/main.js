var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messagesList = [{
    id: 1,
    text: "hello, i'm a message!",
    author: 'Eric Maya'
}];

app.use(express.static('public'));

app.get('/', function ( req, res ) {
    res.status(200).send('Hello world!!!');
});

io.on('connection', function ( socket ) {
    console.log('Someone has been conected with Sockets');
    socket.emit('messages', messagesList);

    socket.on('new-message', function (data) {
        messagesList.push(data);

        io.sockets.emit('messages', messagesList);
    });
});



server.listen(8080, function () {
    console.log('Server run on port 8080');
});
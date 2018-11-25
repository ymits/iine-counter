var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

server.listen(3000);
app.use('/css', express.static(path.join(__dirname, 'client', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'client', 'dist', 'js')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/dist/index.html');
});

io.of('/api').on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

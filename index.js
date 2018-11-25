var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

server.listen(3000);
app.use('/css', express.static(path.join(__dirname, 'client', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'client', 'dist', 'js')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/dist/index.html');
});

io.of('/api').on('connection', (socket) => {
  // socket.emit('news', { hello: 'world' });
  const Player = require('./src/models/Player');
  socket.on('player/save', (data) => {
    const player = Player.of(data);
    player.save();
  });

  socket.on('player/list', (cb) => {
    Player.findAll().then((players) => {
      cb(players);
    });
  });

  socket.on('player/remove', (id) => {
    Player.remove(id);
  });
});

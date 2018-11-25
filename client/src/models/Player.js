import socket from '@/socket';

export default class Player {
  constructor(id, name, goodCount, badCount) {
    this.id = id;
    this.name = name;
    this.goodCount = goodCount;
    this.badCount = badCount;
  }

  save() {
    socket.emit('player/save', this);
  }

  goodCountUp() {
    socket.emit('player/goodCountUp', this.id);
  }

  badCountUp() {
    socket.emit('player/badCountUp', this.id);
  }

  score() {
    return this.goodCount - this.badCount;
  }

  static of(json) {
    return Object.assign(new Player(), json);
  }

  static ofName(name) {
    return new Player(null, name, 0, 0);
  }

  static findAll() {
    return new Promise(function(resolve) {
      socket.emit('player/list', (players) => {
        const res = players.map((data) => {
          return Player.of(data);
        });
        resolve(res);
      });
    });
  }

  static remove(id) {
    socket.emit('player/remove', id);
  }
}

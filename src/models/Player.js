let store = {};
let count = 0;

class Player {
  constructor(id, name, goodCount, badCount) {
    this.id = id;
    this.name = name;
    this.goodCount = goodCount;
    this.badCount = badCount;
  }

  save() {
    if (this.id == null) {
      this.id = 'P_' + ++count;
    }
    store[this.id] = this;
  }

  goodCountUp() {
    this.goodCount++;
  }

  badCountUp() {
    this.badCount++;
  }

  score() {
    return this.goodCount - this.badCount;
  }

  static of(json) {
    return Object.assign(new Player(), json);
  }

  static findAll() {
    return new Promise(function(resolve) {
      const res = [];
      for (let id in store) {
        res.push(store[id]);
      }
      resolve(res);
    });
  }

  static findById(id) {
    return new Promise(function(resolve) {
      resolve(store[id]);
    });
  }

  static remove(id) {
    delete store[id];
  }
}

module.exports = Player;

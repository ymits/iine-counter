let store = {};
let count = 0;

export default class Player {
  constructor(id, name, goodCount, badCount) {
    this.id = id;
    this.name = name;
    this.goodCount = goodCount;
    this.badCount = badCount;
  }

  save() {
    store[this.id] = this;
  }

  score() {
    return this.goodCount - this.badCount;
  }

  static of(name) {
    return new Player('P_' + ++count, name, 0, 0);
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

  static remove(id) {
    delete store[id];
  }
}

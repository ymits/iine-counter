let store = {};
let count = 0;

export default class Player {
  constructor(id, name, iineCount, yokunaineCount) {
    this.id = id;
    this.name = name;
    this.iineCount = iineCount;
    this.yokunaineCount = yokunaineCount;
  }

  save() {
    if (this.id == null) {
      this.id = ++count;
    }
    store[this.id] = this;
  }

  static new(name) {
    let player = new Player();
    player.name = name;
    return player;
  }

  static findAll() {
    return new Promise(function(resolve, reject) {
      const res = [];
      for (let id in store) {
        res.push(store[id]);
      }
      resolve(res);
    });
  }
}

const InfoHash = require('./info-hash');

class InfoHashArray extends InfoHash {

  addEntry(el) {
    const id = el[this.idField];
    this.info[id] = el;
    this.hash[el[this.hashField]] = this.hash[el[this.hashField]] || [];
    this.hash[el[this.hashField]].push(id);

    return this;
  }

  rehash() {
    this.hash = [];
    for (const el of this) {
      this.hash[el[this.hashField]] = this.hash[el[this.hashField]] || [];
      this.hash[el[this.hashField]].push(el[this.idField]);
    }

    return this;
  }
}

module.exports = InfoHashArray;

/* eslint-disable no-underscore-dangle */
class InfoHash {
  constructor(idField = 'id', hashField = 'name') {
    this.idField = idField;
    this.hashField = hashField;
    this.info = [];
    this.hash = [];
  }

  [Symbol.iterator]() {
    let index = 0;
    const keys = Object.keys(this.info);

    return {
      next: () => {
        if (index < keys.length) {
          return {
            done: false,
            value: this.info[keys[index++]]
          };
        } else {
          return {done: true};
        }
      }
    };
  }

  get idArr() {
    if (!this._idArr) {
      this._idArr = Object.keys(this.info);
    }

    return this._idArr;
  }

  addEntry(el) {
    const id = el[this.idField];
    this.info[id] = el;
    this.hash[el[this.hashField]] = id;

    return this;
  }

  rehash() {
    this.hash = [];
    for (const el of this) {
      this.hash[el[this.hashField]] = el[this.idField];
    }

    return this;
  }

  setArrayData(array, idFieldLocal, propertyName, dataField = false, indexField = false) {
    for (const el of array) {
      this.setPropertyValue(el, idFieldLocal, propertyName, dataField, indexField);
    }

    return this;
  }

  setPropertyValue(el, idFieldLocal, propertyName, dataField = false, indexField = false) {
    if (dataField) {
      if (indexField) {
        this.info[el[idFieldLocal]][propertyName] = this.info[el[idFieldLocal]][propertyName] || {};
        this.info[el[idFieldLocal]][propertyName][el[indexField]] = el[dataField];
      } else {
        this.info[el[idFieldLocal]][propertyName] = this.info[el[idFieldLocal]][propertyName] || [];
        this.info[el[idFieldLocal]][propertyName].push(el[dataField]);
      }
    } else if (indexField) {
      this.info[el[idFieldLocal]][propertyName] = this.info[el[idFieldLocal]][propertyName] || {};
      this.info[el[idFieldLocal]][propertyName][el[indexField]] = el;
    } else {
      this.info[el[idFieldLocal]][propertyName] = this.info[el[idFieldLocal]][propertyName] || [];
      this.info[el[idFieldLocal]][propertyName].push(el);
    }

    return this;
  }

  /**
   * @description set array of data to info/hash
   */
  setData(data) {
    for (const el of data) {
      this.addEntry(el);
    }

    return this;
  }

}

module.exports = InfoHash;

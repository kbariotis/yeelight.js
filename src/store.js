class Store {
  constructor() {
    if (new.target === Store) throw TypeError('new of abstract class Store');
  }

  static add() {
    throw TypeError('Please override `add` function on your store.');
  }

  static getById() {
    throw TypeError('Please override `getById` function on your store.');
  }

  static get() {
    throw TypeError('Please override `get` function on your store.');
  }
}

export default Store;

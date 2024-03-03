export default class CacheStore {
  constructor() {
    this.store = {};
  }

  get(key) {
    return this.store[key];
  }

  set(key, value, timeout = 10000) {
    this.store[key] = value;
    setTimeout(() => {
      delete this.store[key];
    }, timeout);
  }
}

/* globals window */

class Storage {
  constructor () {
    this.store = {}
  }

  getItem (key) {
    return this.store[key]
  }
  setItem (key, value) {
    this.store[key] = value
  }
  removeItem (key) {
    delete this.store
  }
  clear () {
    this.store = {}
  }
}

export default function store () {
  if (window.localStorage) {
    return window.localStorage
  }
  return new Storage()
}

/**
 * @description - Creates a Storage object (sort of).
 * @param {Array} initialPayload - To initialize the object with certain value,
 *   pass this as an array of objects of shape { key: 'key', value: <value> }.
 *   The values can be anything, but should probably be limited to what you
 *   could actually store in a browser's localStorage, since mimicking that is
 *   the whole point of this module.
 *
 *   Note: `initialPayload` gets shallow copied, so the while the array itself
 *   won't get messed with, the keys inside of them most likely will.
 * @returns {Object} - The "Storage" instance
 */
function createLocalStorage(initialPayload) {
  let storage = initialPayload ? initialPayload.slice() : []

  /**
   * @description - When invoked, will empty all keys out of the storage.
   */
  function clear() {
    storage = []
  }

  /**
   * @description - When passed a number n, this method will return the name of
   *   the nth key in the storage.
   * @param {Number} n - The index to get
   * @returns {String} - The name of the nth key, or undefined if n was too high
   */
  function key(n) {
    const item = storage[n]

    return item ? item.key : undefined
  }

  /**
   * @description - When passed a key name, will return that key's value.
   * @param {String} keyName - The key name
   * @returns {String} - The value associated with that key name or undefined
   *   if there is no corresponding key name
   */
  function getItem(keyName) {
    const item = storage.find(i => i.key === keyName)

    return item ? item.value : undefined
  }

  /**
   * @description - When passed a key name and value, will add that key to the
   *   storage, or update that key's value if it already exists.
   * @param {String} keyName - The key name to assign the value to
   * @param {String} value - The value to assign
   */
  function setItem(keyName, value) {
    const item = storage.find(i => i.key === keyName)

    if (item) {
      item.value = value
    } else {
      storage.push({ key: keyName, value })
    }
  }

  /**
   * @description - When passed a key name, will remove that key from the
   *   storage. If the key was not in the store, then this will be a no-op.
   * @param {String} keyName - The key of the item to remove
   */
  function removeItem(keyName) {
    storage = storage.filter(i => i.key !== keyName)
  }

  return {
    get length() {
      return storage.length
    },

    clear,
    key,
    getItem,
    removeItem,
    setItem,
  }
}

module.exports = createLocalStorage

const test = require('tape')

const createLocalStorage = require('..')

test('The storage can be cleared', t => {
  const storage = createLocalStorage([ { key: 'foo', value: 'bar' } ])

  storage.clear()

  t.equal(storage.length, 0, 'Having been cleared, nothing should be in it')

  t.end()
})

test('We can get the length of an empty one', t => {
  const storage = createLocalStorage()

  t.equal(storage.length, 0, 'No properties means length of 0')

  t.end()
})

test('We can get the length of a non-empty one', t => {
  const storage = createLocalStorage([ { key: 'foo', value: 'bar' } ])

  t.equal(storage.length, 1, '1 property means length of 1')

  t.end()
})

test('key function returns undefined for out-of-range n', t => {
  const storage = createLocalStorage([ { key: 'foo', value: 'bar' } ])

  t.equal(storage.key(1), undefined, 'foo is the key name')

  t.end()
})

test('key function returns name of the nth key', t => {
  const storage = createLocalStorage([ { key: 'foo', value: 'bar' } ])

  t.equal(storage.key(0), 'foo', 'foo is the key name')

  t.end()
})

test('getItem returns undefined if item is not defined', t => {
  const storage = createLocalStorage()

  t.equal(storage.getItem('whatevs'), undefined, 'whatevs not defined')

  t.end()
})

test('getItem returns value if item is defined', t => {
  const storage = createLocalStorage([ { key: 'foo', value: 'bar' } ])

  t.equal(storage.getItem('foo'), 'bar', 'foo is set to bar')

  t.end()
})

test('Can set an item', t => {
  const storage = createLocalStorage()

  storage.setItem('foo', 'bar')

  t.equal(storage.length, 1, 'There should be 1 item')
  t.equal(storage.getItem('foo'), 'bar', 'foo is set to bar')

  t.end()
})

test('Setting an item does not create duplicates', t => {
  const storage = createLocalStorage([ { key: 'foo', value: 'bar' } ])

  storage.setItem('foo', 'bar')

  t.equal(storage.length, 1, 'There should be 1 item')
  t.equal(storage.getItem('foo'), 'bar', 'foo is set to bar')

  t.end()
})

test('Can remove an item', t => {
  const storage = createLocalStorage([ { key: 'foo', value: 'bar' } ])

  storage.removeItem('foo')

  t.equal(storage.length, 0, 'There should be 0 items now')
  t.equal(storage.getItem('foo'), undefined, 'foo was cleared')

  t.end()
})

test('No error when removing an item that does not exist', t => {
  const storage = createLocalStorage()

  storage.removeItem('foo')

  t.end()
})

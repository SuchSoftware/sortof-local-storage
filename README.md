# sortof-local-storage

Implements the Storage API (sort of) so that unit tests using it can be run in Node.

## Why?

Node does not support the Storage API (since it isn't a browser) which is fine for server-based apps.  But sometimes you're building a browser-based app (e.g. something with [`create-react-app`](https://github.com/facebookincubator/create-react-app)), and your tests are running in a Node context. This module gives you something that complies with the Storage API that you can use for testing.

## Aren't there other modules that do this already?

Yes, and before doing this I considered:

* [https://github.com/node-browser-compat/dom-storage](https://github.com/node-browser-compat/dom-storage)
* [https://git.daplie.com/coolaj86/node-localStorage](https://git.daplie.com/coolaj86/node-localStorage)

I wanted something that didn't involve the global namespace and that didn't write to files.  One of those projects may better suit your needs, so be sure to check them out.

## Installation

npm:

`npm install --save sortof-local-storage`

Or if you use Yarn:

`yarn add sortof-local-storage`

## Assumptions

That you're familiar with [the Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage) and `localStorage` and that you just need something to use in unit tests.  For example, only strings should be stored.

## Usage

Creating an instance:

```
const createStorage = require('sortof-local-storage')

const storage = createStorage()
```

If you want to initialize it with some values, you can do that too:

```
const storage = createStorage([ { key: 'foo', value: 'bar' } ])
```

`sortof-local-storage` instances support all [the Storage API methods](https://developer.mozilla.org/en-US/docs/Web/API/Storage) except for events.

Let's just just call that out again-- *This package does not support Storage API events*.  PRs are welcome to add that if it would be useful to you.

## How is this useful in testing?

Suppose that you had some function in your browser-based app that access `window.localStorage`.  It might look something like this:

```
function loadThingFromLocalStorage() {
  return localStorage.getItem('thing')
}
```

If that function executes in a test suite that runs in a Node context, then it will fail when trying to access `localStorage`, because Node doesn't have that.

We can restructure that and use [dependency injection](https://www.youtube.com/watch?v=Z6vf6zC2DYQ&index=47&list=PLQmX5gaHg2SXyKuT9BQ_nbFIdZ39yeRxH):

```
function createThingLoader(storage) {
  return function loadThingFromLocalStorage() {
    return storage.getItem('thing')
  }
}
```

In a file that runs early in your browser app, you can set up your `loadThingFromLocalStorage` function thusly:

```
const loadThingFromLocalStorage = createThingLoader(window.localStorage)
```

The browser-based version will now run as it did before.  Then, in your test suite, you can set up something like:

```
const createStorage = require('sortof-local-storage')

const quoteUnquoteLocalStorage = createStorage()

const loadThingFromLocalStorage = createThingLoader(quoteUnquoteLocalStorage)
```

Yay!

## Issues

Please report 'em.

## Contributing

If something needs changing, please open an issue. PRs with tests are most welcome.

I do think the library'a API is "complete" with the exception of not supporting events, so large changes would likely be more appropriate in another module.  I'm trying to keep this one focused.

## Last thing

This should work on Node 4.8.3 and above.  If it doesen't, please file an issue on that.  This module does not aim to support lower than that.

## License

ISC

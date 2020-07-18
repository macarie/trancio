# 🍕 [trancio](https://github.com/macarie/trancio) [![Release Version](https://img.shields.io/npm/v/trancio.svg?label=&color=0080FF)](https://www.npmjs.com/package/trancio)

> Trancio lazily splits an array into chunks, providing both a functional and an iterable interface

![Build](https://github.com/macarie/trancio/workflows/test/badge.svg) ![Coverage Status](https://img.shields.io/codecov/c/github/macarie/trancio) [![License](https://img.shields.io/npm/l/trancio?color=42cdad)](https://github.com/macarie/compatto/blob/master/license)

## Install

```console
$ npm install trancio
```

Or if you prefer using Yarn:

```console
$ yarn add trancio
```

## Usage

```javascript
import { trancio } from "trancio"

const array = [1, 2, 3, 4, 5, 6, 7, 8]

const tranci = [...trancio(array, 3)]
// => Array [[1, 2, 3], [4, 5, 6], [7, 8]]

const trancia = trancio(array, 3)

trancia()
// => [1, 2, 3]

trancia()
// => [4, 5, 6]

trancia()
// => [7, 8]
```

If you're using TypeScript, you can also directly import the `.ts` file, just like this:

```typescript
import { trancio } from "trancio/ts"
```

By doing that your bundler should, hopefully, be able to compile it by following your project's `tsconfig.json` file.

## API

### trancio(input, size)

Create a _slicer_ that also implements the `IterableIterator` interface, that way you can use the spread operator, the `for...of` statement, and call `next()` over it.

Calling the _slicer_ will return a chunk of the array with `size` elements. If `input` can't be split evenly, the final chunk will contain the remaining elements.

#### input

Type: `unknown[]`

#### size

Type: `number`

The length of each chunk.

## More Examples

Using `next()`:

```typescript
import { trancio } from "trancio"

const array = [1, 2, 3, 4, 5, 6, 7, 8]

const trancia = trancio(array, 3)

const fetta = trancia.next()
// fetta => { value: [1, 2, 3], done: false }

trancia.next()
// fetta => { value: [4, 5, 6], done: false }

trancia.next()
// fetta => { value: [7, 8], done: false }

trancia.next()
// fetta => { value: undefined, done: true }
```

Using `for...of`:

```typescript
import { trancio } from "trancio"

const array = [1, 2, 3, 4, 5, 6, 7, 8]

for (const fetta of trancio(array, 3)) {
	console.log(fetta)
	// 1st time => [1, 2, 3]
	// 2nd time => [4, 5, 6]
	// 3rd time => [7, 8]
}
```

## FAQ

### What does _trancio_ mean?

Pronounced [`/ˈtrantʃo/`](https://github.com/macarie/trancio/blob/master/media/pronunciation.m4a?raw=true), trancio is an Italian word that means "slice" or "piece". Usually, the term is used for food, e.g. _"un trancio di pizza"_, which means _"a slice of pizza"_, hence the pizza emoji at the top.

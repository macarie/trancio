import test from 'ava'

import { trancio } from './index.js'

const count = (offset = 0) => (_, n) => offset + n + 1

const numbers = {
	origin: Array.from({ length: 20 }).map(count(0)),
	size: {
		three: Array.from({ length: 7 }).map((_, index) =>
			Array.from({ length: index === 6 ? 2 : 3 }).map(count(index * 3))
		),
	},
}

test('functional', (t) => {
	const trancia = trancio(numbers.origin, 3)

	for (let index = 0; index < 7; index += 1) {
		t.deepEqual(trancia(), numbers.size.three[index])
	}
})

test('iterator', (t) => {
	let index = 0

	for (const fetta of trancio(numbers.origin, 3)) {
		t.deepEqual(fetta, numbers.size.three[index])

		index += 1
	}
})

test('spread', (t) => {
	const tranci = [...trancio(numbers.origin, 3)]

	t.deepEqual(tranci, numbers.size.three)
})

test('next', (t) => {
	const trancia = trancio(numbers.origin, 3)
	const fetta = trancia.next()

	for (let index = 0; index < 7; index += 1) {
		t.deepEqual(fetta.value, numbers.size.three[index])

		trancia.next()
	}

	t.is(fetta.value, undefined)
	t.is(fetta.done, true)
})

test('zero size', (t) => {
	const trancia = trancio(numbers.origin, 0)

	for (let index = 0; index < 100; index++) {
		t.deepEqual(trancia(), [])
	}
})

test('negative size', (t) => {
	const trancia = trancio(numbers.origin, -5)

	for (let index = 0; index < 100; index++) {
		t.deepEqual(trancia(), [])
	}
})

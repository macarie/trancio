export interface TrancioIterable<T> extends IterableIterator<T[]> {
	[Symbol.iterator]: () => IterableIterator<T[]>
	(): T[] | undefined
}

/**
 * Lazily splits into groups the length of `size` an array. If `array` can't be split evenly, the final chunk will be the remaining elements.
 *
 * @param array The array to process.
 * @param size The length of each chunk.
 *
 * @yields A chunk of `array` containing `size` elements. With each iteration the slice range increseas by `size`, starting with `[0, size)`, it continues to `[size, size + size)`, and so on.
 *
 * @example
 * ```ts
 * import { trancio } from 'trancio'
 *
 * const array = [...Array(5).keys()]
 * const chunks = [...trancio(array, 3)]
 *
 * console.log(chunks)
 * // => [ [0, 1, 2], [3, 4] ]
 * ```
 */
export const trancio = <T>(array: T[], size: number): TrancioIterable<T> => {
	const safeSize = size < 0 ? 0 : size
	const tranci = Math.ceil(array.length / safeSize)

	const generatorObject: IteratorResult<T[], void> = Object.create(null)

	let trancioNumber = 0

	const generator: TrancioIterable<T> = () => {
		let chunk: T[] | undefined

		if (trancioNumber < tranci) {
			chunk = array.slice(
				trancioNumber * safeSize,
				trancioNumber * safeSize + safeSize
			)
		}

		trancioNumber += 1

		return chunk
	}

	generator.next = () => {
		generatorObject.value = generator()
		generatorObject.done = trancioNumber > tranci

		return generatorObject
	}

	generator[Symbol.iterator] = (): IterableIterator<T[]> => ({
		next: generator.next,
		[Symbol.iterator]: generator[Symbol.iterator],
	})

	return generator
}

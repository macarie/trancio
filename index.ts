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
export function* trancio<T>(
	array: T[],
	size: number
): Generator<T[], void, void> {
	const { length: arrayLength } = array

	if (size <= 0 || arrayLength === 0) {
		yield []

		return
	}

	const numberOfChunks = Math.ceil(arrayLength / size)

	for (let index = 0; index < numberOfChunks; index++) {
		const sliceFrom = index * size

		yield array.slice(sliceFrom, sliceFrom + size)
	}
}

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

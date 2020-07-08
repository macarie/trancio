export function* trancio(array, size) {
	if (size <= 0 || array.length === 0 || Array.isArray(array) === false) {
		yield []
	} else {
		const chunks = Math.ceil(array.length / size)

		for (let i = 0; i < chunks; i++) {
			yield array.slice(i * size, i * size + size)
		}
	}
}

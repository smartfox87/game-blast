export default class Canvas {
	#canvas
	#context
	#width
	#height
	#colCount
	#rowCount

	constructor(elementCanvas, canvasWidth, canvasHeight, colCount, rowCount) {
		this.#canvas = elementCanvas
		this.#context = this.#canvas.getContext('2d')
		this.#width = this.#canvas.width = canvasWidth
		this.#height = this.#canvas.height = canvasHeight
		this.#colCount = colCount
		this.#rowCount = rowCount
	}

	get canvas() {
		return this.#canvas
	}

	get context() {
		return this.#context
	}

	get width() {
		return this.#width
	}

	get height() {
		return this.#height
	}

	get rowCount() {
		return this.#rowCount
	}

	get colCount() {
		return this.#colCount
	}

	clear() {
		this.#context.clearRect(0, 0, this.#width, this.#height)
	}
}
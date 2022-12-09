export default class Item {
	#type
	#image
	#width
	#height

	constructor(type, src, width, height) {
		this.#type = type
		this.#image = new Image()
		this.#image.src = src
		this.#image.width = this.#width = width
		this.#image.height = this.#height = height
	}


	get image() {
		return this.#image
	}

	get type() {
		return this.#type
	}

	get width() {
		return this.#width
	}

	get height() {
		return this.#height
	}
}
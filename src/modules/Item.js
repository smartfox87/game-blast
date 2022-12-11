export default class Item {
	chance
	type
	image
	width
	height

	constructor(chance, type, src, width, height) {
		this.chance = chance
		this.type = type
		this.image = new Image()
		this.image.src = src
		this.image.width = this.width = width
		this.image.height = this.height = height
	}
}
export default class Controller {
	#canvas
	#interface
	#items
	#itemsMatrix
	#alikeItems = []
	#level
	#levels
	#moves
	#score = 0
	#match = 2

	constructor({ canvasInstance, interfaceInstance, itemsInstances, levels }) {
		this.#canvas = canvasInstance
		this.#interface = interfaceInstance
		this.#items = itemsInstances
		this.#itemsMatrix = Array(this.#canvas.colCount).fill(null).map((row, index) => Array(this.#canvas.rowCount).fill(null))
		this.#levels = levels
		this.#level = localStorage.getItem('level') || 1
	}

	#draw() {
		this.#canvas.clear()
		this.#itemsMatrix.forEach((row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				if (cell) {
					if (cell.image.complete) {
						this.#canvas.context.drawImage(cell.image, cellIndex * cell.width, rowIndex * cell.height, cell.width, cell.height)
					} else {
						cell.image.addEventListener('load', () => {
							this.#canvas.context.drawImage(cell.image, cellIndex * cell.width, rowIndex * cell.height, cell.width, cell.height)
						})
					}
				}
			})
		})
	}

	#generateField() {
		this.#canvas.clear()
		this.#itemsMatrix.forEach((row) => {
			row.forEach((cell, index) => row[index] = this.#items[Math.ceil(Math.random() * this.#items.length) - 1])
		})
		this.#draw()
	}

	#checkAlikeItems(rowIndex, cellIndex, excludeRowIndex, excludeCellIndex) {
		const activeItem = this.#itemsMatrix[rowIndex][cellIndex]
		let topItem = null
		let bottomItem = null
		let leftItem = null
		let rightItem = null

		if (this.#itemsMatrix[rowIndex - 1]?.[cellIndex]?.type === activeItem.type && !this.#alikeItems.find((alikeItem) => alikeItem.rowIndex === rowIndex - 1 && alikeItem.cellIndex === cellIndex)) {
			topItem = { rowIndex: rowIndex - 1, cellIndex: cellIndex }
			this.#alikeItems.push(topItem)

		}
		if (this.#itemsMatrix[rowIndex + 1]?.[cellIndex]?.type === activeItem.type && !this.#alikeItems.find((alikeItem) => alikeItem.rowIndex === rowIndex + 1 && alikeItem.cellIndex === cellIndex)) {
			bottomItem = { rowIndex: rowIndex + 1, cellIndex: cellIndex }
			this.#alikeItems.push(bottomItem)

		}
		if (this.#itemsMatrix[rowIndex]?.[cellIndex - 1]?.type === activeItem.type && !this.#alikeItems.find((alikeItem) => alikeItem.rowIndex === rowIndex && alikeItem.cellIndex === cellIndex - 1)) {
			leftItem = { rowIndex: rowIndex, cellIndex: cellIndex - 1 }
			this.#alikeItems.push(leftItem)

		}
		if (this.#itemsMatrix[rowIndex]?.[cellIndex + 1]?.type === activeItem.type && !this.#alikeItems.find((alikeItem) => alikeItem.rowIndex === rowIndex && alikeItem.cellIndex === cellIndex + 1)) {
			rightItem = { rowIndex: rowIndex, cellIndex: cellIndex + 1 }
			this.#alikeItems.push(rightItem)

		}

		if (topItem || bottomItem || leftItem || rightItem) {
			if (!this.#alikeItems.find((alikeItem) => alikeItem.rowIndex === rowIndex && alikeItem.cellIndex === cellIndex)) {
				this.#alikeItems.push({ rowIndex: rowIndex, cellIndex: cellIndex })
			}
			if (topItem) {
				this.#checkAlikeItems(topItem.rowIndex, topItem.cellIndex);
			}
			if (bottomItem) {
				this.#checkAlikeItems(bottomItem.rowIndex, bottomItem.cellIndex);
			}
			if (leftItem) {
				this.#checkAlikeItems(leftItem.rowIndex, leftItem.cellIndex);
			}
			if (rightItem) {
				this.#checkAlikeItems(rightItem.rowIndex, rightItem.cellIndex);
			}
		}
	}

	#clearAlikeItems() {
		this.#alikeItems.forEach(({ rowIndex, cellIndex }) => this.#itemsMatrix[rowIndex][cellIndex] = null)
		this.#draw()
		this.#alikeItems = []
	}

	#getRandomItem() {
		return this.#items[Math.floor((this.#items.length - 1) * Math.random())]
	}

	#checkFullMatrix() {
		return this.#itemsMatrix.flat(1).filter((item) => !!item).length === this.#canvas.rowCount * this.#canvas.colCount
	}

	#fillGaps() {
		for (let rowIndex = this.#canvas.rowCount - 1; rowIndex >= 0; rowIndex--) {
			this.#itemsMatrix[rowIndex].forEach((cell, cellIndex) => {
				if (!cell) {
					if (rowIndex === 0) {
						this.#itemsMatrix[rowIndex][cellIndex] = this.#getRandomItem()
					} else {
						for (let rowIndexSub = rowIndex - 1; rowIndexSub >= 0; rowIndexSub--) {
							if (this.#itemsMatrix[rowIndexSub][cellIndex]) {
								this.#itemsMatrix[rowIndex][cellIndex] = this.#itemsMatrix[rowIndexSub][cellIndex]
								this.#itemsMatrix[rowIndexSub][cellIndex] = null
								break
							}
						}
					}
				}
			})
		}
		this.#draw()
		if (!this.#checkFullMatrix()) {
			this.#fillGaps()
		}
	}

	#setScore() {
		this.#score += this.#alikeItems.length
		this.#interface.setScore(this.#score, this.#levels[this.#level])
	}

	#resetScore() {
		this.#score = 0
		this.#interface.resetScore(this.#score)
	}

	#resetMoves() {
		this.#moves = this.#levels[this.#level].moves
		this.#interface.resetMoves(this.#moves)
	}

	#setMatch() {
		if (this.#levels[this.#level].match) {
			this.#match = this.#levels[this.#level].match
		}
		this.#interface.setMatch(this.#match)
	}

	#nextLevel() {
		const nextLevel = this.#level + 1
		if (this.#levels[nextLevel]) {
			this.#level = nextLevel
			this.#generateField()
			this.#resetScore()
			this.#resetMoves()
			this.#setMatch()
			this.#interface.nextLevel()
			this.#interface.setLevel(this.#level)
			this.#interface.setProgress(this.#score / this.#levels[this.#level].score)
		}
	}

	#handleNextLevelClick() {
		this.#interface.$nextBtn.addEventListener('click', () => {
			this.#nextLevel()
		})
	}

	#handleResetLevelClick() {
		this.#interface.$resetBtn.addEventListener('click', () => {
			this.#resetScore()
			this.#resetMoves()
			this.#generateField()
			this.#interface.setProgress(this.#score / this.#levels[this.#level].score)
		})
	}

	#checkFinishedLevel() {
		return this.#score >= this.#levels[this.#level].score
	}

	#handleCanvasClick() {
		this.#canvas.canvas.addEventListener('click', (event) => {
			if (!this.#checkFinishedLevel()) {
				const xIndex = Math.floor(event.offsetX / (this.#canvas.width / this.#canvas.colCount))
				const yIndex = Math.floor(event.offsetY / (this.#canvas.height / this.#canvas.rowCount))
				this.#checkAlikeItems(yIndex, xIndex)

				if (this.#alikeItems.length >= this.#match) {
					this.#setScore()
					this.#clearAlikeItems()
					this.#fillGaps()
					this.#interface.decreaseMoves(--this.#moves)
					this.#interface.setProgress(this.#score / this.#levels[this.#level].score)
				}
			}
		})
	}

	init() {
		this.#generateField()
		this.#setMatch()
		this.#resetMoves()
		this.#handleCanvasClick()
		this.#handleNextLevelClick()
		this.#handleResetLevelClick()
		this.#interface.setLevel(this.#level)
	}
}
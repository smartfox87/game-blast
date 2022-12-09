import Dom from './Dom'

export default class Controller extends Dom {
	#canvas
	#items
	#itemsMatrix
	#alikeItems = []
	#level
	#levels
	#moves
	#score = 0
	#match = 2
	$match
	$level
	$progress
	$moves
	$score
	$nextBtn
	$resetBtn
	$restartBtn

	constructor({ canvas, items, levels, $level, $match, $progress, $moves, $score, $nextBtn, $resetBtn, $restartBtn }) {
		super()
		this.#canvas = canvas
		this.#items = items
		this.#itemsMatrix = Array(this.#canvas.colCount).fill(null)
			.map((row, index) => Array(this.#canvas.rowCount).fill(null))
		this.#levels = levels
		this.#level = localStorage.getItem('level') || 1
		this.$level = $level
		this.$match = $match
		this.$progress = $progress
		this.$moves = $moves
		this.$score = $score
		this.$nextBtn = $nextBtn
		this.$resetBtn = $resetBtn
		this.$restartBtn = $restartBtn
	}

	#clear() {
		this.#canvas.context.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
	}

	#draw() {
		this.#clear()
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
		this.#clear()
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

	#setLevel() {
		this.setValue(this.$level, this.#level)
	}

	#setScore() {
		this.#score += this.#alikeItems.length
		if (this.#score < this.#levels[this.#level].score) {
			this.setValue(this.$score, this.#score)
			this.showElement(this.$resetBtn)
		} else if (this.#score >= this.#levels[this.#level].score) {
			this.setValue(this.$score, this.#levels[this.#level].score)
			this.showElement(this.$nextBtn)
			this.hideElement(this.$resetBtn)
		}
	}

	#resetScore() {
		this.#score = 0
		this.setValue(this.$score, this.#score)
	}

	#setProgress() {
		this.setProgress(this.$progress, this.#score / this.#levels[this.#level].score)
	}

	#decreaseMoves() {
		this.setValue(this.$moves, --this.#moves)
	}

	#resetMoves() {
		this.#moves = this.#levels[this.#level].moves
		this.setValue(this.$moves, this.#levels[this.#level].moves)
	}

	#setMatch() {
		if (this.#levels[this.#level].match) {
			this.#match = this.#levels[this.#level].match
		}
		this.setValue(this.$match, this.#match)
	}

	#nextLevel() {
		const nextLevel = this.#level + 1
		if (this.#levels[nextLevel]) {
			this.#level = nextLevel
			this.#generateField()
			this.#setLevel()
			this.#resetScore()
			this.#resetMoves()
			this.#setProgress()
			this.#setMatch()
			this.hideElement(this.$nextBtn)
		}
	}

	#handleNextLevelClick() {
		this.$nextBtn.addEventListener('click', () => {
			this.#nextLevel()
		})
	}

	#handleResetLevelClick() {
		this.$resetBtn.addEventListener('click', () => {
			this.#resetScore()
			this.#setProgress()
			this.#resetMoves()
			this.#generateField()
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
					this.#setProgress()
					this.#decreaseMoves()
					this.#clearAlikeItems()
					this.#fillGaps()
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
		this.#setLevel()
	}
}
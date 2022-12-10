export default class Controller {
	#canvas
	#interface
	#items
	#itemsMatrix
	#alikeItemsArr = []
	#alikeItemsObj = {}
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
		if (this.#checkGameOver()) {
			this.#generateField()
		}
	}

	#getUniqueId() {
		return Math.round(Date.now() * (Math.random() || 0))
	}

	#checkAlikeItems(rowIndex, cellIndex, uniqueMoveId) {
		const activeItem = this.#itemsMatrix[rowIndex][cellIndex]
		let topItem = null
		let bottomItem = null
		let leftItem = null
		let rightItem = null

		if (this.#itemsMatrix[rowIndex - 1]?.[cellIndex]?.type === activeItem.type && !this.#alikeItemsArr.find((alikeItem) => alikeItem.rowIndex === rowIndex - 1 && alikeItem.cellIndex === cellIndex)) {
			topItem = { rowIndex: rowIndex - 1, cellIndex: cellIndex }
			this.#alikeItemsArr.push(topItem)
			if (uniqueMoveId) {
				if (this.#alikeItemsObj[uniqueMoveId]) {
					this.#alikeItemsObj[uniqueMoveId].push(topItem)
				} else {
					this.#alikeItemsObj[uniqueMoveId] = [ topItem ]
				}
			}
		}
		if (this.#itemsMatrix[rowIndex + 1]?.[cellIndex]?.type === activeItem.type && !this.#alikeItemsArr.find((alikeItem) => alikeItem.rowIndex === rowIndex + 1 && alikeItem.cellIndex === cellIndex)) {
			bottomItem = { rowIndex: rowIndex + 1, cellIndex: cellIndex }
			this.#alikeItemsArr.push(bottomItem)
			if (uniqueMoveId) {
				if (this.#alikeItemsObj[uniqueMoveId]) {
					this.#alikeItemsObj[uniqueMoveId].push(bottomItem)
				} else {
					this.#alikeItemsObj[uniqueMoveId] = [ bottomItem ]
				}
			}
		}
		if (this.#itemsMatrix[rowIndex]?.[cellIndex - 1]?.type === activeItem.type && !this.#alikeItemsArr.find((alikeItem) => alikeItem.rowIndex === rowIndex && alikeItem.cellIndex === cellIndex - 1)) {
			leftItem = { rowIndex: rowIndex, cellIndex: cellIndex - 1 }
			this.#alikeItemsArr.push(leftItem)
			if (uniqueMoveId) {
				if (this.#alikeItemsObj[uniqueMoveId]) {
					this.#alikeItemsObj[uniqueMoveId].push(leftItem)
				} else {
					this.#alikeItemsObj[uniqueMoveId] = [ leftItem ]
				}
			}
		}
		if (this.#itemsMatrix[rowIndex]?.[cellIndex + 1]?.type === activeItem.type && !this.#alikeItemsArr.find((alikeItem) => alikeItem.rowIndex === rowIndex && alikeItem.cellIndex === cellIndex + 1)) {
			rightItem = { rowIndex: rowIndex, cellIndex: cellIndex + 1 }
			this.#alikeItemsArr.push(rightItem)
			if (uniqueMoveId) {
				if (this.#alikeItemsObj[uniqueMoveId]) {
					this.#alikeItemsObj[uniqueMoveId].push(rightItem)
				} else {
					this.#alikeItemsObj[uniqueMoveId] = [ rightItem ]
				}
			}
		}

		if (topItem || bottomItem || leftItem || rightItem) {
			if (!this.#alikeItemsArr.find((alikeItem) => alikeItem.rowIndex === rowIndex && alikeItem.cellIndex === cellIndex)) {
				this.#alikeItemsArr.push({ rowIndex: rowIndex, cellIndex: cellIndex })
				if (uniqueMoveId) {
					if (this.#alikeItemsObj[uniqueMoveId]) {
						this.#alikeItemsObj[uniqueMoveId].push({ rowIndex: rowIndex, cellIndex: cellIndex })
					} else {
						this.#alikeItemsObj[uniqueMoveId] = [ { rowIndex: rowIndex, cellIndex: cellIndex } ]
					}
				}
			}
			if (topItem) {
				this.#checkAlikeItems(topItem.rowIndex, topItem.cellIndex, uniqueMoveId);
			}
			if (bottomItem) {
				this.#checkAlikeItems(bottomItem.rowIndex, bottomItem.cellIndex, uniqueMoveId);
			}
			if (leftItem) {
				this.#checkAlikeItems(leftItem.rowIndex, leftItem.cellIndex, uniqueMoveId);
			}
			if (rightItem) {
				this.#checkAlikeItems(rightItem.rowIndex, rightItem.cellIndex, uniqueMoveId);
			}
		}
	}

	#clearAlikeItemsStores() {
		this.#alikeItemsArr = []
		this.#alikeItemsObj = {}
	}

	#clearAlikeItems() {
		this.#alikeItemsArr.forEach(({ rowIndex, cellIndex }) => this.#itemsMatrix[rowIndex][cellIndex] = null)
		this.#draw()
		this.#clearAlikeItemsStores()
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

	#checkFinishedLevel() {
		return this.#score >= this.#levels[this.#level].score
	}

	#checkGameOver() {
		this.#itemsMatrix.forEach((row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				this.#checkAlikeItems(rowIndex, cellIndex, this.#getUniqueId())
			})
		})
		let gameIsNotOver = false
		for (const key in this.#alikeItemsObj) {
			if (this.#alikeItemsObj[key].length >= this.#match) {
				gameIsNotOver = true
			}
		}
		this.#clearAlikeItemsStores()
		return !gameIsNotOver
	}

	#setScore() {
		this.#score += this.#alikeItemsArr.length
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

	#handleRestartGameClick() {
		this.#interface.$restartBtn.addEventListener('click', () => {
			this.#level = 1
			this.#resetScore()
			this.#resetMoves()
			this.#interface.setProgress(this.#score / this.#levels[this.#level].score)
			this.#interface.restartGame()
			this.#generateField()
		})
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

	#handleCanvasClick() {
		this.#canvas.canvas.addEventListener('click', (event) => {
			if (!this.#checkFinishedLevel()) {
				const xIndex = Math.floor(event.offsetX / (this.#canvas.width / this.#canvas.colCount))
				const yIndex = Math.floor(event.offsetY / (this.#canvas.height / this.#canvas.rowCount))
				this.#checkAlikeItems(yIndex, xIndex)

				if (this.#alikeItemsArr.length >= this.#match) {
					this.#setScore()
					this.#clearAlikeItems()
					this.#fillGaps()
					this.#interface.decreaseMoves(--this.#moves)
					this.#interface.setProgress(this.#score / this.#levels[this.#level].score)
					if (this.#checkGameOver()) {
						this.#interface.showGameOver()
					}
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
		this.#handleRestartGameClick()
		this.#interface.setLevel(this.#level)
	}
}
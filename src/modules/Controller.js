export default class Controller {
	#canvas
	#interface
	#items
	#itemsMatrix
	#alikeItems = []
	#possibleMoves = {}
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

	#getRandomItem() {
		const randomItem = this.#items[Math.ceil(Math.random() * this.#items.length) - 1]
		const checkChance = Math.random() <= randomItem.chance
		return checkChance ? randomItem : this.#getRandomItem()
	}

	#generatePlayingField() {
		this.#canvas.clear()
		this.#itemsMatrix.forEach((row) => {
			row.forEach((cell, index) => row[index] = this.#getRandomItem())
		})
		if (this.#checkGameOver()) {
			this.#generatePlayingField()
		} else {
			this.#draw()
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

	#checkBombNeighbours(rowIndex, cellIndex) {
		this.#alikeItems.push({ rowIndex: rowIndex, cellIndex: cellIndex })

		for (let radius = 1; radius <= this.#levels[this.#level].bombRadius; radius++) {
			if (this.#itemsMatrix[rowIndex - radius]?.[cellIndex] && !this.#alikeItems.find((alikeItem) => alikeItem.rowIndex === rowIndex - radius && alikeItem.cellIndex === cellIndex)) {
				this.#alikeItems.push({ rowIndex: rowIndex - radius, cellIndex: cellIndex })
			}
			if (this.#itemsMatrix[rowIndex + radius]?.[cellIndex] && !this.#alikeItems.find((alikeItem) => alikeItem.rowIndex === rowIndex + radius && alikeItem.cellIndex === cellIndex)) {
				this.#alikeItems.push({ rowIndex: rowIndex + radius, cellIndex: cellIndex })
			}
			if (this.#itemsMatrix[rowIndex][cellIndex - radius] && !this.#alikeItems.find((alikeItem) => alikeItem.rowIndex === rowIndex && alikeItem.cellIndex === cellIndex - radius)) {
				this.#alikeItems.push({ rowIndex: rowIndex, cellIndex: cellIndex - radius })
			}
			if (this.#itemsMatrix[rowIndex][cellIndex + radius] && !this.#alikeItems.find((alikeItem) => alikeItem.rowIndex === rowIndex && alikeItem.cellIndex === cellIndex + radius)) {
				this.#alikeItems.push({ rowIndex: rowIndex, cellIndex: cellIndex + radius })
			}
		}
	}

	#checkPossibleMoves(rowIndex, cellIndex, uniqueMoveId) {
		const activeItem = this.#itemsMatrix[rowIndex][cellIndex]
		let topItem = null
		let bottomItem = null
		let leftItem = null
		let rightItem = null

		if (this.#itemsMatrix[rowIndex - 1]?.[cellIndex]?.type === activeItem.type && !this.#possibleMoves[uniqueMoveId]?.find((alikeItem) => alikeItem.rowIndex === rowIndex - 1 && alikeItem.cellIndex === cellIndex)) {
			topItem = { rowIndex: rowIndex - 1, cellIndex: cellIndex }
			if (this.#possibleMoves[uniqueMoveId]) {
				this.#possibleMoves[uniqueMoveId].push(topItem)
			} else {
				this.#possibleMoves[uniqueMoveId] = [ topItem ]
			}
		}
		if (this.#itemsMatrix[rowIndex + 1]?.[cellIndex]?.type === activeItem.type && !this.#possibleMoves[uniqueMoveId]?.find((alikeItem) => alikeItem.rowIndex === rowIndex + 1 && alikeItem.cellIndex === cellIndex)) {
			bottomItem = { rowIndex: rowIndex + 1, cellIndex: cellIndex }
			if (this.#possibleMoves[uniqueMoveId]) {
				this.#possibleMoves[uniqueMoveId].push(bottomItem)
			} else {
				this.#possibleMoves[uniqueMoveId] = [ bottomItem ]
			}
		}
		if (this.#itemsMatrix[rowIndex]?.[cellIndex - 1]?.type === activeItem.type && !this.#possibleMoves[uniqueMoveId]?.find((alikeItem) => alikeItem.rowIndex === rowIndex && alikeItem.cellIndex === cellIndex - 1)) {
			leftItem = { rowIndex: rowIndex, cellIndex: cellIndex - 1 }
			if (this.#possibleMoves[uniqueMoveId]) {
				this.#possibleMoves[uniqueMoveId].push(leftItem)
			} else {
				this.#possibleMoves[uniqueMoveId] = [ leftItem ]
			}
		}
		if (this.#itemsMatrix[rowIndex]?.[cellIndex + 1]?.type === activeItem.type && !this.#possibleMoves[uniqueMoveId]?.find((alikeItem) => alikeItem.rowIndex === rowIndex && alikeItem.cellIndex === cellIndex + 1)) {
			rightItem = { rowIndex: rowIndex, cellIndex: cellIndex + 1 }
			if (this.#possibleMoves[uniqueMoveId]) {
				this.#possibleMoves[uniqueMoveId].push(rightItem)
			} else {
				this.#possibleMoves[uniqueMoveId] = [ rightItem ]
			}
		}

		if (topItem || bottomItem || leftItem || rightItem) {
			if (!this.#possibleMoves[uniqueMoveId]?.find((alikeItem) => alikeItem.rowIndex === rowIndex && alikeItem.cellIndex === cellIndex)) {
				this.#alikeItems.push({ rowIndex: rowIndex, cellIndex: cellIndex })
				if (this.#possibleMoves[uniqueMoveId]) {
					this.#possibleMoves[uniqueMoveId].push({ rowIndex: rowIndex, cellIndex: cellIndex })
				} else {
					this.#possibleMoves[uniqueMoveId] = [ { rowIndex: rowIndex, cellIndex: cellIndex } ]
				}
			}
			if (topItem) {
				this.#checkPossibleMoves(topItem.rowIndex, topItem.cellIndex, uniqueMoveId);
			}
			if (bottomItem) {
				this.#checkPossibleMoves(bottomItem.rowIndex, bottomItem.cellIndex, uniqueMoveId);
			}
			if (leftItem) {
				this.#checkPossibleMoves(leftItem.rowIndex, leftItem.cellIndex, uniqueMoveId);
			}
			if (rightItem) {
				this.#checkPossibleMoves(rightItem.rowIndex, rightItem.cellIndex, uniqueMoveId);
			}
		}
	}

	#clearAlikeItems() {
		this.#alikeItemsArr.forEach(({ rowIndex, cellIndex }) => this.#itemsMatrix[rowIndex][cellIndex] = null)
		this.#draw()
		this.#alikeItems = []
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
				this.#checkPossibleMoves(rowIndex, cellIndex, this.#getUniqueId())
			})
		})
		let gameIsNotOver = Object.values(this.#possibleMoves).some((move) => move.length >= this.#match)
		this.#possibleMoves = {}
		return !gameIsNotOver
	}

	#setScore() {
		this.#score += this.#alikeItemsArr.length
		this.#interface.setScore(this.#score, this.#levels[this.#level], this.#levels[this.#level + 1])
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

	#handleRestartGameClick() {
		this.#interface.$restartBtn.addEventListener('click', () => {
			this.#level = 1
			this.#resetScore()
			this.#resetMoves()
			this.#setMatch()
			this.#interface.setLevel(this.#level)
			this.#interface.setProgress(this.#score / this.#levels[this.#level].score)
			this.#interface.restartGame()
			this.#generatePlayingField()
		})
	}

	#handleNextLevelClick() {
		this.#interface.$nextBtn.addEventListener('click', () => {
			const nextLevel = this.#level + 1
			if (this.#levels[nextLevel]) {
				this.#level = nextLevel
				this.#resetScore()
				this.#resetMoves()
				this.#setMatch()
				this.#generatePlayingField()
				this.#interface.setLevel(this.#level)
				this.#interface.setProgress(this.#score / this.#levels[this.#level].score)
			}
		})
	}

	#handleResetLevelClick() {
		this.#interface.$resetBtn.addEventListener('click', () => {
			this.#resetScore()
			this.#resetMoves()
			this.#generatePlayingField()
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
					if (this.#checkGameOver() && !this.#checkFinishedLevel()) {
						this.#interface.showGameOver()
					}
				}
			}
		})
	}

	init() {
		this.#setMatch()
		this.#resetMoves()
		this.#generatePlayingField()
		this.#handleCanvasClick()
		this.#handleNextLevelClick()
		this.#handleResetLevelClick()
		this.#handleRestartGameClick()
		this.#interface.setLevel(this.#level)
	}
}
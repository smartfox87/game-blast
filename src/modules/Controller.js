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
	#stepFrames = 1
	#animationStep = 1

	constructor({ canvasInstance, interfaceInstance, itemsInstances, levels, animationStep }) {
		this.#canvas = canvasInstance
		this.#interface = interfaceInstance
		this.#items = itemsInstances
		this.#itemsMatrix = Array(this.#canvas.colCount).fill(null).map((row, index) => Array(this.#canvas.rowCount).fill(null))
		this.#levels = levels
		this.#level = localStorage.getItem('level') || 1
		this.#animationStep = animationStep
	}

	#draw() {
		this.#canvas.clear()
		this.#itemsMatrix.forEach((row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				if (cell) {
					if (cell.image.complete) {
						this.#canvas.context.drawImage(cell.image, cell.x, cell.y, cell.width, cell.height)
					} else {
						cell.image.addEventListener('load', () => {
							this.#canvas.context.drawImage(cell.image, cell.x, cell.y, cell.width, cell.height)
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
		this.#itemsMatrix.forEach((row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				const randomItem = this.#getRandomItem()
				row[cellIndex] = { ...randomItem, y: rowIndex * randomItem.height, x: cellIndex * randomItem.width }
			})
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

	#processPickItem(rowIndex, cellIndex, uniqueMoveId) {
		const activeItem = this.#itemsMatrix[rowIndex][cellIndex]
		if (activeItem.type === 'bomb') {
			this.#checkBombNeighbours(rowIndex, cellIndex)
		} else {
			this.#checkAlikeItems(rowIndex, cellIndex, uniqueMoveId)
		}
	}

	#checkAvailabilityInAlikeItems(rowIndex, cellIndex) {
		return this.#alikeItems.find((alikeItem) => alikeItem.rowIndex === rowIndex && alikeItem.cellIndex === cellIndex)
	}

	#checkAlikeItems(rowIndex, cellIndex) {
		const activeItem = this.#itemsMatrix[rowIndex][cellIndex]
		let topItem = null
		let bottomItem = null
		let leftItem = null
		let rightItem = null

		if (this.#itemsMatrix[rowIndex - 1]?.[cellIndex]?.type === activeItem.type && !this.#checkAvailabilityInAlikeItems(rowIndex - 1, cellIndex)) {
			topItem = { rowIndex: rowIndex - 1, cellIndex: cellIndex }
			this.#alikeItems.push(topItem)
		}
		if (this.#itemsMatrix[rowIndex + 1]?.[cellIndex]?.type === activeItem.type && !this.#checkAvailabilityInAlikeItems(rowIndex + 1, cellIndex)) {
			bottomItem = { rowIndex: rowIndex + 1, cellIndex: cellIndex }
			this.#alikeItems.push(bottomItem)
		}
		if (this.#itemsMatrix[rowIndex][cellIndex - 1]?.type === activeItem.type && !this.#checkAvailabilityInAlikeItems(rowIndex, cellIndex - 1)) {
			leftItem = { rowIndex: rowIndex, cellIndex: cellIndex - 1 }
			this.#alikeItems.push(leftItem)
		}
		if (this.#itemsMatrix[rowIndex][cellIndex + 1]?.type === activeItem.type && !this.#checkAvailabilityInAlikeItems(rowIndex, cellIndex + 1)) {
			rightItem = { rowIndex: rowIndex, cellIndex: cellIndex + 1 }
			this.#alikeItems.push(rightItem)
		}

		if (topItem || bottomItem || leftItem || rightItem) {
			if (!this.#checkAvailabilityInAlikeItems(rowIndex, cellIndex)) {
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

	#checkBombNeighbours(rowIndex, cellIndex) {
		const maxRadius = this.#levels[this.#level].bombRadius
		this.#alikeItems.push({ rowIndex: rowIndex, cellIndex: cellIndex })

		for (let mainRadius = 0; mainRadius <= maxRadius; mainRadius++) {
			const bottomRowIndex = rowIndex - mainRadius
			if (this.#itemsMatrix[bottomRowIndex]?.[cellIndex] && !this.#checkAvailabilityInAlikeItems(bottomRowIndex, cellIndex)) {
				this.#alikeItems.push({ rowIndex: bottomRowIndex, cellIndex: cellIndex })

				for (let secondRadius = 0; secondRadius <= maxRadius; secondRadius++) {
					const leftCellIndex = cellIndex - secondRadius
					if (this.#itemsMatrix[bottomRowIndex]?.[leftCellIndex] && !this.#checkAvailabilityInAlikeItems(bottomRowIndex, leftCellIndex)) {
						this.#alikeItems.push({ rowIndex: bottomRowIndex, cellIndex: leftCellIndex })
					}
					const rightCellIndex = cellIndex + secondRadius
					if (this.#itemsMatrix[bottomRowIndex]?.[rightCellIndex] && !this.#checkAvailabilityInAlikeItems(bottomRowIndex, rightCellIndex)) {
						this.#alikeItems.push({ rowIndex: bottomRowIndex, cellIndex: rightCellIndex })
					}
				}
			}
			const topRowIndex = rowIndex + mainRadius
			if (this.#itemsMatrix[topRowIndex]?.[cellIndex] && !this.#checkAvailabilityInAlikeItems(topRowIndex, cellIndex)) {
				this.#alikeItems.push({ rowIndex: topRowIndex, cellIndex: cellIndex })

				for (let secondRadius = 0; secondRadius <= maxRadius; secondRadius++) {
					const leftCellIndex = cellIndex - secondRadius
					if (this.#itemsMatrix[topRowIndex]?.[leftCellIndex] && !this.#checkAvailabilityInAlikeItems(topRowIndex, leftCellIndex)) {
						this.#alikeItems.push({ rowIndex: topRowIndex, cellIndex: leftCellIndex })
					}
					const rightCellIndex = cellIndex + secondRadius
					if (this.#itemsMatrix[topRowIndex]?.[rightCellIndex] && !this.#checkAvailabilityInAlikeItems(topRowIndex, rightCellIndex)) {
						this.#alikeItems.push({ rowIndex: topRowIndex, cellIndex: rightCellIndex })
					}
				}
			}
			const leftCellIndex = cellIndex - mainRadius
			if (this.#itemsMatrix[rowIndex][leftCellIndex] && !this.#checkAvailabilityInAlikeItems(rowIndex, leftCellIndex)) {
				this.#alikeItems.push({ rowIndex: rowIndex, cellIndex: leftCellIndex })
			}
			const rightCellIndex = cellIndex + mainRadius
			if (this.#itemsMatrix[rowIndex][rightCellIndex] && !this.#checkAvailabilityInAlikeItems(rowIndex, rightCellIndex)) {
				this.#alikeItems.push({ rowIndex: rowIndex, cellIndex: rightCellIndex })
			}
		}
	}

	#checkAvailabilityInPossibleMoves(uniqueMoveId, rowIndex, cellIndex) {
		return this.#possibleMoves[uniqueMoveId]?.find((alikeItem) => alikeItem.rowIndex === rowIndex && alikeItem.cellIndex === cellIndex)
	}

	#checkPossibleMoves(rowIndex, cellIndex, uniqueMoveId) {
		const activeItem = this.#itemsMatrix[rowIndex][cellIndex]

		if (activeItem) {
			let topItem = null
			let bottomItem = null
			let leftItem = null
			let rightItem = null

			if (this.#itemsMatrix[rowIndex - 1]?.[cellIndex]?.type === activeItem.type && !this.#checkAvailabilityInPossibleMoves(uniqueMoveId, rowIndex - 1, cellIndex)) {
				topItem = { rowIndex: rowIndex - 1, cellIndex: cellIndex }
				if (this.#possibleMoves[uniqueMoveId]) {
					this.#possibleMoves[uniqueMoveId].push(topItem)
				} else {
					this.#possibleMoves[uniqueMoveId] = [ topItem ]
				}
			}
			if (this.#itemsMatrix[rowIndex + 1]?.[cellIndex]?.type === activeItem.type && !this.#checkAvailabilityInPossibleMoves(uniqueMoveId, rowIndex + 1, cellIndex)) {
				bottomItem = { rowIndex: rowIndex + 1, cellIndex: cellIndex }
				if (this.#possibleMoves[uniqueMoveId]) {
					this.#possibleMoves[uniqueMoveId].push(bottomItem)
				} else {
					this.#possibleMoves[uniqueMoveId] = [ bottomItem ]
				}
			}
			if (this.#itemsMatrix[rowIndex]?.[cellIndex - 1]?.type === activeItem.type && !this.#checkAvailabilityInPossibleMoves(uniqueMoveId, rowIndex, cellIndex - 1)) {
				leftItem = { rowIndex: rowIndex, cellIndex: cellIndex - 1 }
				if (this.#possibleMoves[uniqueMoveId]) {
					this.#possibleMoves[uniqueMoveId].push(leftItem)
				} else {
					this.#possibleMoves[uniqueMoveId] = [ leftItem ]
				}
			}
			if (this.#itemsMatrix[rowIndex]?.[cellIndex + 1]?.type === activeItem.type && !this.#checkAvailabilityInPossibleMoves(uniqueMoveId, rowIndex, cellIndex + 1)) {
				rightItem = { rowIndex: rowIndex, cellIndex: cellIndex + 1 }
				if (this.#possibleMoves[uniqueMoveId]) {
					this.#possibleMoves[uniqueMoveId].push(rightItem)
				} else {
					this.#possibleMoves[uniqueMoveId] = [ rightItem ]
				}
			}

			if (topItem || bottomItem || leftItem || rightItem) {
				if (!this.#checkAvailabilityInPossibleMoves(uniqueMoveId, rowIndex, cellIndex)) {
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
	}

	#clearAlikeItems() {
		this.#alikeItems.forEach(({ rowIndex, cellIndex }) => this.#itemsMatrix[rowIndex][cellIndex] = null)
		this.#draw()
		this.#alikeItems = []
	}

	#checkFullMatrix() {
		return this.#itemsMatrix.flat(1).filter((item) => !!item).length === this.#canvas.rowCount * this.#canvas.colCount
	}

	#animateFallDown(item, maxY) {
		return new Promise((resolve) => {
			if (item.animationFrame % this.#stepFrames === 0 && item.y < maxY) {
				item.y += this.#animationStep
			}

			if (item.y < maxY) {
				item.animationFrame++
				requestAnimationFrame(() => {
					this.#animateFallDown(item, maxY)
						.then(() => {
							resolve()
						})
				})
			} else {
				item.animationFrame = 0
				resolve()
			}

			this.#draw()
		})
	}

	#fillCollGaps(collIndex) {
		for (let rowIndex = this.#itemsMatrix.length - 1; rowIndex >= 0; rowIndex--) {
			if (!this.#itemsMatrix[rowIndex][collIndex]) {
				if (rowIndex === 0) {
					const randomItem = this.#getRandomItem()
					const item = { ...randomItem, y: -randomItem.height, x: collIndex * randomItem.width, animation: true }
					this.#itemsMatrix[rowIndex][collIndex] = item
					this.#animateFallDown(item, rowIndex * item.height)
						.then(() => {
							if (!this.#checkFullMatrix()) {
								this.#fillCollGaps(collIndex)
							}
						})
				} else {
					for (let rowIndexSub = rowIndex - 1; rowIndexSub >= 0; rowIndexSub--) {
						const item = this.#itemsMatrix[rowIndexSub][collIndex]
						if (item) {
							this.#itemsMatrix[rowIndex][collIndex] = item
							this.#itemsMatrix[rowIndexSub][collIndex] = null
							this.#animateFallDown(item, rowIndex * item.height)
								.then(() => {
									if (!this.#checkFullMatrix()) {
										this.#fillCollGaps(collIndex)
									}
								})
							break
						}
					}
				}
			}
		}
	}

	#fillGaps() {
		for (let collIndex = 0; collIndex < this.#canvas.colCount; collIndex++) {
			this.#fillCollGaps(collIndex)
		}
	}

	#checkFinishedLevel() {
		return this.#score >= this.#levels[this.#level].score
	}

	#checkGameOver() {
		let bombAvailability = false

		this.#itemsMatrix.forEach((row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				bombAvailability = bombAvailability || cell?.type === 'bomb'
				this.#checkPossibleMoves(rowIndex, cellIndex, this.#getUniqueId())
			})
		})
		let gameIsNotOver = Object.values(this.#possibleMoves).some((move) => move.length >= this.#match)

		this.#possibleMoves = {}
		return !bombAvailability && !gameIsNotOver
	}

	#setScore() {
		this.#score += this.#alikeItems.length
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
				this.#alikeItems = []
				const xIndex = Math.floor(event.offsetX / (this.#canvas.width / this.#canvas.colCount))
				const yIndex = Math.floor(event.offsetY / (this.#canvas.height / this.#canvas.rowCount))
				this.#processPickItem(yIndex, xIndex)

				if (this.#alikeItems.length >= this.#match) {
					this.#setScore()
					this.#clearAlikeItems()
					setTimeout(() => {
						this.#fillGaps()
					}, 300)
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
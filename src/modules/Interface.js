import Dom from './Dom'

export default class Interface extends Dom {
	$level
	$match
	$progress
	$moves
	$score
	$nextBtn
	$resetBtn
	$restartBtn
	$gameOver
	$gameWin

	constructor({ $level, $match, $progress, $moves, $score, $nextBtn, $resetBtn, $restartBtn, $gameOver, $gameWin }) {
		super()
		this.$level = $level
		this.$match = $match
		this.$progress = $progress
		this.$moves = $moves
		this.$score = $score
		this.$nextBtn = $nextBtn
		this.$resetBtn = $resetBtn
		this.$restartBtn = $restartBtn
		this.$gameOver = $gameOver
		this.$gameWin = $gameWin
	}

	setLevel(value) {
		this.setValue(this.$level, value)
		this.hideElement(this.$nextBtn)
	}

	setScore(value) {
		this.setValue(this.$score, value)
	}

	showResetField() {
		this.showElement(this.$resetBtn)
	}

	hideResetField() {
		this.hideElement(this.$resetBtn)
	}

	resetScore(value) {
		this.resetValue(this.$score, value)
	}

	setProgress(value) {
		this.setWidth(this.$progress, value)
	}

	decreaseMoves(value) {
		this.setValue(this.$moves, value)
	}

	resetMoves(value) {
		this.setValue(this.$moves, value)
	}

	setMatch(value) {
		this.setValue(this.$match, value)
	}

	restartGame() {
		this.hideElement(this.$gameOver)
		this.hideElement(this.$gameWin)
		this.hideElement(this.$restartBtn)
	}

	showGameOver() {
		this.showElement(this.$gameOver)
		this.showElement(this.$restartBtn)
		this.hideElement(this.$resetBtn)
	}

	showNextLevel() {
		this.showElement(this.$nextBtn)
		this.hideElement(this.$resetBtn)
	}

	showGameWin() {
		this.showElement(this.$gameWin)
		this.showElement(this.$restartBtn)
		this.hideElement(this.$resetBtn)
	}
}
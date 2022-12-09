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

	constructor({ $level, $match, $progress, $moves, $score, $nextBtn, $resetBtn, $restartBtn }) {
		super()
		this.$level = $level
		this.$match = $match
		this.$progress = $progress
		this.$moves = $moves
		this.$score = $score
		this.$nextBtn = $nextBtn
		this.$resetBtn = $resetBtn
		this.$restartBtn = $restartBtn
	}

	setLevel(value) {
		this.setValue(this.$level, value)
	}

	setScore(score, currentLevel) {
		if (score < currentLevel.score) {
			this.setValue(this.$score, score)
			this.showElement(this.$resetBtn)
		} else if (score >= currentLevel.score) {
			this.setValue(this.$score, currentLevel.score)
			this.showElement(this.$nextBtn)
			this.hideElement(this.$resetBtn)
		}
	}

	resetScore(value) {
		this.setValue(this.$score, value)
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

	nextLevel() {
		this.hideElement(this.$nextBtn)
	}
}
export default class Dom {
	setValue($el, value) {
		$el.innerText = value
	}

	resetValue($el) {
		$el.innerText = '0'
	}

	setWidth($el, value) {
		$el.style.width = value * 100 + '%'
	}

	showElement($el) {
		$el.style.display = 'block'
	}

	hideElement($el) {
		$el.style.display = 'none'
	}
}
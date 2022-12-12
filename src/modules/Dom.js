export default class Dom {
	setValue($el, value) {
		this.animateValue($el, $el.innerText, value)
	}

	resetValue($el) {
		this.animateValue($el, $el.innerText, 0)
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

	animateValue(obj, start = 0, end) {
		let startTimestamp = null;
		const duration = (Math.abs(end - start) || 1) * 25
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			obj.innerText = Math.floor(progress * (end - start) + parseFloat(start));
			if (progress < 1) {
				requestAnimationFrame(step);
			}
		};
		requestAnimationFrame(step);
	}
}
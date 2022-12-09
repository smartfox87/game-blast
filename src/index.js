import './assets/style/style.scss';
import Canvas from './modules/Canvas'
import Item from './modules/Item'
import Controller from './modules/Controller'

const ITEM_WIDTH = Math.floor(171 / 4)
const ITEM_HEIGHT = Math.floor(192 / 4)
const COL_COUNT = 9
const ROW_COUNT = 9
const CANVAS_WIDTH = ITEM_WIDTH * COL_COUNT
const CANVAS_HEIGHT = ITEM_HEIGHT * ROW_COUNT
const LEVELS = {
	1: { moves: 40, score: 10, match: 3 },
	2: { moves: 35, score: 20, match: 4 },
}
const ITEMS = [
	{ type: 'blue', src: '/images/items/blue.png' },
	{ type: 'purple', src: '/images/items/purple.png' },
	{ type: 'red', src: '/images/items/red.png' },
	{ type: 'yellow', src: '/images/items/yellow.png' },
	{ type: 'green', src: '/images/items/green.png' },
]

const canvasInstance = new Canvas(document.getElementById('canvas'), CANVAS_WIDTH, CANVAS_HEIGHT, COL_COUNT, ROW_COUNT)
const itemsInstances = ITEMS.map((item) => new Item(item.type, item.src, ITEM_WIDTH, ITEM_HEIGHT))
const controllerInstance = new Controller({
	canvas: canvasInstance,
	items: itemsInstances,
	levels: LEVELS,
	$level: document.getElementById('level'),
	$match: document.getElementById('match'),
	$moves: document.getElementById('moves'),
	$progress: document.getElementById('progress'),
	$score: document.getElementById('score'),
	$nextBtn: document.getElementById('next'),
	$resetBtn: document.getElementById('reset'),
	$restartBtn: document.getElementById('restart'),
})

controllerInstance.init()
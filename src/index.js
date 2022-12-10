import './assets/style/style.scss';
import Canvas from './modules/Canvas'
import Item from './modules/Item'
import Controller from './modules/Controller'
import Interface from './modules/Interface'

const ITEM_WIDTH = Math.floor(171 / 4)
const ITEM_HEIGHT = Math.floor(192 / 4)
const COL_COUNT = 9
const ROW_COUNT = 9
const CANVAS_WIDTH = ITEM_WIDTH * COL_COUNT
const CANVAS_HEIGHT = ITEM_HEIGHT * ROW_COUNT
const LEVELS = {
	1: { moves: 40, score: 10, match: 3, bomb: 3 },
	2: { moves: 35, score: 10, match: 4, bomb: 2 },
}
const ITEMS = [
	{ chance: 1, type: 'blue', src: '/images/items/blue.png' },
	{ chance: 1, type: 'purple', src: '/images/items/purple.png' },
	{ chance: 1, type: 'red', src: '/images/items/red.png' },
	{ chance: 1, type: 'yellow', src: '/images/items/yellow.png' },
	{ chance: 1, type: 'green', src: '/images/items/green.png' },
	{ chance: 0.1, type: 'bomb', src: '/images/items/bomb.png' },
]

const canvasInstance = new Canvas(document.getElementById('canvas'), CANVAS_WIDTH, CANVAS_HEIGHT, COL_COUNT, ROW_COUNT)
const itemsInstances = ITEMS.map((item) => new Item(item.chance, item.type, item.src, ITEM_WIDTH, ITEM_HEIGHT))
const interfaceInstance = new Interface({
	$level: document.getElementById('level'),
	$match: document.getElementById('match'),
	$moves: document.getElementById('moves'),
	$progress: document.getElementById('progress'),
	$score: document.getElementById('score'),
	$nextBtn: document.getElementById('next'),
	$resetBtn: document.getElementById('reset'),
	$restartBtn: document.getElementById('restart'),
	$gameOver: document.getElementById('game-over'),
	$gameWin: document.getElementById('game-win'),
})
const controllerInstance = new Controller({
	canvasInstance: canvasInstance,
	interfaceInstance: interfaceInstance,
	itemsInstances: itemsInstances,
	levels: LEVELS,
})

controllerInstance.init()
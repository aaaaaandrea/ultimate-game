const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth 
canvas.height = innerHeight /1.5

class Player {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }
    draw() {
        c.beginPath()
        c.rect(this.x, this.y, this.width, this.height, 100)
        c.fillStyle =this.color
        c.fill()
    }
}

const x = canvas.width /10
const y = canvas.height /2

const player = new Player(x, y, 100, 100, 'blue')
player.draw()

canvas.style.backgroundColor = 'rgb(191, 192, 207)';
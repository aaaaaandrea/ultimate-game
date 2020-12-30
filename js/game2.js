const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight / 1.5

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
        c.rect(this.x, this.y, this.width, this.height)
        c.fillStyle = this.color
        c.fill()
    }
}

class Barrier {
    constructor(x, y, width, height, color, velocity) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.rect(this.x, this.y, this.width, this.height)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }

}

//player position

const x = canvas.width / 10
const y = canvas.height / 2


const player = new Player(x, y, 100, 100, 'blue')

const barriers = []


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()
    barriers.forEach(barrier => {
        barrier.update()
    })
}

function barrier1() {
    barriers.push(new Barrier(canvas.width / 1.1, canvas.height / 2, 100, 100, 'red', {
        x: -2,
        y: 0
    }))
}



(function loop() {
    var rand = Math.round(Math.random() * (7000 - 3000)) + 3000;
    setTimeout(function () {
        barriers.push(new Barrier(canvas.width / 1.1, canvas.height / 2, 100, 100, 'red', {
            x: -2,
            y: 0
        }))
        loop();
    }, rand);
}());

/*
addEventListener("click", () => {
    const player = new Player(x, y, 100, 100, 'blue')
    player.draw()
})*/
animate()
barrier1()

canvas.style.backgroundColor = 'rgb(191, 192, 207)';
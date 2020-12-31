const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight / 1.5

let player = {
    width: 80,
    height: 80,
    jumping: true,
   // color: 'blue',
    x: canvas.width / 10,
    x_velocity: 0,
    y: canvas.height/2,
    y_velocity: 0,

    /*  draw() {
          c.beginPath()
          c.rect(this.x, this.y, this.width, this.height)
          c.fillStyle = this.color
          c.fill()
      }*/
}

let controll = {
    left: false,
    right: false,
    up: false,
    keyListener: function (event) {
        let key_state = (event.type == 'keydown') ? true : false

        switch (event.keyCode) {
            case 37:
                controll.left = key_state;
                break;
            case 38:
                controll.up = key_state
                break;
            case 39:
                controll.right = key_state
                break;
        }
    }
}

addEventListener('keydown', controll.keyListener)
addEventListener('keyup', controll.keyListener)


function playerMove() {
    if (controll.up && player.jumping == false) {
        player.y_velocity -= 50;
        player.jumping = true;
    }

    if (controll.left) {
        player.x_velocity -= 1 // @@@
    }

    if (controll.right) {
        player.x_velocity += 1 // @@@
    }


    player.y_velocity += 1.5; //fall
    player.x += player.x_velocity;
    player.y += player.y_velocity;
    player.x_velocity *= 0.9 //slow
    player.y_velocity *= 0.9 //slow

    if (player.y > canvas.height/2) { //!!!
        player.jumping = false
        player.y = canvas.height / 2
        player.y_velocity = 0
    }


    //!!!!
    if (player.x < 0) {
        player.x = 0
    } else if (player.x > canvas.width-player.width) {
        player.x = canvas.width-player.width
    }
    ///

    c.beginPath()
    c.rect(player.x, player.y, player.width, player.height)
    c.fillStyle = 'blue'
    c.fill()

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

//const player = new Player(canvas.width / 10, canvas.height / 2, 100, 100, 'blue')

const barriers = []


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    // player.draw()
    playerMove()
    barriers.forEach(barrier => {
        barrier.update()
    })
}

function barrier1() {
    barriers.push(new Barrier(canvas.width / 1.1, canvas.height / 2, 80, 80, 'red', {
        x: -2,
        y: 0
    }))
}



(function loop() {
    var rand = Math.round(Math.random() * (7000 - 3000)) + 3000;
    setTimeout(function () {
        barriers.push(new Barrier(canvas.width / 1.1, canvas.height / 2, 80, 80, 'red', {
            x: -2,
            y: 0
        }))
        loop();
    }, rand);
}());


animate()
barrier1()

canvas.style.backgroundColor = 'rgb(191, 192, 207)';

//(canvas.height / 2) + player.height
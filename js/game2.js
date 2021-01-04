const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight / 1.4

let player1 = {
    width: 80,
    height: 80,
    jumping: true,
    color: 'blue',
    x: canvas.width / 10,
    x_velocity: 0,
    y: canvas.height / 2,
    y_velocity: 0,
}

let player2 = {
    width: 80,
    height: 80,
    jumping: true,
    color: 'green',
    x: (canvas.width / 10) * 9 - 80,
    x_velocity: 0,
    y: canvas.height / 2,
    y_velocity: 0,
}

let control1 = {
    left: false,
    right: false,
    up: false,
    keyListener: function (event) {
        let key_state = (event.type == 'keydown') ? true : false

        switch (event.keyCode) {
            case 65:
                control1.left = key_state;
                break;
            case 87:
                control1.up = key_state
                break;
            case 68:
                control1.right = key_state
                break;
        }
    }
}

let control2 = {
    left: false,
    right: false,
    up: false,
    keyListener: function (event) {
        let key_state = (event.type == 'keydown') ? true : false

        switch (event.keyCode) {
            case 37:
                control2.left = key_state;
                break;
            case 38:
                control2.up = key_state
                break;
            case 39:
                control2.right = key_state
                break;
        }
    }
}

addEventListener('keydown', control1.keyListener)
addEventListener('keydown', control2.keyListener)
addEventListener('keyup', control1.keyListener)
addEventListener('keyup', control2.keyListener)

function playerMove(i, control, max1, max2) {
    if (control.up && i.jumping == false) {
        i.y_velocity -= 50;
        i.jumping = true;
    }

    if (control.left) {
        i.x_velocity -= 1
    }

    if (control.right) {
        i.x_velocity += 1
    }


    i.y_velocity += 3; //fall
    i.x += i.x_velocity;
    i.y += i.y_velocity;
    i.x_velocity *= 0.9 //slow
    i.y_velocity *= 0.9 //slow

    if (i.y > canvas.height / 2) { //!!!
        i.jumping = false
        i.y = canvas.height / 2
        i.y_velocity = 0
    }


    //!!!!
    if (i.x < max1) {
        i.x = max1
    } else if (i.x > max2) {
        i.x = max2
    }
    ///

    c.beginPath()
    c.rect(i.x, i.y, i.width, i.height)
    c.fillStyle = i.color
    c.fill()
    c.strokeStyle = "rgb(255, 255, 255)";
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(canvas.width / 2, 0);
    c.lineTo(canvas.width / 2, canvas.height - 30);
    c.stroke();

}

//BARRIER

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

    collision(player) {

        let position = {
            left: player.x,
            right: player.x + player.width,
            bot: player.y + player.height
        }

        if (position.right < this.x || position.bot < this.y || position.left > this.x + this.width) {
            return false;
        }

        return true;
    }


    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }


}


const barriers = []

let points1 = document.getElementById('points1')
let points2 = document.getElementById('points2')
let lives1 = document.getElementById('lives1')
let lives2 = document.getElementById('lives2')
let count1 = 0,
    count2 = 0,
    live1 = 3,
    live2 = 3


function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgb(39, 39, 39)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    playerMove(player1, control1, 0, canvas.width / 2 - player1.width)
    playerMove(player2, control2, canvas.width / 2, canvas.width - player2.width)
    barriers.forEach((barrier, index) => {
        if (barrier.collision(player1)) {
            // console.log("1")
            switch (live1) {
                case 3:
                    live1 -= 1
                    lives1.innerHTML = '○♥♥'

                    break
                case 2:
                    live1 -= 1
                    lives1.innerHTML = '○○♥'
                    break
                case 1:
                    live1 -= 1
                    lives1.innerHTML ='○○○'
                    break
            }

        }

        if (barrier.collision(player2)) {
            // console.log("2")
            switch (live2) {
                case 3:
                    live2 -= 1
                    lives2.innerHTML = '○♥♥'

                    break
                case 2:
                    live2 -= 1
                    lives2.innerHTML = '○○♥'
                    break
                case 1:
                    live2 -= 1
                    lives2.innerHTML ='○○○'
                    break
            }

        }

        if (player1.x > barrier.x + barrier.width / 3 && player1.x < (barrier.x + barrier.width / 1.9)) {
            count1 += 10
            points1.innerHTML = count1

        }
        if (player2.x > barrier.x + barrier.width / 3 && player2.x < (barrier.x + barrier.width / 1.9)) {
            console.log('lol')
            count2 += 10
            points2.innerHTML = count2
        }


        barrier.update()
        if (barrier.x + barrier.width < 0 || barrier.x - barrier.width > canvas.width) {
            setTimeout(() => {
                barriers.splice(index, 1)

            }, 0)
        }
    })
}

function barrier1() {
    barriers.push(new Barrier(canvas.width, (canvas.height / 2) + (player1.height - 80) + 0.5, 50, 80, 'hsl(0, 50%, 50%)', {
        x: -2,
        y: 0
    }))

    barriers.push(new Barrier(0 - 50, (canvas.height / 2) + (player1.height - 80) + 0.5, 50, 80, 'hsl(0, 50%, 50%)', {
        x: 2,
        y: 0
    }))
}



(function loop() {
    let rand = Math.round(Math.random() * (10000 - 8000)) + 8000;
    let wi1 = Math.round(Math.random() * (60 - 40)) + 40;
    let wi2 = Math.round(Math.random() * (60 - 40)) + 40;
    let he1 = 0,
        he2 = 0
    if (wi1 > 50) {
        he1 = Math.round(Math.random() * (80 - 50)) + 50;
    } else {
        he1 = Math.round(Math.random() * (100 - 50)) + 50;
    }

    if (wi2 > 50) {
        he2 = Math.round(Math.random() * (80 - 50)) + 50;
    } else {
        he2 = Math.round(Math.random() * (100 - 50)) + 50;
    }

    //color
    let saturation1 = Math.round(Math.random() * (70 - 40)) + 40;
    let lightnes1 = Math.round(Math.random() * (60 - 40)) + 40;
    let saturation2 = Math.round(Math.random() * (70 - 40)) + 40;
    let lightnes2 = Math.round(Math.random() * (60 - 40)) + 40;

    setTimeout(function () {
        barriers.push(new Barrier(canvas.width, (canvas.height / 2) + (player1.height - he1) + 0.5, wi1, he1, `hsl(0, ${saturation1}%, ${lightnes1}%)`, {
            x: -2,
            y: 0
        }))
        barriers.push(new Barrier(0 - wi2, (canvas.height / 2) + (player1.height - he2) + 0.5, wi2, he2, `hsl(0, ${saturation2}%, ${lightnes2}%)`, {
            x: 2,
            y: 0
        }))
        console.log(barriers)
        loop();
    }, rand);
}());


animate()
barrier1()
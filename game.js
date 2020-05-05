// Selecting CANVAS

const cvs = document.getElementById('bird');
const ctx = cvs.getContext("2d");


//GAME VARS AND CONSTS
let frames = 0;



//LOAD SPRITE IMAGE









//Image
const img = new Image()
img.src = "img/sprite.png"




//Game State 
const state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2,
}

//Control the game
cvs.addEventListener('click', function(evt) {
    switch (state.current) {
        case state.getReady:
            state.current = state.game;
            break;
        case state.game:
            bird.flap();
            break;
        case state.over:
            state.current = state.getReady;
            break;
    }
})

//Background

const bg = {
    sX: 0,
    sY: 0,
    w: 275,
    h: 226,
    x: 0,
    y: cvs.height - 226,

    draw: function() {
        ctx.drawImage(img, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(img, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
}



//FOREGROUND
const fg = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: cvs.height - 112,

    draw: function() {
        ctx.drawImage(img, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(img, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
}

//Bird
const bird = {
    animation: [
        { sX: 276, sY: 112 },
        { sX: 276, sY: 139 },
        { sX: 276, sY: 164 },
        { sX: 276, sY: 139 },
    ],

    x: 50,
    y: 150,
    w: 34,
    h: 26,

    frame: 0,
    //bird draw function

    gravity: 0.25,
    jump: 4.6,
    speed: 0,

    draw: function() {
        let bird = this.animation[this.frame];
        ctx.drawImage(img, bird.sX, bird.sY, this.w, this.h, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    },

    //bird flap function
    flap: function() {
        this.speed = -this.jump;
    },


    update: function() {
        //If the game state is get ready , the bird flap slowly
        this.period = state.current == state.getReady ? 10 : 5;
        //w eincrement the frame by 1, each period
        this.frame += frames % this.period == 0 ? 1 : 0;
        //Frame goes from 0 To 4, then again to 0
        this.frame = this.frame % this.animation.length;

        if (state.current == state.getReady) {
            this.y = 150; //Reset Position of the bird after game over
        } else {
            this.speed += this.gravity;
            this.y += this.speed;

            //game over when collision with foreground
            if (this.y + this.h / 2 >= cvs.height - fg.h) {
                this.y = cvs.height - fg.h - this.h / 2; // remains in foreground
                this.speed = 0;
                if (state.current == state.game) {
                    state.current = state.over;


                }

            }
        }

    }

}

//Get ready message
const getReady = {
    sX: 0,
    sY: 288,
    w: 173,
    h: 152,
    x: cvs.width / 2 - 173 / 2,
    y: 80,

    draw: function() {
        if (state.current == state.getReady) {
            ctx.drawImage(img, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)

        }
    }
}


//Game Over message
const gameOver = {
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: cvs.width / 2 - 225 / 2,
    y: 90,

    draw: function() {
        if (state.current == state.over) {
            ctx.drawImage(img, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

        }
    }
}


//DRAW
function draw() {

    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.draw();
    fg.draw();
    bird.draw();
    gameOver.draw();
    getReady.draw();
}

//UPDATE
function update() {
    bird.update()
}



//LOOP
function loop() {



    update();
    draw();
    frames++;

    requestAnimationFrame(loop);
}
loop()
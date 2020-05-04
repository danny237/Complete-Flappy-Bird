// Selecting CANVAS

const cvs = document.getElementById('bird');
const ctx = cvs.getContext("2d");


//GAME VARS AND CONSTS
let frames = 0;



//LOAD SPRITE IMAGE









//Image
const img = new Image()
img.src = "img/sprite.png"

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
    ],
}



//DRAW
function draw() {

    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.draw()
    fg.draw()
}

//UPDATE
function update() {

}



//LOOP
function loop() {



    update();
    draw();
    frames++;

    requestAnimationFrame(loop);
}
loop()
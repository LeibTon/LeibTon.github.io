/*Particle Effect in About Me page using Canvas*/
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const canvas_main_box = document.getElementById("about_canvas_box");
var canvas_control = false;
// Resizing
canvas.height = window.innerHeight;
canvas.width = canvas_main_box.clientWidth;
var velocity = 0.4;
var resize = 1.9;
let chkTick = 10;
let particleArray = [];
let mouse = {
    x: undefined,
    y: undefined,
    fixedPosx: undefined,
    fixedPosy: undefined,
    state: false
}

/* Control mouse actions*/
canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

canvas.addEventListener("mousedown", (e) => {
    mouse.fixedPosx = e.clientX
    mouse.fixedPosy = e.clientY
    mouse.state = true
    mouse.x = e.clientX
    mouse.y = e.clientY
})

canvas.addEventListener("mouseup", () => {
    mouse.state = false
})

/*Main function to control particles representing pixels*/
function Draw() {
    let imageWidth = png.width;
    let imageHeight = png.height;
    const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function Particle(x, y, dy, colour) {
        this.x = x + canvas.width - resize * png.width - 50;
        this.y = Math.random() * (canvas.height) + y + canvas.height / 2 - resize * png.height / 2;
        this.basex = x + canvas.width - resize * png.width - 50;
        this.basey = y + canvas.height / 2 - resize * png.height / 2;
        this.dv = dy
        this.dy = dy
        this.dx = dy
        this.velocity = 30
        this.size = 1.6;
        this.colour = colour;
        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x + 1 * Math.random(), this.y + 1 * Math.random(), this.size, Math.PI * 2, false);
            ctx.fillStyle = this.colour;
            ctx.fill();
        }
        this.update = function () {
            if (mouse.state && Math.random() > 0.8) {
                this.x = this.basex + Math.random() * (mouse.x - mouse.fixedPosx + 1);
                this.y = this.basey + Math.random() * (mouse.y - mouse.fixedPosy + 1);
                this.velocity = 12;
            } else {
                this.velocity -= this.dv;
                // this.velocity = Math.max(this.velocity, 1);
                if (Math.abs(this.x - this.basex) > 2.5 || Math.abs(this.y - this.basey) > 2.5) {
                    // Move particle towards its base position
                    this.dx = (this.basex - this.x) / this.velocity;
                    this.dy = (this.basey - this.y) / this.velocity;
                    this.x += this.dx;
                    this.y += this.dy;
                } else {
                    if (chkTick % 10 === 0) {
                        this.x = this.basex + (Math.random() - 0.5) * 3;
                        this.y = this.basey + (Math.random() - 0.5) * 3;
                        chkTick = 0;
                    }
                    chkTick++;
                }

                // if (this.y !== this.basey) {
                //     this.dy = (this.basey - this.y) / this.velocity
                //     this.y += this.dy;
                // }


                // if (Math.abs(this.x - this.basex) > 5) {
                //     this.dx = (this.basex - this.x) / this.velocity
                //     this.x += this.dx;
                // }
                // else{
                //     this.x = this.basex + 5 * Math.random()
                // }

            }

            this.draw();
        }
    }

    /*Initialising the particles*/
    function init() {
        particleArray = [];
        for (let y = 0, y2 = data.height; y < y2; y++) {
            for (let x = 0, x2 = data.width; x < x2; x++) {
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 0) {
                    let positionX = x;
                    let positionY = y;
                    /*Changing pixels colours to match with the background.*/
                    let r = data.data[(y * 4 * data.width) + (x * 4)];
                    let g = data.data[(y * 4 * data.width) + (x * 4) + 1];
                    let b = data.data[(y * 4 * data.width) + (x * 4) + 2];
                    let avg = (r + g + b) / 3;
                    let color = "rgba(" + (avg / 251 * 255) + "," + (avg / 251 * 245) + "," + (avg / 251 * 253) + "," +
                        data.data[(y * 4 * data.width) + (x * 4) + 3] + ")";
                    particleArray.push(new Particle(positionX * resize, positionY * resize, velocity, color));
                } else if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 50) {
                    let positionX = x;
                    let positionY = y;
                    let color = "rgba(" + (2 * 255 + data.data[(y * 4 * data.width) + (x * 4)]) / 3 + "," + (2 * 245 +
                        data.data[(y * 4 * data.width) + (x * 4) + 1]) / 3 + "," + (2 * 253 + data.data[(y * 4 *
                        data.width) + (x * 4) + 2]) / 3 + ",10)";
                    particleArray.push(new Particle(positionX * resize, positionY * resize, velocity, color));
                }
            }
        }
    }

    function animate() {
        if (canvas_control) {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight)
            for (let i = 0; i < particleArray.length; i += 2) {
                particleArray[i].update();
            }
        }
    }
    init();
    if (!canvas_control && window.scrollY < 700) {
        canvas_control = true;
        animate();
    }
    window.addEventListener("resize", () => {
        canvas.height = window.innerHeight;
        canvas.width = canvas_main_box.clientWidth;
        init();
    })
    document.addEventListener("scroll", () => {
        if (canvas_control && window.scrollY > 700) {
            canvas_control = false;
        } else if (!canvas_control && window.scrollY < 700) {
            canvas_control = true;
            animate();
        }
    })
}




// Image
var png = new Image();

png.src = "img/smart1.png"

window.addEventListener("load", () => {
    ctx.drawImage(png, 0, 0);
    Draw();
})
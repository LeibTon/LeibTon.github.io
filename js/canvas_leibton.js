/*Display LEIBTON in Homepage using Canvas*/
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

//Resizing
canvas.height = window.innerHeight - 5;
canvas.width = window.innerWidth - 5;

//Initializing Variables.
var gap = 60
var vGap = 30
var particles;
var collide_limit = 40;
var velocity = 20;
var angular_velocity = 30;
var working_factor = {
    space_typed: false,
    space_needed: false
}

var mouse = {
    timestamp: 0,
    dx: 0,
    dy: 0,
    prevX: 0,
    prevY: 0,
    x: 0,
    y: 0,
    clicked: false
}

//Functions required For Collision Tasks

//Function to find Distance between two points
function distance(point1x, point1y, point2x, point2y) {
    return Math.sqrt((point1x - point2x) * (point1x - point2x) + (point1y - point2y) * (point1y - point2y))
}

//Function to find rotated velocities.
function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

//Function to resolve collision
/*Code used from somewhere else.*/
function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = {
            x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
            y: u1.y
        };
        const v2 = {
            x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
            y: u2.y
        };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

//Function to write Heading.
function writeHeading() {
    ctx.fillStyle = "#424874"
    ctx.font = '30px Raleway';
    ctx.textAlign = "center"
    ctx.fillText("Personal Website of Aditya Prakash", window.innerWidth / 2, window.innerHeight / 2 + vGap)
}

//Function to write instruction to unjumble.
function writeJumble() {
    ctx.fillStyle = "#424874"
    ctx.font = '15px Raleway';
    ctx.textAlign = "center"
    ctx.fillText("Damn it! LeibTon got Jumbled, Press Space to Unjumble", window.innerWidth / 2, window.innerHeight / 2 + vGap + 40)
}


//Particle Class.
function Particle(letter, x, y) {
    this.x = x;
    this.y = y;
    this.velocity = {
        x: 0,
        y: 0
    }
    this.mass = 10;
    this.d2x = 0;
    this.d2y = 0;
    this.basey = y;
    this.basex = x;
    this.drotate = 0;
    this.ddrotate = 0;
    this.rotation = 0;
    this.letter = letter;
    this.draw = function() {
        ctx.font = '100px "Playfair Display"';
        ctx.fillStyle = "#7981AF";
        ctx.textAlign = "center";
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation * Math.PI / 180)
        ctx.fillText(this.letter, 0, 0);
        ctx.rotate(-this.rotation * Math.PI / 180);
        ctx.translate(-this.x, -this.y)
    }

    this.update = function() {
        if (working_factor.space_typed) {
            working_factor.space_needed = false;
            if (this.x - this.basex < 0.1 && this.y - this.basey < 0.1 && this.rotation < 0.1) {
                working_factor.space_typed = false;
            } else {
                this.velocity.x = (this.basex - this.x) / 20;
                this.velocity.y = (this.basey - this.y) / 20;
                this.drotate = -this.rotation / 20;
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.rotation += this.drotate;
            }
        } else {
            if (distance(this.x, this.y, mouse.x, mouse.y) < 50) {
                working_factor.space_needed = true;
                this.velocity.x = (mouse.x - mouse.prevX) / mouse.dt * velocity
                this.velocity.y = (mouse.y - mouse.prevY) / mouse.dt * velocity
                this.drotate = Math.random() * angular_velocity;
            }
            for (let i = 0; i < particles.length; i++) {
                if (this === particles[i]) continue;
                if (distance(this.x, this.y, particles[i].x, particles[i].y) < 120) {
                    resolveCollision(this, particles[i])
                }
            }


            if (this.x - 100 < 0 || this.x + 100 > window.innerWidth) {
                this.velocity.x = -this.velocity.x;
                this.d2x = -this.d2x;
            }
            if (this.y - 100 < 0 || this.y + 100 > window.innerHeight) {
                this.velocity.y = -this.velocity.y;
                this.d2y = -this.d2y;
            }
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.rotation += this.drotate;
            this.ddrotate = (this.drotate - 0) / 20;
            this.drotate -= this.ddrotate;
            this.d2x = (this.velocity.x - 0) / 10
            this.d2y = (this.velocity.y - 0) / 10
            this.velocity.x -= this.d2x;
            this.velocity.y -= this.d2y;
        }
        this.draw();
    }

}

//Init Function.
function init() {
    particles = [new Particle('L', window.innerWidth / 2 - gap * 3 + 2.5, window.innerHeight / 2 - vGap), new Particle('e', window.innerWidth / 2 - gap * 2 + 5, window.innerHeight / 2 - vGap), new Particle('i', window.innerWidth / 2 - gap - 4.5, window.innerHeight / 2 - vGap), new Particle('b', window.innerWidth / 2 - 7.5, window.innerHeight / 2 - vGap), new Particle('T', window.innerWidth / 2 + gap - 2.5, window.innerHeight / 2 - vGap), new Particle('o', window.innerWidth / 2 + 2 * gap + 1, window.innerHeight / 2 - vGap), new Particle('n', window.innerWidth / 2 + 3 * gap + 2, window.innerHeight / 2 - vGap)]

}

//Animate Function
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
    }
    writeHeading();
    if (working_factor.space_needed)
        writeJumble();
}

//Event Listeners
//Click Event Listener
canvas.addEventListener("click", function(e) {

    if (e.clientX - window.innerWidth / 2 > 14.5 && e.clientX - window.innerWidth / 2 < 205.5 && e.clientY - window.innerHeight / 2 - vGap > -25 && e.clientY - window.innerHeight / 2 - vGap < 10) {
        window.open("/about.html", "_self")
    }
})

//Space Event Listener
window.addEventListener("keypress", function(e) {
    if (e.key === " ") {
        e.preventDefault();
        working_factor.space_typed = true;
    }
})

//Mouse movement Event Listener

canvas.addEventListener("mousemove", function(e) {
    var now = Date.now()
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.dt = now - mouse.timestamp;
    mouse.timestamp = now;
    if (e.clientX - window.innerWidth / 2 > 14.5 && e.clientX - window.innerWidth / 2 < 205.5 && e.clientY - window.innerHeight / 2 - vGap > -25 && e.clientY - window.innerHeight / 2 - vGap < 10) {
        canvas.style.cursor = "pointer"
    } else {
        canvas.style.cursor = "auto"
    }
})

//When Loaded.
window.addEventListener("load", () => {
    init();
    animate();
})


//When resized.
window.addEventListener("resize", () => {
    canvas.height = window.innerHeight - 5;
    canvas.width = window.innerWidth - 5;
    init();
})

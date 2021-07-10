// Notes animation in Pratimb (deprecated)
const canvas2 = document.getElementById('canvas');
const ctx2 = canvas2.getContext('2d');
let width, height;
let forces = [],
    particles = [];
let nParticles = 250;
let p = 0;
noise.seed(Math.random());

class V2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
    }

    lerp(vector, n) {
        this.x += (vector.x - this.x) * n;
        this.y += (vector.y - this.y) * n;
    }

}

class Particle {
    constructor(x, y) {
        this.position = new V2(-100, -100);
        this.velocity = new V2();
        this.acceleration = new V2();
        this.alpha = 0;
        this.color = '#000000';
        this.points = [new V2(-10 + Math.random() * 20, -10 + Math.random() * 20), new V2(-10 + Math.random() * 20, -10 + Math.random() * 20), new V2(-10 + Math.random() * 20, -10 + Math.random() * 20)];
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.reset(0, 0);
        this.alpha -= 0.008;
        if (this.alpha < 0) this.alpha = 0;
    }

    follow() {
        var x = Math.floor(this.position.x / 20);
        var y = Math.floor(this.position.y / 20);
        var index = x * Math.floor(height / 20) + y;
        var force = forces[index];
        if (force) this.applyForce(force);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    draw() {
        ctx2.globalAlpha = this.alpha;
        ctx2.beginPath();
        ctx2.moveTo(this.position.x + this.points[0].x, this.position.y + this.points[0].y);
        ctx2.lineTo(this.position.x + this.points[1].x, this.position.y + this.points[1].y);
        ctx2.lineTo(this.position.x + this.points[2].x, this.position.y + this.points[2].y);
        ctx2.closePath();
        ctx2.fillStyle = this.color;
        ctx2.fill();
    }

}

const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas2.width = width;
    canvas2.height = height;
    initForces();
};

const initForces = () => {
    var i = 0;

    for (var x = 0; x < width; x += 20) {
        for (var y = 0; y < height; y += 20) {
            if (!forces[i]) forces[i] = new V2();
            i++;
        }
    }

    if (i < forces.length) {
        forces.splice(i + 1);
    }
};

const updateForces = t => {
    var i = 0;
    var xOff = 0,
        yOff = 0;

    for (var x = 0; x < width; x += 20) {
        xOff += 0.1;

        for (var y = 0; y < height; y += 20) {
            yOff += 0.1;
            let a = noise.perlin3(xOff, yOff, t * 0.00005) * Math.PI * 4;
            if (forces[i]) forces[i].reset(Math.cos(a) * 0.1, Math.sin(a) * 0.1);
            i++;
        }
    }
};

const initParticles = () => {
    for (var i = 0; i < nParticles; i++) {
        particles.push(new Particle(Math.random() * width, Math.random() * height));
        particles[i].velocity.y = 0.1;
    }
};

const drawParticles = () => {
    for (var i = 0; i < nParticles; i++) {
        particles[i].update();
        particles[i].follow();
        particles[i].draw();
    }
};

const launchParticle = () => {
    particles[p].position.reset(emitter.x, emitter.y);
    particles[p].velocity.reset(-1 + Math.random() * 2, -1 + Math.random() * 2);
    particles[p].color = `hsl(${Math.floor(emitter.x / width * 256)},40%,${60 + Math.random() * 20}%)`;
    particles[p].alpha = 1;
    p++;
    if (p === nParticles) p = 0;
};

const updateEmitter = () => {
    emitter.lerp(mouse2, 0.2);
};

const Animate = t => {
    ctx2.clearRect(0, 0, width, height);
    updateEmitter();
    launchParticle();
    launchParticle();
    updateForces(t);
    drawParticles();
    requestAnimationFrame(Animate);
};

const pointerMove = e => {
    mouse2.x = e.touches ? e.touches[0].pageX : e.pageX;
    mouse2.y = e.touches ? e.touches[0].pageY : e.pageY - window.innerHeight;
};

let mouse2 = new V2(window.innerWidth / 2, window.innerHeight / 2);
let emitter = new V2(window.innerWidth / 2, window.innerHeight / 2);
resize();
initParticles();
requestAnimationFrame(Animate);
window.addEventListener('resize', resize);
window.addEventListener('mousemove', pointerMove);
window.addEventListener('touchmove', pointerMove);

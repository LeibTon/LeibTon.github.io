const canvas_main = document.getElementById("main");
const ctx_main = canvas_main.getContext("2d");
const histogram1_ctx = document.getElementById("histogram1").getContext("2d");
const histogram2_ctx = document.getElementById("histogram2").getContext("2d");
const temperature1_ctx = document.getElementById("temperature1").getContext("2d");
let animationPlay = true;
let dataArray = [] // stores time, tempA, tempB, NA, NB into an array
let frameCount = 0;
let barrierRemoved = 0;
canvas_main.height = window.innerHeight;
canvas_main.width = window.innerWidth;
let particles;
let T_A = 0,
	T_B = 0,
	DT = 0.05,
	M_A, M_B, N_A, N_B;
// let mToPixel = 3779.5275590551;
// let dt = DT * mToPixel
let dt = DT;

var startTime = performance.now()
let controlButton = document.getElementById("openBarrier");
var boxABorder = {
	left: 0,
	right: canvas_main.width / 2 - 8,
}

var boxBBorder = {
	left: canvas_main.width / 2 + 8,
	right: canvas_main.width
}



var divisionLine = canvas_main.width / 2;

///// Defining Charts for histogram plot/////

var histPlot1 = new Chart(histogram1_ctx, {
	data: {
		labels: [],
		datasets: [{
			type: 'bar',
			label: 'Box A',
			data: [],
			borderWidth: 1,
			borderColor: "#495464",
			backgroundColor: "#495464"
		}]
	},
	options: {
		animation: false,
		elements: {
			point: {
				radius: 0,
			}
		},
		plugins: {
			legend: {
				display: false
			},
			title: {
				align: "center",
				display: true,
				position: "top",
				text: "Boltzmann Maxwell Velocity Distribution (Box A)",
				color: "#495464"
			}
		},
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					align: "center",
					text: "Frequency of Velocities",
					color: "#495464"
				},
				grid: {
					display: false
				}
			},
			x: {
				title: {
					display: true,
					align: "center",
					text: "Velocity in m/s",
					color: "#495464"
				},
				grid: {
					display: false
				}
			}
		}
	}
});


var histPlot2 = new Chart(histogram2_ctx, {
	data: {
		labels: [],
		datasets: [{
			type: 'bar',
			label: 'Box B',
			data: [],
			borderWidth: 1,
			borderColor: "#495464",
			backgroundColor: "#495464"
		}]
	},
	options: {
		animation: false,
		elements: {
			point: {
				radius: 0,
			}
		},
		plugins: {
			legend: {
				display: false
			},
			title: {
				align: "center",
				display: true,
				position: "top",
				text: "Boltzmann Maxwell Velocity Distribution (Box B)",
				color: "#495464"
			}
		},
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					align: "center",
					text: "Frequency of Velocities",
					color: "#495464"
				},
				grid: {
					display: false
				}
			},
			x: {
				title: {
					display: true,
					align: "center",
					text: "Velocity in m/s",
					color: "#495464"
				},
				grid: {
					display: false
				}
			}
		}
	}
});




var tempPlot1 = new Chart(temperature1_ctx, {
	data: {
		labels: new Array(100).fill(""),
		datasets: [{
				type: "line",
				label: "Box A",
				data: new Array(100).fill(T_A),
				borderWidth: 1,
				backgroundColor: "blue",
				borderColor: "blue"
			},
			{
				type: "line",
				label: "Box B",
				data: new Array(100).fill(T_B),
				borderWidth: 1,
				backgroundColor: "green",
				borderColor: "green"
			}
		]
	},
	options: {
		animation: false,
		maintainAspectRatio: false,
		elements: {
			point: {
				radius: 0,
			},
			line: {
				borderColor: "#495464",
				borderWidth: 1
			}
		},
		plugins: {
			legend: {
				display: true,
				padding: 0
			},
			title: {
				align: "center",
				display: true,
				position: "top",
				text: "Temperature Variation in Both Boxes",
				color: "#495464",
			}
		},
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					align: "center",
					text: "Temperature (in K)",
					color: "#495464"
				},
				grid: {
					display: false
				}
			},
			x: {
				label: {
					display: false
				},
				title: {
					display: true,
					align: "end",
					text: "Current Time: ",
					color: "#495464"
				},
				grid: {
					display: false
				},
			}
		}
	}
})


/////// Charts Ends here /////////////
/////// Formatting, controls and Animations///////
const initButton = document.getElementById("initButton")
const mAInput = document.getElementById("mAInput")
const mBInput = document.getElementById("mBInput")
const TAInput = document.getElementById("TAInput")
const TBInput = document.getElementById("TBInput")
const NAInput = document.getElementById("NAInput")
const NBInput = document.getElementById("NBInput")
const transButton = document.getElementById("transButton")
const printButton = document.getElementById("printButton")
const division_line = document.getElementById("division_line")
const SRButton = document.getElementById("stop_resume_button")
const graphMain = document.getElementById("graphs_main");
const graphCross = document.getElementById("graphs_cross");

initButton.addEventListener("click", function () {
	var m_A = parseInt(mAInput.value);
	var m_B = parseInt(mBInput.value);
	var T_A = parseInt(TAInput.value)
	var T_B = parseInt(TBInput.value)
	var N_A = parseInt(NAInput.value)
	var N_B = parseInt(NBInput.value);
	if (m_A > 0 && m_B > 0 && T_A > 0 && T_B > 0) {
		init(m_A, m_B, T_A, T_B, N_A, N_B);
		animate();
		controlButton.disabled = false;
		SRButton.disabled = false;
	} else {
		alert("Temperature and Mass must be greater than 0.")
	}
})
///// Formatting and animation ends here /////

window.addEventListener("load", () => {
	console.log("Welcome !!")
})

controlButton.addEventListener("click", () => {
	division_line.style.opacity = "0.1";
	barrierRemoved = frameCount * DT;
	for (var i = 0; i < particles.length; i++) {
		particles[i].border_left = 0;
		particles[i].border_right = canvas_main.width;
	}
	controlButton.disabled = true;
	document.getElementById('control_input_main').classList.add('control_input_main_enlarge');
	if (!animationPlay) {
		animationPlay = true;
		animate();
		SRButton.innerHTML = "Stop"
	}

})

SRButton.addEventListener("click", function () {
	if (animationPlay) {
		animationPlay = false;
		SRButton.innerHTML = "Resume"
	} else {
		animationPlay = true;
		animate();
		SRButton.innerHTML = "Stop"
	}
})


transButton.addEventListener("click", function () {
	/*Event listener for transparent and opaque button*/
	if (graphMain.style.background == "transparent") {
		graphMain.style.background = "rgb(187,191,202)";
		graphCross.style.visibility = "visible";
		printButton.style.visibility = "visible";
		transButton.innerHTML = "Transparent"
	} else {
		graphMain.style.background = "transparent";
		graphCross.style.visibility = "collapse";
		printButton.style.visibility = "collapse";
		transButton.innerHTML = "Opaque Background";
	}
})


printButton.addEventListener("click", function () {
	printData();
})
////// Functions are declared below./////////////

//Functions required For Collision Tasks

//Function to find Distance between two points
function printData() {
	var tempArray = dataArray;
	let text = "Initial Conditions: \n"
	let mass = "Mass: M_A = " + M_A + " || M_B = " + M_B + "\n"
	text += mass
	mass = "Temperature: T_A = " + T_A + " || T_B = " + T_B + "\n"
	text += mass
	mass = "Total Particles: N_A = " + N_A + " || N_B = " + N_B + "\n"
	text += mass
	mass = "Time(s)    T_A(K)    T_B(K)    N_A    N_B\n"
	text += mass
	for (var i = 0; i < tempArray.length; i++) {
		mass = tempArray[i][0] + "    " + tempArray[i][1] + "    " + tempArray[i][2] + "    " + tempArray[i][3] + "    " + tempArray[i][4] + "\n"
		text += mass;
	}

	var element = document.createElement('a');
	var filename = "data.txt"
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);

}


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



///////// Function that gives 2D Boltzmann Velocity Distribution/////////
function getDistribution(x, m, T) {
	var R = 8.314
	return m / (R * T) * x * Math.exp(-m * x ** 2 / (2 * R * T))
}


////// Function to calculate sum of all elements of an array ///////
function arraySum(arr) {
	var total = 0;
	for (var i = 0; i < arr.length; i++)
		total += arr[i]
	return total;
}


//////  Function to draw histogram /////////
function drawHistogram(velocities, chart) {
	const n_bins = 100;
	var minimum = Math.min(...velocities);
	var maximum = Math.max(...velocities);
	var db = (maximum - minimum) / n_bins;
	var hist = new Array(n_bins).fill(0);
	for (var i = 0; i < velocities.length; i++) {
		hist[Math.floor((velocities[i] - minimum) / db) - 1] += 1
	}

	var linspace = new Array(n_bins).fill(0)
	linspace = linspace.map((x, i) => {
		if (i % 5 == 0) return Math.floor(minimum + i * db);
		else return "";
	})
	//   var final_result = [{x: 0, y: 0}]
	//   for(var i = 0; i < hist.length; i++)
	// 	{
	// 	  final_result.push({x: linspace[i], y: hist[i]})
	// 	  final_result.push({x: linspace[i]+db, y: hist[i]})
	// 	}
	//   return final_result;
	chart.data.labels = linspace;
	chart.data.datasets[0].data = hist;
	chart.update();
}


/////// Function to get velocities based on Boltzmann Distribution ////////
function get_velocities(m, T, N_total) {
	/*
	T -----> Temperature in Kelvin
	m -----> molar mass of the molecule in grams.
	N -----> Number of particles.
	*/
	var R = 8.314
	var final_list = []
	var start = 0
	var N = N_total
	var m_p = Math.sqrt(R * T / m) // Most probable speed
	var vrms = 2 * R * T / m // RMS velocity
	var dv = m_p * 0.1 // Here 0.1 can be changed to change width of trapezoid.
	while (N > 0) {
		var num_ = Math.floor((getDistribution(start, m, T) + getDistribution(start + dv, m, T)) * N_total * dv / 2)
		if ((num_ == 0 && start > vrms) || num_ > N) {
			break;
		} else {
			if (num_ != 0) {
				final_list.push([num_, start]);
				N -= num_;
			}
			start += dv;
		}
	}
	var velocity = [];
	for (var i = 0; i < final_list.length; i++) {
		var normal_distribution = []
		for (var j = 0; j < final_list[i][0]; j++)
			normal_distribution.push(Math.random() * dv + final_list[i][1])
		velocity = velocity.concat(normal_distribution);
	}
	var velocity_sq = velocity.map(x => x ** 2)
	var sum = arraySum(velocity_sq);
	var remaining = 2 * N_total * R * T / m - sum
	var normal_distribution = []
	for (var j = 0; j < N_total - velocity.length; j++)
		normal_distribution.push(Math.abs(Math.random() * (vrms - m_p) + m_p - 0.5 * vrms))
	var uniform_sum = arraySum(normal_distribution)
	var uniform = normal_distribution.map(x => Math.sqrt(x * remaining / uniform_sum))
	velocity = velocity.concat(uniform)
	return velocity
}


///// Function to get Temperature from RMS distribution /////////////

function getTempRMS(velocities) // velocities contain m and vrms^2
{
	var productMVrms = velocities.map(x => x[0] * x[1])
	var sumRMS = arraySum(productMVrms)
	var R = 8.314
	return sumRMS / (2 * R * productMVrms.length)
}

///// Particle functional component ////////

function Particle(x, y, vx, vy, mass, radius, type, bl, br) {
	this.x = x;
	this.y = y;
	this.velocity = {
		x: vx,
		y: vy
	}
	this.mass = mass;
	this.radius = radius;
	this.type = type;
	this.border_left = bl;
	this.border_right = br;
	this.box = type;
	this.draw = function () {
		ctx_main.beginPath();
		ctx_main.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		if (this.type == "A")
			ctx_main.fillStyle = "blue";
		else
			ctx_main.fillStyle = "green";
		ctx_main.fill();
	}
	this.update = function () {
		for (var i = 0; i < particles.length; i++) {
			if (this === particles[i]) continue;
			if (barrierRemoved === 0) {
				if (this.type == particles[i].type && distance(this.x, this.y, particles[i].x, particles[i].y) < this.radius + particles[i].radius) {
					resolveCollision(this, particles[i]);
				}
			} else {
				if (distance(this.x, this.y, particles[i].x, particles[i].y) < this.radius + particles[i].radius) {
					resolveCollision(this, particles[i]);
				}
			}


			if (this.x - this.radius <= this.border_left || this.x + this.radius >= this.border_right) {
				this.velocity.x = -this.velocity.x;
			}
			if (this.y - this.radius <= 0 || this.y + this.radius >= canvas_main.height) {
				this.velocity.y = -this.velocity.y;
			}
		}
		this.x += (this.velocity.x * dt);
		this.y += (this.velocity.y * dt);
		if (this.x >= divisionLine) {
			this.box = "B"
		} else {
			this.box = "A"
		}
		this.draw();
	}
}

///// __init__ function ///////////


function intitializeParticle(m, T, N_total, type, radius) {
	var velocities = get_velocities(m, T, N_total)
	if (type == "A") {
		var br = boxABorder.right;
		var bl = boxABorder.left;
	} else {
		var br = boxBBorder.right;
		var bl = boxBBorder.left;
	}
	for (var i = 0; i < velocities.length; i++) {
		let x = Math.random() * (br - 2 * radius - bl) + radius + bl;
		let y = Math.random() * (canvas_main.height - 2 * radius) + radius;
		if (i !== 0) {
			for (var j = 0; j < particles.length; j++) {
				if (distance(x, y, particles[j].x, particles[j].y) < radius + particles[j] + radius) {
					x = Math.random() * (canvas_main.width - 2 * radius - bl) + radius + bl;
					y = Math.random() * (canvas_main.height - 2 * radius) + radius;
					j = -1;
				}
			}
		}
		var angle = Math.random() * 2 * Math.PI
		var v = velocities[i]
		// var v = 5
		particles.push(new Particle(x, y, v * Math.sin(angle), v * Math.cos(angle), m, radius, type, bl, br));
	}
}


function init(mA, mB, TA, TB, N_totalA, N_totalB) {
	M_A = mA;
	M_B = mB;
	T_A = TA;
	T_B = TB;
	N_A = N_totalA;
	N_B = N_totalB;
	division_line.style.opacity = "1";
	frameCount = 0;
	dataArray = [];
	barrierRemoved = 0;
	particles = [];
	if (mA > mB) {
		var radiusA = 5;
		var radiusB = 4;
	} else if (mA == mB) {
		var radiusA = 5;
		var radiusB = 5;
	} else {
		var radiusA = 4;
		var radiusB = 5;
	}
	let mpA = Math.sqrt(8.314 * TA / mA);
	let mpB = Math.sqrt(8.314 * TB / mB);
	intitializeParticle(mA, TA, N_totalA, "A", radiusA);
	intitializeParticle(mB, TB, N_totalB, "B", radiusB);
}



////////    ___animate function /////////////////
function animate() {
	if (animationPlay)
		requestAnimationFrame(animate)
	frameCount += 1
	ctx_main.clearRect(0, 0, canvas_main.width, canvas_main.height)
	for (var i = 0; i < particles.length; i++) {
		particles[i].update();
	}
	if (frameCount % 2 === 0) {
		var particlesA = particles.filter(x => x.box == "A")
		var particlesB = particles.filter(x => x.box == "B")
		var velocitiesA = particlesA.map(x =>
			Math.sqrt(x.velocity.x ** 2 + x.velocity.y ** 2))
		var velocitiesB = particlesB.map(x =>
			Math.sqrt(x.velocity.x ** 2 + x.velocity.y ** 2))
		drawHistogram(velocitiesA, histPlot1);
		drawHistogram(velocitiesB, histPlot2);
		var vel_MA = particlesA.map(x => [x.mass, x.velocity.x ** 2 + x.velocity.y ** 2])
		var vel_MB = particlesB.map(x => [x.mass, x.velocity.x ** 2 + x.velocity.y ** 2])
		var rmstempA = getTempRMS(vel_MA);
		var rmstempB = getTempRMS(vel_MB);
		tempPlot1.options.scales.x.title.text = "Current Time: " + (frameCount * DT).toFixed(4) + " s";
		tempPlot1.data.datasets[0].data.push(rmstempA)
		tempPlot1.data.datasets[0].data.shift()
		tempPlot1.data.datasets[1].data.push(rmstempB)
		tempPlot1.data.datasets[1].data.shift()
		tempPlot1.update();
		dataArray.push([(frameCount * DT).toFixed(4), rmstempA, rmstempB, particlesA.length, particlesB.length]);
	}
}
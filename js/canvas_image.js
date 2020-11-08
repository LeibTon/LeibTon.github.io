const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

//Resizing
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var velocity = 0.5;
let particleArray = [];
let mouse = {
x: undefined,
y: undefined,
fixedPosx: undefined,
fixedPosy: undefined,
state: false
}

canvas.addEventListener("mousemove",(e)=>{
mouse.x = e.x;
mouse.y = e.y;
})

canvas.addEventListener("mousedown",(e)=>{
mouse.fixedPosx = e.clientX
mouse.fixedPosy = e.clientY
mouse.state = true
mouse.x = e.clientX
mouse.y = e.clientY
})

canvas.addEventListener("mouseup",()=>{
mouse.state = false
})

function Draw(){
let imageWidth = png.width;
let imageHeight = png.height;
const data = ctx.getImageData(0,0,imageWidth,imageHeight);
ctx.clearRect(0,0,canvas.width,canvas.height);

function Particle(x,y,dy,colour)
{
this.x = x+canvas.width-2*png.width-50;
this.y = Math.random() * (canvas.height) + y+canvas.height/2 -png.height;
this.basex = x+canvas.width-2*png.width-50;
this.basey = y+canvas.height/2-png.height;
this.dv = dy
this.dy = dy
this.dx = dy
this.velocity = 10
this.size = 1.1;
this.colour = colour;
this.draw = function() {
ctx.beginPath();
ctx.arc(this.x,this.y,this.size,Math.PI*2,false);
ctx.fillStyle = this.colour;
ctx.fill();
}
this.update = function() {
if(mouse.state && Math.random()>0.8)
{
this.x = this.basex+Math.random()*(mouse.x-mouse.fixedPosx+1);
this.y = this.basey+Math.random()*(mouse.y-mouse.fixedPosy+1);
this.velocity = 10;
}
else{
this.velocity-=this.dv

if(this.y!==this.basey)
{
this.dy =(this.basey-this.y)/this.velocity
this.y+=this.dy;
}
if(this.x!==this.basex)
{
this.dx =(this.basex-this.x)/this.velocity
this.x+=this.dx;
}

}

this.draw();
}
}
var resize = 2
function init(){
particleArray = [];
for(let y=0,y2=data.height;y<y2;y++){
for(let x=0,x2 = data.width;x<x2;x++){
if(data.data[(y*4*data.width)+(x*4)+3]>0){
let positionX = x;
let positionY = y;
let color = "rgba("+data.data[(y*4*data.width)+(x*4)]+","+data.data[(y*4*data.width)+(x*4)+1]+"," + data.data[(y*4*data.width)+(x*4)+2]+","+data.data[(y*4*data.width)+(x*4)+3]+")";
particleArray.push(new Particle(positionX*resize,positionY*resize,velocity,color));
}
else if(data.data[(y*4*data.width)+(x*4)+3]>50)
{
let positionX = x;
let positionY = y;
let color = "rgba("+(2*255+data.data[(y*4*data.width)+(x*4)])/3+","+(2*138+data.data[(y*4*data.width)+(x*4)+1])/3+"," + (2*128+data.data[(y*4*data.width)+(x*4)+2])/3+",10)";
particleArray.push(new Particle(positionX*resize,positionY*resize,velocity,color));
}
}  
}
}

  function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth,innerHeight)
  for(let i =0;i<particleArray.length;i++){
  particleArray[i].update();
}
}
init();
animate();
window.addEventListener("resize", ()=>{
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  init();
})

}




// Image
var png = new Image();

png.src = "img/smart.png"

window.addEventListener("load",()=>{
 ctx.drawImage(png,0,0);
 Draw();
})



var points = [];
var radius = 3;
var point_xy = [];
var mouse = {
x: undefined,
y: undefined
}
var numPoints = 175;


  const canvas = document.getElementById("line");
  const ctx = canvas.getContext("2d");

  //Resizing
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

canvas.addEventListener("mousemove",(e)=>{
mouse.x = e.x;
mouse.y = e.y;
})


/**/
function init(){
points = []
for(var i =0;i<numPoints;i++)
{
var x = Math.random()*window.innerWidth;
var y = Math.random()*window.innerHeight;
point_xy.push([x,y]);
points.push(new point(x,y,(Math.random()-0.5),(Math.random()-0.5)))
}

}

function point(x,y,dx,dy)
{
this.x = x;
this.y = y;
this.dx = dx;
this.dy = dy;
this.draw = function (){
ctx.beginPath();
ctx.arc(this.x,this.y,radius,Math.PI*2,false);
ctx.fillStyle = "rgba(57, 72, 103, 1)";
ctx.fill();


for(var i=0;i<point_xy.length;i++)
{
if(Math.sqrt((point_xy[i][0]-this.x)*(point_xy[i][0]-this.x)+(point_xy[i][1]-this.y)*(point_xy[i][1]-this.y))<100)
{
if(Math.sqrt((mouse.x-this.x)*(mouse.x-this.x)+(mouse.y-this.y)*(mouse.y-this.y))<50 || (i<20 && i>10))
{
ctx.beginPath();
ctx.moveTo(this.x,this.y)
ctx.strokeStyle = "rgba(155, 164, 180, 1)"
ctx.lineTo(point_xy[i][0],point_xy[i][1])
ctx.stroke()
}
else
{
ctx.beginPath();
ctx.moveTo(this.x,this.y)
ctx.strokeStyle = "rgba(57, 72, 103, 1)"
ctx.lineTo(point_xy[i][0],point_xy[i][1])
ctx.stroke()
}}
}

}

this.update = function(){
this.x+=this.dx;
this.y+=this.dy;
this.draw();
if(this.x-radius<0 || this.x+radius>window.innerWidth)
{
this.dx = -this.dx;
}
if(this.y-radius<0 ||this.y+radius>window.innerHeight)
{
this.dy = -this.dy;
}
}
}
  function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
  for(var i=0;i<points.length;i++)
  points[i].update();
}


/**/

window.addEventListener("load",()=>{
init();
animate();
})

window.addEventListener("resize", ()=>{
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  init();
})

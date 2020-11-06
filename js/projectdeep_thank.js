const flightPath={
  curviness: 1.25,
  autoRotate: true,
  values: [
    {
      x: 50,
      y: -50
    },
    {
      x: 200,
      y: -200
    },
    {
      x: 300,
      y: 0
    },
    {
      x: 100,
      y: 200
    },
    {
      x:-300,
      y:-10
    },
    {
      x: -window.innerWidth-60,
      y: -300
    }
  ]
}

const tween = new TimelineLite({paused: true,onComplete: function(){open("/contact.html","_self")}});

tween.add(
TweenLite.to("#get_in_touch",0.5,{
opacity: 0
})
)
tween.add(
  TweenLite.to('.contact_me img',0.5,{
    width: '50px'
  })
)
tween.add(
  TweenLite.to('.contact_me img',4.5,{
    bezier: flightPath,
    ease: Power1.easeInOut
  })
)

var button_contact_me = document.querySelector(".contact_me span");
button_contact_me.addEventListener("click",function(){
  console.log("CLicked")
  tween.play();
})

var text = document.querySelectorAll(".thanks span")
var niceText = document.querySelectorAll(".nice span")
var niceIndex = 0;
var textTop = 50;
var opacity = 0;
var tFactor = 1;
var flag = 0;
var fontSize = 0;
var maxFontSize = 5
var niceSpeed = maxFontSize*tFactor*5/textTop;
var oFactor = tFactor/textTop;
document.querySelector(".thank_message").addEventListener("wheel",function(e){
  if(e.deltaY> 0)
  {
    if(textTop>0)
    {
      textTop-=tFactor;
      opacity+=oFactor
      for(var i=0;i<text.length;i++){
      text[i].style.top = textTop+"px";
      text[i].style.opacity = opacity;}
    }
    else if(textTop<0){
      textTop = 0;
      opacity = 1;
      niceSpeed+=2;
      for(var i=0;i<text.length;i++){
      text[i].style.top = 0;
      text[i].style.opacity = 1;}
    }
  }
  else {
      if(textTop<50)
    {
      e.preventDefault();
      textTop+=tFactor;
      opacity-=oFactor;
      for(var i=0;i<text.length;i++){
      text[i].style.top = textTop+"px";
      text[i].style.opacity = opacity;}
    }
    else if(textTop>50){
      textTop = 50;
      opacity =0;
      for(var i=0;i<text.length;i++){
      text[i].style.top = "50px";
      text[i].style.opacity = 0;}
    }
  }
})

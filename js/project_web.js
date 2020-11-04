window.onload = function() {
const web_project_names = ["LeibTon","Being IITian","Project Ekatra","Randomness"]
const web_project_link = ["https://prakashaditya369.github.io","https://beingiitian.herokuapp.com","https://projectekatra.github.io","https://prakashaditya369.github.io/randomness/"]
var imageIndex = 0;
var velocity = 10;
var height= -500;
var projectTitleHeight = 90;
var body = document.querySelector("body");
var indexShow = document.querySelector("#index_area");
var projectTitleShow = document.querySelector(".project_titlexyz");
var images = document.getElementsByClassName('s1');
var navButtons = document.getElementsByClassName('nav-closed');
var ClickButtons = document.getElementsByClassName('click_check');
console.log(ClickButtons)
var forOpacity = document.getElementsByClassName('for-opacity');
var nameProjects = document.getElementsByClassName('name_project');
var navOpen = document.getElementsByClassName('nav-open');
var isMouseOverImage = false;
var webImages = document.getElementById('webimages');
indexShow.innerHTML = (imageIndex+1)+"/"+images.length;
projectTitleShow.innerHTML = web_project_names[imageIndex]
projectTitleShow.href = web_project_link[imageIndex]
var translate;
var prevTranslate = 0;
webImages.addEventListener('scroll', function(e) {
  e.stopPropagation();
}, false);

//ProjectTitle ANimation

function projectTitleAnimation(duration){
anime({
targets: projectTitleShow,
right: "70%",
duration: duration,
easing: 'linear',
complete: function(){
projectTitleShow.style.top = projectTitleHeight+"px";
projectTitleShow.innerHTML = web_project_names[imageIndex]
projectTitleShow.href = web_project_link[imageIndex]
anime({
targets: projectTitleShow,
right: "95.7%",
duration: duration,
easing: 'linear'
})
}
})
}

//Animation part for work.
var tls = [];
for(var i=0;i<images.length;i++)
{
tls.push(new TimelineLite({paused: true}));
tls[i].to(navButtons[i],1,{
width: "100%",
ease: Power2.easeOut
})
.to(nameProjects[i],0.5,{
opacity: 1,
ease: Power2.easeOut
},"-=0.5")
.to(navButtons[i],0.1,{
borderTopLeftRadius: "15px",
borderTopRightRadius: "15px",
borderBottomLeftRadius: "0",
borderBottomRightRadius: "0",
ease: Power2.easeOut
})
.to(navOpen[i],0.1,{
height: 'calc(100% - 60px)',
ease: Power2.easeOut
})
.fromTo(forOpacity[i],0.5,{
opacity:0,
x:50,
ease: Power2.easeOut
},{
opacity: 1,
x:0
})
}


function toggleTween(tween)
{
tween.reversed() ? tween.play(): tween.reverse();
}


webImages.addEventListener('wheel', function(e) {
if(e.wheelDelta < 0) {
  if((this.scrollHeight-this.scrollTop-200)<=0){
    e.preventDefault();
  }
     }
    else
    if(this.scrollTop==0){
       e.preventDefault();
    }

      if((imageIndex>0 && imageIndex<images.length-1) || (imageIndex===images.length-1 && e.deltaY<0) || (imageIndex===0 && prevTranslate<=0))
      {
      prevTranslate-=(velocity*e.deltaY)
      if(prevTranslate<height && imageIndex<images.length-1)
      {
        prevTranslate = height-20
        translate = "translateY("+prevTranslate+"px)";
         !tls[imageIndex].reversed() ? tls[imageIndex].reverse(): null;
        images[imageIndex].style.transform = translate;
        projectTitleHeight+=90;
projectTitleAnimation(400);
        imageIndex+=1;
        indexShow.innerHTML = (imageIndex+1)+"/"+images.length;
        
        prevTranslate = 0;

      }
      else if(prevTranslate>0  && imageIndex>0)
      {
        prevTranslate = 0;
        translate = "translateY("+prevTranslate+"px)";
        !tls[imageIndex].reversed() ? tls[imageIndex].reverse(): null;
        images[imageIndex].style.transform = translate;
        imageIndex-=1;
        projectTitleHeight-=90;
        projectTitleAnimation(800);
        indexShow.innerHTML = (imageIndex+1)+"/"+images.length;

        prevTranslate = height-10;
      }
      else if(imageIndex===0 && prevTranslate>0)
      {
        prevTranslate=0;
      }
      else{
      translate = "translateY("+prevTranslate+"px)";
      images[imageIndex].style.transform = translate;}
    }
}, false);

webImages.addEventListener('click',function(e){
console.log(e)
if(e.explicitOriginalTarget.className==="click_check"){
toggleTween(tls[imageIndex])
}
else{
  if(imageIndex<images.length-1){
!tls[imageIndex].reversed() ? tls[imageIndex].reverse(): null;
//Animation Part
anime({
  targets: images[imageIndex],
  translateY: height-10,
  duration: 200,
  easing: 'linear'
});

projectTitleHeight+=90;
//Animation Part ends.
  imageIndex+=1;
  indexShow.innerHTML = (imageIndex+1)+"/"+images.length;
projectTitleAnimation(600);
}
}
})

webImages.addEventListener("mouseleave",function(e){
 anime({
  targets: images[imageIndex],
  translateY: 0,
  duration: 1000,
  easing: 'linear'
});
})

webImages.addEventListener('touchmove', function(e) {
  e.stopPropagation();
}, false);
}


const tw1 = new TimelineLite({paused: true,onComplete: function(){document.querySelector(".about_nav .links").style.pointerEvents = "auto"; }});
var toggle = 0;
tw1.add(
TweenLite.to(".about_nav_button .top",0.3,{
top: "20px",
ease: Power1.easeInOut
})
);
tw1.add(
TweenLite.to(".about_nav_button .bottom",0.3,{
top: "20px",
ease: Power1.easeInOut
}),"-=0.6"
);

tw1.add(
TweenLite.to(".about_nav_button .middle",0.1,{
height: 0,
ease: Power1.easeInOut
})
);

tw1.add(
TweenLite.to(".about_nav_button .bottom",0.6,{
rotation: 45,
ease: Power1.easeInOut
})
);

tw1.add(
TweenLite.to(".about_nav_button .top",0.6,{
rotation: "-45",
ease: Power1.easeInOut
}),"-=0.6"
);
tw1.add(
TweenLite.to(".about_nav",2.5,{
width: "330px",
ease: Power1.easeInOut
}),"-=1.9"
)
tw1.add(
TweenLite.to(".about_nav_button",2.5,{
rotation: 360,
ease: Power1.easeInOut
}),"-=2.5"
)
tw1.add(
TweenLite.to(".about_nav .links",1,{
opacity: 1,
ease: Power1.easeInOut
}),"-=1"
)

document.querySelector(".about_nav_button").addEventListener("click",function() {
if(toggle===0)
{
tw1.play();
toggle =1;
}
else{
tw1.reverse();
toggle = 0;
}
})

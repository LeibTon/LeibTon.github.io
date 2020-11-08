
const tl  = new TimelineLite();
 const blendimage = document.querySelector(".image_blend_main");
 tl.fromTo(blendimage, 1.5,{scale: 0},{scale: 1})
 .fromTo(".image_blend_2",2,{opacity: 0},{opacity:1},"-=0.5")

const controller4 =  new ScrollMagic.Controller();
const scene4 =  new ScrollMagic.Scene(
{
triggerElement: ".section2"
})
.setTween(tl)
.addTo(controller4);

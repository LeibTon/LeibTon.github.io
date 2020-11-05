const tween_loader = new TimelineLite({paused: true,onComplete: function(){document.querySelector(".preloader_preloader_main").remove()
document.querySelector("body").style.overflow="auto";
}});

tween_loader.add(
TweenLite.to(".preloader_bounceball",1,{
top: "-80vh",
ease: Power1.easeInOut
})
)
tween_loader.add(
TweenLite.to(".preloader_text",2,{
transform: "scale(10)",
ease: Power1.easeInOut
})
)

tween_loader.add(
TweenLite.to(".preloader_preloader",1.5,{
opacity: 1,
ease: Power1.easeInOut
}),"-=1.5"
)
tween_loader.add(
TweenLite.to(".preloader_wrap",0.1,{
opacity: 0,
ease: Power1.easeInOut
})
)


tween_loader.add(
TweenLite.to(".preloader_preloader",3,{
width: 0,
ease: Power1.easeInOut
})
)


window.addEventListener("load",()=>{
if ( ! sessionStorage.getItem( 'doNotShow' ) ) {
            sessionStorage.setItem( 'doNotShow', true );
tween_loader.play();
}
else
{
document.querySelector(".preloader_preloader_main").remove()
document.querySelector("body").style.overflow="auto";
}
})

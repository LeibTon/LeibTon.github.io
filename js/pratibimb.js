// Glitch animation in pratibimb (Deprecated)
var para1 = document.getElementById("1")
var para2 = document.getElementById("2")
var para3 = document.getElementById("3")
var para4 = document.getElementById("4")
var txt1 = "Hi There!"
var txt2 = "Wanna know what's going on in Aditya's Mind."
var txt3 = "Yeah Me Too."
var txt4 = "So I have hacked some of the thoughts from Aditya's Mind. Let's explore them together."

var glitch_anim = ["rect(85px, 550px, 140px, 0)", "rect(149px, 9999px, 143px, 0)", "rect(0px, 9999px, 93px, 0)", "rect(82px, 9999px, 124px, 0)", "rect(85px, 9999px, 98px, 0)", "rect(126px, 9999px, 23px, 0)", "rect(24px, 9999px, 111px, 0)", "rect(120px, 9999px, 146px, 0)", "rect(44px, 9999px, 56px, 0)", "rect(138px, 9999px, 55px, 0)", "rect(88px, 9999px, 32px, 0)", "rect(104px, 9999px, 125px, 0)", "rect(73px, 9999px, 27px, 0)", "rect(43px, 9999px, 132px, 0)", "rect(137px, 9999px, 116px, 0)", "rect(71px, 9999px, 16px, 0)", "rect(77px, 9999px, 71px, 0)", "rect(103px, 9999px, 111px, 0)", "rect(1px, 9999px, 138px, 0)", "rect(51px, 9999px, 104px, 0)", "rect(112px, 9999px, 67px, 0)", "rect(73px, 9999px, 84px, 0)", "rect(19px, 9999px, 11px, 0)", "rect(66px, 9999px, 145px, 0)", "none"]

var glitch_anim_2 = ["rect(24px, 550px, 90px, 0)", "rect(102px, 9999px, 9px, 0)", "rect(12px, 9999px, 50px, 0)", "rect(126px, 9999px, 34px, 0)", "rect(55px, 9999px, 35px, 0)", "rect(103px, 9999px, 46px, 0)", "rect(14px, 9999px, 6px, 0)", "rect(20px, 9999px, 41px, 0)", "rect(6px, 9999px, 50px, 0)", "rect(134px, 9999px, 105px, 0)", "rect(113px, 9999px, 70px, 0)", "rect(49px, 9999px, 136px, 0)", "rect(85px, 9999px, 118px, 0)", "rect(76px, 9999px, 42px, 0)", "rect(38px, 9999px, 6px, 0)", "rect(62px, 9999px, 142px, 0)", "rect(3px, 9999px, 128px, 0)", "rect(142px, 9999px, 123px, 0)", "rect(45px, 9999px, 48px, 0)", "rect(90px, 9999px, 112px, 0)", "rect(92px, 9999px, 26px, 0)", "rect(10px, 9999px, 65px, 0)", "rect(50px, 9999px, 143px, 0)", "rect(135px, 9999px, 146px, 0)", "rect(1px, 9999px, 62px, 0)", "rect(142px, 9999px, 88px, 0)", "rect(107px, 9999px, 123px, 0)", "rect(92px, 9999px, 100px, 0)", "rect(83px, 9999px, 87px, 0)", "none"]


var typewrite_time = 0.08
var time_anim_1 = 2.5 / glitch_anim.length
var time_anim_2 = 2.5 / glitch_anim_2.length
/*Type writer effect*/
const tw2 = new TimelineLite({
    paused: true
});
tw2.add(
    TweenLite.to(para1, typewrite_time, {
        innerHTML: "_",
        ease: Power1.easeInOut
    }));

for (var i = 1; i < txt1.length; i++) {
    tw2.add(
        TweenLite.to(para1, typewrite_time, {
            innerHTML: txt1.substr(0, i) + "_",
            ease: Power1.easeInOut
        }));
}

tw2.add(
    TweenLite.to(para1, typewrite_time, {
        innerHTML: txt1,
        ease: Power1.easeInOut
    }));

tw2.add(
    TweenLite.to(para2, typewrite_time, {
        innerHTML: "_",
        ease: Power1.easeInOut
    }));

for (var i = 1; i < txt2.length; i++) {
    tw2.add(
        TweenLite.to(para2, typewrite_time, {
            innerHTML: txt2.substr(0, i) + "_",
            ease: Power1.easeInOut
        }));
}

tw2.add(
    TweenLite.to(para2, typewrite_time, {
        innerHTML: txt2,
        ease: Power1.easeInOut
    }));

tw2.add(
    TweenLite.to(para3, typewrite_time, {
        innerHTML: "_",
        ease: Power1.easeInOut
    }));

for (var i = 1; i < txt3.length; i++) {
    tw2.add(
        TweenLite.to(para3, typewrite_time, {
            innerHTML: txt3.substr(0, i) + "_",
            ease: Power1.easeInOut
        }));
}

tw2.add(
    TweenLite.to(para3, typewrite_time, {
        innerHTML: txt3,
        ease: Power1.easeInOut
    }));


tw2.add(
    TweenLite.to(para4, typewrite_time, {
        innerHTML: "_",
        ease: Power1.easeInOut
    }));

for (var i = 1; i < txt4.length; i++) {
    tw2.add(
        TweenLite.to(para4, typewrite_time, {
            innerHTML: txt4.substr(0, i) + "_",
            ease: Power1.easeInOut
        }));
}

tw2.add(
    TweenLite.to(para4, typewrite_time, {
        innerHTML: txt4,
        ease: Power1.easeInOut
    }));

/*type writer effect ends here*/
tw2.add(
    TweenLite.to(".glitch-wrapper", 1, {
        opacity: 1
    }));


for (var i = 0; i < glitch_anim.length; i++) {
    tw2.add(
        TweenLite.to(".glitch-after", time_anim_1, {
            clip: glitch_anim[i],
            ease: Power1.easeInOut
        }));
}

for (var i = 0; i < glitch_anim_2.length; i++) {
    tw2.add(
        TweenLite.to(".glitch-before", time_anim_2, {
            clip: glitch_anim_2[i],
            ease: Power1.easeInOut
        }));
}

window.addEventListener("load", () => {
    tw2.play();
})

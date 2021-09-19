// Scroll Effect in Homepage
const tw1 = new TimelineLite();
const quote1 = '"And still, there is so much to learn...'
const quote2 = 'Live Your life learning and enjoying every moment."'
tw1.add(
    TweenLite.to(".about_me h1", 0.6, {
        transform: "rotate(-20deg)",
        opacity: 1,
        ease: Power1.easeInOut
    })
);

tw1.add(
    TweenLite.to(".about_me h1", 0.4, {
        transform: "rotate(20deg)",
        ease: Power1.easeInOut
    }));
tw1.add(
    TweenLite.to(".about_me h1", 0.3, {
        transform: "rotate(-10deg)",
        ease: Power1.easeInOut
    }));
tw1.add(
    TweenLite.to(".about_me h1", 0.3, {
        transform: "rotate(10deg)",
        ease: Power1.easeInOut
    }));
tw1.add(
    TweenLite.to(".about_me h1", 0.1, {
        transform: "rotate(0deg)",
        ease: Power1.easeInOut
    }));
tw1.add(
    TweenLite.to(".about_me p", 0.6, {
        opacity: 1,
        ease: Power1.easeInOut
    }));
tw1.add(
    TweenLite.to("#about_me_instruction", 0.7, {
        transform: "translateX(0)",
        opacity: 1,
        ease: Power1.easeInOut
    }));
for (var i = 1; i <= quote1.length; i++) {
    tw1.add(
        TweenLite.to(".about_me_quote", 0.05, {
            innerHTML: quote1.substr(0, i),
            ease: Power1.easeInOut
        }));
}

for (var i = 1; i <= quote2.length; i++) {
    tw1.add(
        TweenLite.to(".about_me_quote", 0.05, {
            innerHTML: quote1 + "<br />" + quote2.substr(0, i),
            ease: Power1.easeInOut
        }));
}
const controller1 = new ScrollMagic.Controller();
const scene1 = new ScrollMagic.Scene({
        triggerElement: "#about_me"
    })
    .setTween(tw1)
    .addTo(controller1);

/*Projects Section*/
const tw2 = new TimelineLite();

tw2.add(
    TweenLite.to(".main_section_headingabc", 0.6, {
        transform: "rotate(-20deg)",
        opacity: 1,
        ease: Power1.easeInOut
    })
);

tw2.add(
    TweenLite.to(".main_section_headingabc", 0.4, {
        transform: "rotate(20deg)",
        ease: Power1.easeInOut
    }));
tw2.add(
    TweenLite.to(".main_section_headingabc", 0.3, {
        transform: "rotate(-10deg)",
        ease: Power1.easeInOut
    }));
tw2.add(
    TweenLite.to(".main_section_headingabc", 0.3, {
        transform: "rotate(10deg)",
        ease: Power1.easeInOut
    }));
tw2.add(
    TweenLite.to(".main_section_headingabc", 0.2, {
        transform: "rotate(0deg)",
        ease: Power1.easeInOut
    }));

const controller2 = new ScrollMagic.Controller();
const scene2 = new ScrollMagic.Scene({
        triggerElement: "#projects"
    })
    .setTween(tw2)
    .addTo(controller2);

const tw3 = new TimelineLite();

tw3.add(
    TweenLite.to("#deep-learning .sub_section_headingxyz", 0.8, {
        transform: "translateX(0)",
        ease: Power1.easeInOut
    }));
tw3.add(
    TweenLite.to("#deep-learning .section_parapqr", 0.7, {
        opacity: 1,
        ease: Power1.easeInOut
    }), "-=0.5");

const deep_learning_single_project = document.querySelectorAll(".deep_learning_single_project")
const additional_photo = document.querySelectorAll(".additional_photo")
for (var i = 0; i < deep_learning_single_project.length; i++) {
    tw3.add(
        TweenLite.to(deep_learning_single_project[i], 0.5, {
            transform: "translateY(-10px)",
            opacity: 1,
            ease: Power0.easeNone
        }));
    tw3.add(
        TweenLite.to(deep_learning_single_project[i], 0.5, {
            transform: "translateY(0px)",
            ease: Power0.easeNone
        }));
    tw3.add(
        TweenLite.to(additional_photo[i], 0.1, {
            opacity: 1,
            transform: "scale(1)",
            ease: Power1.easeInOut
        }), "-=0.5");
}


const controller3 = new ScrollMagic.Controller();
const scene3 = new ScrollMagic.Scene({
        triggerElement: "#deep-learning"
    })
    .setTween(tw3)
    .addTo(controller3);


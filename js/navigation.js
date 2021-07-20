// Navigation Menu
var menuButton = document.querySelector(".menu_part")
var itemsID = ["#menu_item_home", "#menu_item_about", "#menu_item_night_mode", "menu_item_contact_me"]
var translateXValues = ["-270%", "-250%", "-150%", "-100%"]
var translateYValues = ["-40%", "80%", "6%", "120%"]
var animationToggle = 0;
var animation = anime.timeline({
    autoplay: false
})
animation.add({
    targets: ".menu_item",
    width: "100px",
    height: "100px",
    translateX: function(el, i) {
        return translateXValues[i]
    },
    translateY: function(el, i) {
        return translateYValues[i]
    },
    duration: 2000,
    delay: function(el, i) {
        return i * 700;
    },
    easing: 'easeOutCubic'
})
animation.add({
    targets: ".menu_item a",
    opacity: 1,
    duration: 500,
    delay: function(el, i) {
        return i * 700;
    },
    easing: 'easeInSine'
}, "-=3000")
for (var i = 0; i < itemsID.length; i++) {
    document.querySelectorAll(".menu_item")[i].addEventListener("click", function(e) {
        animationToggle = 0;
        animation.reverse()
    })
}
menuButton.addEventListener("click", function(e) {

    if (animationToggle) {
        animationToggle = 0;
        animation.reverse()

    } else {
        animationToggle = 1;
        animation.restart()

    }
});

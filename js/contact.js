/*Display messages in Say Hi Page*/
var email_message = "You gotta email me, so we could talk about all the things in the world.";
var twitter_message = "Just for good academic memes and the fun in the world."
var instagram_message = "For the fun in life and the surroundings. Now you (can't) see me.";
var linkedin_message = "The place with least entropy."
var github_message = "All weird things I do with Python, Javascript and a lot of colab notebooks."
var main_message = "Hey There! Feel free to say Hi... 😃"
var speed = 70;
var paragraph = document.querySelector(".text_box p")
var i = 0;
var final_num = 0;
var cross_check = "main"

function message_write(message, num) {
    if (final_num === num) {
        if (i < message.length) {
            paragraph.innerHTML += message.charAt(i);
            i++;
            setTimeout(message_write, speed, message, num);
        }
    }
}

window.addEventListener("load", function () {
    i = 0;
    paragraph.innerHTML = "";
    message_write(main_message, 0)
})

/*Hover effects*/
document.getElementById("git").addEventListener("mouseover", function (e) {
    if (cross_check !== "git") {
        final_num = 3
        i = 0;
        paragraph.innerHTML = "";
        message_write(github_message, 3)
        cross_check = "git";
    }
})
document.getElementById("instagram").addEventListener("mouseover", function (e) {
    if (cross_check !== "face") {
        final_num = 5
        i = 0;
        paragraph.innerHTML = "";
        message_write(instagram_message, 5)
        cross_check = "face";
    }
})
document.getElementById("email").addEventListener("mouseover", function (e) {
    if (cross_check !== "email") {
        final_num = 1;
        i = 0;
        paragraph.innerHTML = "";
        message_write(email_message, 1)
        cross_check = "email";
    }
})

document.getElementById("linkedin").addEventListener("mouseover", function (e) {
    if (cross_check !== "linkedin") {
        final_num = 4;
        i = 0;
        paragraph.innerHTML = "";
        message_write(linkedin_message, 4)
        cross_check = "linkedin";
    }
})
document.getElementById("twitter").addEventListener("mouseover", function (e) {
    if (cross_check !== "twitter") {
        final_num = 2
        i = 0;
        paragraph.innerHTML = "";
        message_write(twitter_message, 2)
        cross_check = "twitter";
    }
})


/*Click events */
document.getElementById("email").addEventListener("click", function () {
    open("mailto:prakashaditya144@gmail.com", "_blank")
})
document.getElementById("twitter").addEventListener("click", function () {
    open("https://twitter.com/LeibTon", "_blank")
})
document.getElementById("git").addEventListener("click", function () {
    open("https://github.com/prakashaditya369", "_blank")
})
document.getElementById("linkedin").addEventListener("click", function () {
    open("https://www.linkedin.com/in/prakashaditya144/", "_blank")
})
document.getElementById("instagram").addEventListener("click", function () {
    open("https://www.instagram.com/_rick.aditya_", "_blank")
})
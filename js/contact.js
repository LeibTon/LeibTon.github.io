/*Display messages in Say Hi Page*/
var email_message = "I am usually happy to talk about stuff, even if I don't know you. And the best way to reach me is by email. Let's talk... :)";
var twitter_message = "Here You can have a look at inner me. I post whatever is in my mind. :)"
var facebook_message = "Only uses facebook for club communications. Still you can contact, if that's your thing. :)"
var linkedin_message = "Feel free to have a look at my professional side... :)"
var github_message = "The most important profile of a programmer: github. Have a look at my projects. :)"
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
document.getElementById("facebook").addEventListener("mouseover", function (e) {
    if (cross_check !== "face") {
        final_num = 5
        i = 0;
        paragraph.innerHTML = "";
        message_write(facebook_message, 5)
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
    open("https://twitter.com/_rickaditya_", "_blank")
})
document.getElementById("git").addEventListener("click", function () {
    open("https://github.com/prakashaditya369", "_blank")
})
document.getElementById("linkedin").addEventListener("click", function () {
    open("https://www.linkedin.com/in/prakashaditya144/", "_blank")
})
document.getElementById("facebook").addEventListener("click", function () {
    open("https://www.facebook.com/144ap/", "_blank")
})
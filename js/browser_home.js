function reset_browser_tab(){
    var tabs = document.querySelectorAll(".home-web-title-tab");
    tabs.forEach(tab => {
        tab.style.background = "#222";
    })
}

const all_website_data = {
    "project-ekatra": {
        "title": "Project Ekatra",
        "link": "https://projectekatra.github.io",
        "github-link": "https://github.com/projectekatra",
        "github-name": "Project Ekatra",
        "img": "img/project_ekatra.png"
    },
    "visualizer": {
        "title": "Algorithm Visualizer",
        "link": "https://prakashaditya369.github.io/visualizer/",
        "github-link": "https://github.com/prakashaditya369/visualizer",
        "github-name": "visualizer",
        "img": "img/algorithm_visualiser.png"
    },
    "leibton": {
        "title": "LeibTon",
        "link": "https://prakashaditya369.github.io",
        "github-link": "https://github.com/prakashaditya369/prakashaditya369.github.io",
        "github-name": "prakashaditya369.github.io",
        "img": "img/leibton.png"
    },
    "randomness": {
        "title": "Let's Explore Randomness",
        "link": "https://prakashaditya369.github.io/randomness/",
        "github-link": "https://github.com/prakashaditya369/randomness",
        "github-name": "randomness",
        "img": "img/randomness.png"
    },
    "being-iitian": {
        "title": "Being IITian",
        "link": "https://beingiitian.herokuapp.com/",
        "github-link": "https://github.com/prakashaditya369/being-iitian-code",
        "github-name": "being-iitian-code",
        "img": "img/beingiitian.png"
    }
}

const tabs_id = ["project-ekatra","visualizer","leibton","randomness","being-iitian"]
tabs_id.forEach(id => {
    document.getElementById(id).addEventListener("click", function(){
        reset_browser_tab();
        document.getElementById("browser-link").innerHTML = all_website_data[id]['link'];
        document.getElementById("browser-link").setAttribute("href", all_website_data[id]['link']);
        document.getElementById("browser-github-link").setAttribute("href", all_website_data[id]['github-link']);
        document.getElementById("browser-github-name").innerHTML = all_website_data[id]['github-name'];
        document.getElementById("browser-content").src = all_website_data[id]['img'];
        document.getElementById(id).style.background = "#444"; 
    })
})

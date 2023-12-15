/*Displays the Blog details into the Blog Page
Using HTML DOM manipulation, creating elements.*/

var blog_details = [{
    title: "Kinetic Theory Simulation",
    subtitle: "Overview of Kinetic Theory simulation in simulations",
    date: "Nov 21, 2021",
    read: "4 min read",
    link: "https://prakashaditya369.medium.com/kinetic-theory-simulation-60f00bd563c5?source=friends_link&sk=201a53fec431911dd09b8846d9121144",
  },
  {
    title: "Simulating Gas Molecules",
    subtitle: "Asking molecules to collide and observing their heat.",
    date: "Nov 22, 2021",
    read: "6 min read",
    link: "https://prakashaditya369.medium.com/simulating-gas-molecules-f3ba06596ee2?source=friends_link&sk=34632ff1673489ccbe908ba364fb176d",
  },
  {
    title: "Kinetic Theory of Gases (Basics)",
    subtitle: "micro and MACRO worlds.",
    date: "Nov 16, 2021",
    read: "6 min read",
    link: "https://prakashaditya369.medium.com/kinetic-theory-of-gases-basics-417752d6672c?source=friends_link&sk=c19d6532f96c421da41f1bc338b1f666",
  },
  {
    title: "Facial Emotion Recognition in Browser using TensorflowJS",
    subtitle: "Surprised?",
    date: "Sept 21, 2021",
    read: "6 min Read",
    link: "https://prakashaditya369.medium.com/facial-emotion-recognition-in-browser-using-tensorflowjs-f100d69962a9?source=friends_link&sk=cc64b866f80243c648a797bba1ad4d94"
  },
  {
    title: "Moment After Watching “Fabric of Cosmos”",
    subtitle: "Framing Some Questions?",
    date: "Feb 15, 2021",
    read: "3 min Read",
    link: "https://prakashaditya369.medium.com/moment-after-watching-fabric-of-cosmos-65dd901328a7?source=friends_link&sk=c2c281eaf2c4a33e58739a581fffe3af"
  },

  {
    title: "Emglish",
    subtitle: "Domge Vocabulary",
    date: "Feb 7, 2021",
    read: "1 min Read",
    link: "https://prakashaditya369.medium.com/emglish-e369a073c211?source=friends_link&sk=db50685260fa0fc641cf4a23de64f1d7"
  },
  {
    title: "LeibTon- My Personal Website",
    subtitle: "",
    date: "Feb 7, 2021",
    read: "2 min Read",
    link: "https://prakashaditya369.medium.com/leibton-my-personal-site-70ced7633ce?source=friends_link&sk=312097a4d53074bd8fdf035be7e61d61"
  }
]
var blog_container = document.querySelector("#contain_blog");

var flag = 1;

for (var i = 0; i < blog_details.length; i++) {
  var bsp = document.createElement("div");
  bsp.setAttribute("class", "blog-single-post");

  var bspmr = document.createElement("div");
  bspmr.setAttribute("class", "blog-single-post-marker");
  var circle = document.createElement("div");
  circle.setAttribute("class", "circle");
  circle.style.top = 0;
  bspmr.appendChild(circle);
  var line = document.createElement("div");
  line.setAttribute("class", "line");
  bspmr.appendChild(line);
  circle.style.bottom = 0;
  bspmr.appendChild(circle);

  var bspm = document.createElement("div");
  bspm.setAttribute("class", "blog-single-post-main");
  var bspmt = document.createElement("div");
  bspmt.setAttribute("class", "blog-single-post-main-title");
  var bspmta = document.createElement("a");
  bspmta.innerHTML = blog_details[i].title;
  bspmta.setAttribute("href", blog_details[i].link);
  bspmta.setAttribute("target", "_blank");
  bspmt.appendChild(bspmta);

  var bspms = document.createElement("div");
  bspms.setAttribute("class", "blog-single-post-main-subtitle");
  bspms.innerHTML = blog_details[i].subtitle;

  var bspma = document.createElement("div");
  bspma.setAttribute("class", "additional_info");
  var sp1 = document.createElement("span");
  sp1.style.marginRight = "30px";
  sp1.innerHTML = blog_details[i].date;
  bspma.appendChild(sp1);
  var sp2 = document.createElement("span");
  sp2.innerHTML = blog_details[i].read;
  bspma.appendChild(sp2);

  bspm.appendChild(bspmt);
  bspm.appendChild(bspms);
  bspm.appendChild(bspma);

  bsp.appendChild(bspmr);
  bsp.appendChild(bspm);

  blog_container.appendChild(bsp);
  flag = -flag;
}
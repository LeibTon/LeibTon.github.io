window.onload = function () {
  const totalStickers = 23;
  const totalLoadingImages = 8;
  const totalSleepyImages = 6;
  const numStickers = 8;
  const stickerHeight = (stickerWidth = 200);
  const container = document.getElementById("loading-image");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const floridaTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

// Extract the hours from the Florida time
const floridaHours = new Date(floridaTime).getHours();

// Determine the time period based on the hours
let timePeriod;
var type;

if (floridaHours >= 5 && floridaHours < 12) {
  console.log("morning");
  type = "flowers";
} else if (floridaHours >= 12 && floridaHours < 18) {
  type = "moody";

} else {
 type = "sleepy";
}


  // store image with full address, insta post with post link 
  // and tweet with tweet ID number, the end one
  const sleepy_library = [
    "1662793145455656961",
    "1664109513115590661",
    "1663627154184192002",
    "1662126455030181891",
    "1666648746610786305",
    "1666670843248750593",
    "img/mew/random/sleepy1.jpg",
    "1658708033910849536",

  ];

  const flowers_library = [
    "img/mew/random/flower1.jpg",
    "img/mew/random/flower2.jpg",
    "img/mew/random/flower3.jpg",
    "img/mew/random/flower4.jpg"
  ];

  const moody_library = [
    "1666097886231240704",
    "1665630275819253762",
    "1663281447891881984",
    "img/mew/random/moody1.jpg",
    "1666622526443737089",
    "1661047882391367680",
    "1660307039095070726",
    "1659027218650243073",
    "1656984393347645440",
    "https://www.instagram.com/p/CsLLLRjAaXg",
    "https://www.instagram.com/p/CpyH84WsjR5",
    

  ];

  function insertProperItem(type){
    if(type == "sleepy") library = sleepy_library;
    else if(type == "flowers") library = flowers_library;
    else library = moody_library;

    var item = library[Math.floor(Math.random() * library.length)];

    if(item.slice(0, 5) == "img/m")
    {
      document.getElementById("final-cont").innerHTML = `<img src="${item}" alt="Image" />`;
    }
    else if(item.slice(0, 5) == "https")
    {
      document.getElementById("final-cont").innerHTML = `<iframe src="${item}/embed" height="450" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`;
    }
    else
    {
      document.getElementById("final-cont").innerHTML = "";
  twttr.widgets.createTweet(item, document.getElementById("final-cont"))
  .then(function (el) {
    // The tweet has been embedded
    console.log('Tweet embedded.');
  })
  .catch(function (err) {
    // An error occurred
    console.error('Error embedding tweet:', err);
  });
   }
  }

  loadFinalContent();
  document.getElementById("final-button1").addEventListener("click", handleFirstClick);
  document.getElementById("final-button2").addEventListener("click", handleMiddleClick);
  document.getElementById("final-button3").addEventListener("click", handleLastClick);
  

  document.getElementById("loading-image-main").src = `img/mew/loading-image${Math.floor(Math.random() * (totalLoadingImages)) + 1}.jpg`
  document.getElementById("loading-image").style.backgroundColor = "#fed5c4";

  const greeting_texts = ["BEEP", "BOOP", "MEW", "MEOW", "ELLO", "HEMLO", "EWW"];
  const chosen_word = greeting_texts[Math.floor(Math.random() * greeting_texts.length)]
  document.getElementById("beep").innerHTML =chosen_word;
  document.title = chosen_word.charAt(0).toUpperCase() + chosen_word.slice(1).toLowerCase();

  document.getElementById("sleepy").src = `img/mew/sleepy${Math.floor(Math.random() * (totalSleepyImages)) + 1}.jpg`
  


  function loadFinalContent(){
    var small_container = document.getElementById("final-cont");
    insertProperItem(type);
    if(type == "sleepy")
    {
      document.getElementById("final-button1").innerText = "Flowers";
      document.getElementById("final-button2").innerText = "Mew Mew Mew";
      document.getElementById("final-button3").innerText = "Uhhhh";
    }
    else if(type == "flowers")
    {
      document.getElementById("final-button1").innerText = "Not this";
      document.getElementById("final-button2").innerText = "Mooooore";
      document.getElementById("final-button3").innerText = "nuu, sleepy";
    }
    else {
      document.getElementById("final-button1").innerText = "Cuddles pls";
      document.getElementById("final-button2").innerText = "Yes Yes Yes";
      document.getElementById("final-button3").innerText = "Sunshine";
    }
  }
  
  function handleMiddleClick(){
    insertProperItem(type);
    modifyStickers();
  }

  function handleFirstClick(){
    if(type == "sleepy"){
      type = "flowers";
    }
    else if(type == "flowers"){
      type = "moody";
    }
    else
    {
      type = "sleepy";
    }
    loadFinalContent();
    modifyStickers();
  }

  function handleLastClick(){
    if(type == "sleepy"){
      type = "moddy";
    }
    else if(type == "flowers"){
      type = "sleepy";
    }
    else
    {
      type = "flowers";
    }
    loadFinalContent();
    modifyStickers();
  }


  function selectRandomElements() {
    var images = Array.from(
      { length: numStickers },
      () => Math.floor(Math.random() * (totalStickers)) + 1
    );
    return images.map((x) => {return `img/mew/cat-sticker${x}.png`})
    }

  function addStickers() {
    var stickers = selectRandomElements();
    function getRandomPosition() {
      const margin = 50; // Adjust the margin as needed

      let x, y;

      if (Math.random() < 0.5) {
        // Place the sticker on the left or right side
        if (Math.random() < 0.5) {
          x = Math.random() * margin;
        } else {
          x = containerWidth - margin - stickerWidth;
        }
        y = Math.random() * (containerHeight - stickerHeight);
      } else {
        // Place the sticker on the top or bottom side
        if (Math.random() < 0.5) {
          y = Math.random() * margin;
        } else {
          y = containerHeight - margin - stickerHeight;
        }
        x = Math.random() * (containerWidth - stickerWidth);
      }

      return { x, y };
    }

    function createSticker(src) {
      const sticker = document.createElement("img");
      sticker.src = src;
      sticker.classList.add("sticker");
      return sticker;
    }

    function placeStickers() {
      for (let i = 0; i < stickers.length; i++) {
        const sticker = createSticker(stickers[i]);
        const position = getRandomPosition();
        sticker.style.left = `${position.x}px`;
        sticker.style.top = `${position.y}px`;

        container.appendChild(sticker);
      }
    }
    placeStickers();
  }

  function modifyStickers() {
    const stickers = container.querySelectorAll(".sticker");
    let maxRange = 500;
    let minRange = 100;
    var vx = Array.from(
      { length: numStickers },
      () => Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange
    );
    var vy = Array.from(
      { length: numStickers },
      () => Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange
    );

    function moveSticker() {
      stickers.forEach((sticker, index) => {
        let rect = sticker.getBoundingClientRect();
        let top = rect.top;
        let left = rect.left;

        let yPos = Math.floor(top + vy[index]);
        let xPos = Math.floor(left + vx[index]);

        if (xPos >= containerWidth - stickerWidth || xPos <= 0) {
          vx[index] = -vx[index];
          console.log(true);
        }
        if (yPos >= containerHeight - stickerHeight || yPos <= 0) {
          vy[index] = -vy[index];
        }
        yPos = Math.floor(top + vy[index]);
        xPos = Math.floor(left + vx[index]);
        sticker.style.left = `${xPos}px`;
        sticker.style.top = `${yPos}px`;
      });
    }

    function changeSticker() {
      var new_stickers = selectRandomElements();
      stickers.forEach((sticker, index) => {
        sticker.style.opacity = 0;
        moveSticker();
        setTimeout(() => {
          sticker.src = new_stickers[index]; // Change the image source
          sticker.style.opacity = 1; // Fade in the new image
          moveSticker();
        }, 500);
      });
    }

    for (var i = 0; i < Math.floor(Math.random() * (4 + 1)) + 2; i++) {
      setTimeout(moveSticker, 500);
    }
    changeSticker();
    for (var i = 0; i < Math.floor(Math.random() * (4 + 1)) + 2; i++) {
      setTimeout(moveSticker, 500);
    }
  }

  addStickers();

  function beepClick() {
    document.getElementById("beep").style.opacity = "0";
    modifyStickers();
    document.getElementById("loading-image").style.backgroundColor = "#f5e7e4";
    document.getElementById("beep").remove();
    document.getElementById("second-page").style.animation =
      "fade-in-text 1s forwards";
  }

  function boomClick() {
    document.getElementById("second-page").style.opacity = "0";
    modifyStickers();
    document.getElementById("second-page").remove();
    document.getElementById("loading-image").style.backgroundColor = "#fbd4cb";
    document.getElementById("final-page").style.animation =
      "fade-in-text 1s forwards";
  }

  document.getElementById("beep").addEventListener("click", beepClick);
  document.getElementById("next_button").addEventListener("click", boomClick);


  var loadingImage = document.getElementById("loading-image-main");
  var welcomePage = document.getElementById("welcome-page");
  setTimeout(function () {
    loadingImage.style.opacity = "0";
    loadingImage.remove();
    document.getElementById("beep").style.animation =
      "fade-in-text 1s forwards";
  }, 2000);
};

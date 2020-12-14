var completed_items = ["Meet HC Verma Sir.","Ride Bicycle at 2-3 AM.","Propose my first crush.","A long bicycle Trip.","Teach at an NGO."]

var remaining_items = ["Spend a night in my village forest.","Solo Trip to Himalayas","Open a school.","Go to my village on my bicycle","Live in Norway.","Read all 4 Vedas.","Paddy Farming.","Visit SpaceX","Buy a telescope"]
/* Function to add element*/
function add_element(array, element){
for(var i = 0;i< array.length;i++)
{
var list = document.createElement("li")
var node = document.createTextNode(array[i])
list.appendChild(node);
element.appendChild(list)
}
}

var remaining_ul = document.querySelector(".remaining_items")
var completed_ul = document.querySelector(".completed_items")

add_element(remaining_items, remaining_ul)
add_element(completed_items, completed_ul)



var percentage = parseInt((completed_items.length)/(completed_items.length+remaining_items.length)*100);
console.log(percentage)
var obj = {val: 0};
var i = obj.val;
var percentage_box = document.querySelector(".show_percentage")

const tl  = new TimelineLite({delay: 0.5});
 tl.fromTo(".show_percentage", 3,{left: "0%"},{left: percentage+"%"})
   .to(obj,3, {val: percentage, roundProps: 'val', onUpdate: logNumber},"-=3")
 .fromTo(".bar .growing-bar",3,{width: "0%"},{width:percentage+"%"},"-=3")

function logNumber(){  
  if(i !== obj.val){
    percentage_box.innerHTML = parseInt(obj.val)+"%";
    i = obj.val;
  }  
}

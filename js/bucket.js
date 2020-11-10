var remaining = document.querySelectorAll(".remaining_items li")
var completed = document.querySelectorAll(".completed_items li")

var percentage = parseInt((completed.length)/(completed.length+remaining.length)*100);
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

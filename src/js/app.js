// Elements of DOM
const $body = document.querySelector("body");
const $inputsColor = document.querySelectorAll("#colors > input[type='color']");
const $range = document.querySelector("#deg");
console.log($range.value);

const $addBtn = document.querySelector("#buttons > button:nth-child(1)");
const $subtractBtn = document.querySelector("#buttons > button:nth-child(2)");
const $random = document.querySelector("#buttons > button:nth-child(3)");

// Initialisation

let colorsList = ["#3a3aa1", "#37907a"]
$inputsColor[0].value = colorsList[0];
$inputsColor[1].value = colorsList[1];   

$body.style.background = `linear-gradient(${$range.value}deg, ${$inputsColor[0].value}, ${$inputsColor[1].value}) no-repeat center center fixed`;
$body.style.backgroundSize = "cover";


$inputsColor.forEach( color => {
    
    color.addEventListener("change", e =>{
        color.value = e.target.value;
        console.log(color.value);
        console.log(colorsList)
    });

});
   


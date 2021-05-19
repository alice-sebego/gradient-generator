// Elements of DOM
const $body = document.querySelector("body");
const $fieldset = document.querySelector("fieldset");
const $inputsColor = document.querySelectorAll("#colors > fieldset > input[type='color']");
const $range = document.querySelector("#deg");
console.log($range.value);

const $addBtn = document.querySelector("#buttons > button:nth-child(1)");
const $subtractBtn = document.querySelector("#buttons > button:nth-child(2)");
const $random = document.querySelector("#buttons > button:nth-child(3)");

// Initialisation

let colorsList = ["#3a3aa1", "#37907a"]
$inputsColor[0].value = colorsList[0];
$inputsColor[1].value = colorsList[1];   

$body.style.background = `linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed`;

// Add a color on colors array
$addBtn.addEventListener("click", () => {
   
    const inputColor = document.createElement("input");
    inputColor.setAttribute("type", "color");
    inputColor.value = "#3a3aa1";
    colorsList.push = inputColor.value;
    $fieldset.appendChild(inputColor);

    console.log(colorsList);
});

// Listening change of input color - WIP
$inputsColor.forEach( color => {
    
    color.addEventListener("change", e =>{
        color.value = e.target.value;
        console.log(color.value);
        console.log(colorsList)
    });

});

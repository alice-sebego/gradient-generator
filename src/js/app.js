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

let colorsList = ["#3a3aa1", "#37907a"];
let index = 3;
$inputsColor[0].value = colorsList[0];
$inputsColor[1].value = colorsList[1];   

$body.style.background = `linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed`;

// Add a color on colors array
$addBtn.addEventListener("click", () => {

    const $allInputs = document.querySelectorAll("#colors > fieldset > input[type='color']");
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    
    if ($allInputs.length > 7 ){

        return;
   
    } else {

        const newColor = document.createElement("input");
        newColor.setAttribute("type", "color");
        newColor.setAttribute('data-index', index);
        newColor.value = `#${randomColor.toUpperCase()}`; 
        $fieldset.appendChild(newColor);

        colorsList.push(`#${randomColor.toUpperCase()}`);
        
        $body.style.background = `linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed`;
        
        index++;
        console.log(colorsList);
        console.log($allInputs.length);

    }

});

// Subtract a color on colors array
$subtractBtn.addEventListener("click", () => {

    const $allInputs = document.querySelectorAll("#colors > fieldset > input[type='color']");
    if ($allInputs.length < 3){

        return;
        
    } else{
        
        $allInputs[$allInputs.length - 1].remove();
        colorsList.pop();
        $body.style.background = `linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed`;     

    }
});

// Listening change of input color - WIP
$inputsColor.forEach( color => {
    
    color.addEventListener("change", e =>{
        color.value = e.target.value;
        console.log(color.value);
        console.log(colorsList)
    });

});

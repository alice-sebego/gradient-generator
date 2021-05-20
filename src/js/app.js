// Elements of DOM
const $body = document.querySelector("body");
const $fieldset = document.querySelector("fieldset");
const $inputsColor = document.querySelectorAll("#colors > fieldset > input[type='color']");
const $range = document.querySelector("#deg");
console.log($range.value);

const $btns = document.querySelectorAll("#buttons > button")
const $addBtn = document.querySelector("#buttons > button:nth-child(1)");
const $subtractBtn = document.querySelector("#buttons > button:nth-child(2)");
const $random = document.querySelector("#buttons > button:nth-child(3)");

// Initialisation

let colorsList = ["#3a3aa1", "#37907a"];
let index = 3;
$inputsColor[0].value = colorsList[0];
$inputsColor[1].value = colorsList[1];   

$body.style.background = `linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed`;

// Listening change of input color - WIP
const updateColor = e => {

    let currentValue = e.target.value;
    let inputTochange = e.target.getAttribute("data-index");
    
    colorsList[inputTochange - 1] = currentValue;

    $body.style.background = `linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed`;

}

$inputsColor.forEach( input => input.addEventListener("input", updateColor));

// Add or subtract a color on colors array
const addOrSubtractInput = (e) => {

    const $allInputs = document.querySelectorAll("#colors > fieldset > input[type='color']");
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    if(e.target.value === "add"){

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
            
            index ++;
            
            const $allInputs = document.querySelectorAll("#colors > fieldset > input[type='color']");
           
            $allInputs.forEach( input => input.addEventListener("input", updateColor));
        }
    
    } else if(e.target.value === "subtract"){

        const $allInputs = document.querySelectorAll("#colors > fieldset > input[type='color']");

        if ($allInputs.length < 3){

            return;
            
        } else {
            
            colorsList.pop();
            
            $allInputs[$allInputs.length - 1].remove();
            index --;
            $body.style.background = `linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed`;     
        
        }

    }
    
}

$btns.forEach( btn => {
    btn.addEventListener("click", addOrSubtractInput );
});

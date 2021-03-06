import _ from 'lodash';
import * as util from './utils';

// Elements of DOM
const $body = document.querySelector("body");
const $fieldset = document.querySelector("fieldset");
const $inputsColor = document.querySelectorAll("#colors > fieldset > input[type='color']");
const $range = document.querySelector("#deg");
const $btns = document.querySelectorAll("#buttons > button");
const $random = document.querySelector("#buttons > button:nth-child(3)");
const $displaycode = document.querySelector("#display-code button");
const $section = document.querySelector("#generator");
const $preview = document.querySelector("#preview > div");
const $code = document.querySelector("#preview code");
const $copy = document.querySelector("#preview button");
const $year = document.querySelector("#year");
 
// Messages for user
const messages = {
    EightInput: "Vous pouvez utiliser jusqu'à 8 entrées de couleurs",
    TwoInput: "Vous devez avoir 2 entrées de couleurs minimum"
}

// Initialisation
let colorsList = ["#3a3aa1", "#37907a"];
let index = 3;
$inputsColor[0].value = colorsList[0];
$inputsColor[1].value = colorsList[1];   

$body.style.background = `linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed`;
$code.innerHTML = `background: linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed;`;

// Handle change of input of gradient's degree
$range.addEventListener("input", e => {

    $range.value = e.target.value;

    $body.style.background = `linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed`;
    $code.innerHTML = `background: linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed;`;
});

/**
 * Handle change of input color
 * @param {event} e 
 */
const updateColor = e => {

    let currentValue = e.target.value;
    let inputTochange = e.target.getAttribute("data-index");
    
    colorsList[inputTochange - 1] = currentValue;

    $body.style.background = `linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed`;
    $code.innerHTML = `background: linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed;`;
}

// Listening event of change on input's color
$inputsColor.forEach( input => input.addEventListener("input", updateColor));
 
/**
 * Add or subtract a color on colors array
 * @param {event} e 
 * @returns 
 */
const addOrSubtractInput = e => {

    const $allInputs = document.querySelectorAll("#colors > fieldset > input[type='color']");
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    if(e.target.value === "add"){

        if ($allInputs.length > 7 ){

            util.displayMsgInfo($section, messages.EightInput);
            const $infoUser = document.querySelector("#infoUser");
            util.removeElement($infoUser);
            return;
       
        } else {
    
            const newColor = document.createElement("input");
            newColor.setAttribute("type", "color");
            newColor.setAttribute('data-index', index);
            newColor.value = `#${randomColor.toUpperCase()}`; 
            $fieldset.appendChild(newColor);
    
            colorsList.push(`#${randomColor.toUpperCase()}`);
            
            $body.style.background = `linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed`;
            $code.innerHTML = `background: linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed;`;
            
            index ++;
            
            const $allInputs = document.querySelectorAll("#colors > fieldset > input[type='color']");
           
            $allInputs.forEach( input => input.addEventListener("input", updateColor));
        }
    
    } else if(e.target.value === "subtract"){

        const $allInputs = document.querySelectorAll("#colors > fieldset > input[type='color']");

        if ($allInputs.length < 3){

            util.displayMsgInfo($section, messages.TwoInput);
            const $infoUser = document.querySelector("#infoUser");
            util.removeElement($infoUser);
            return;
            
        } else {
            
            colorsList.pop();
            
            $allInputs[$allInputs.length - 1].remove();
            index --;
            $body.style.background = `linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed`;     
            $code.innerHTML = `background: linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed;`;
        }

    }
    
}

// Listening event of click on Add and Subtract buttons
$btns.forEach( btn => btn.addEventListener("click", addOrSubtractInput ));

// Handle event of click on Random input
$random.addEventListener("click", () => {

    const $allInputs = document.querySelectorAll("fieldset > input[type='color']");
    
    colorsList = [];

    for(let input of $allInputs){

        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        input.value = `#${randomColor.toUpperCase()}`;
        colorsList.push(input.value);
        $body.style.background = `linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed`;
        $code.innerHTML = `background: linear-gradient(${$range.value}deg, ${colorsList}) no-repeat center center fixed;`;
    }

});

/**
 * Copy on clipboard
 * @param {HTMLElement} code 
 */
 const clipboard = () =>{

    const range = document.createRange();
    let selection = window.getSelection();
    range.selectNode($code);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        const result = document.execCommand('copy');
        if (result) {
            const $copied = document.createElement("div");
            $copied.setAttribute("id", "copied");
            $copied.innerHTML = "Copié !";
            $preview.appendChild($copied);
            util.removeElement($copied);
        }
    }
    catch(err) {
        const $copied = document.createElement("div");
        $copied.setAttribute("id", "infoUser");
        $copied.innerHTML = `Dsl :( Une erreur ${err} s'est produite`;
        $preview.appendChild($copied);
        util.removeElement($copied);
    }

    // End of process
    selection = window.getSelection();
    if (typeof selection.removeRange === 'function') {
        selection.removeRange(range);
    } else if (typeof selection.removeAllRanges === 'function') {
        selection.removeAllRanges();
    }
}
// Listening click event in order to copy code CSS
$copy.addEventListener( 'click', clipboard);

// Manager display of code CSS preview
$displaycode.addEventListener("click", () => $preview.classList.toggle("block"))

// Display current year on the footer
util.displayYear($year);
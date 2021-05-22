/**
 * Display a message for user
 * @param {HTMLElement} section 
 * @param {string} info 
 */
export const displayMsgInfo = (section, info) => {
    const div = document.createElement("div");
    div.setAttribute("id", "infoUser");
    const msg = document.createElement("p");
    msg.innerHTML = info;
    div.appendChild(msg);
    section.appendChild(div);
}

/**
 * Remove an element of the DOM
 * @param {HLMLElement} element 
 */
export const removeElement = (element) => {
    setTimeout(()=>{
        element.remove();
    }, 4000);
}

/**
 * Display current year
 * @param {HTMLSpanElement} span 
 */
export const displayYear = (span)=> {
    const date = new Date(Date.now());
    span.innerHTML = date.getFullYear();
}


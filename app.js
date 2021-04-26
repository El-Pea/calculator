function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function posNeg(a){
    return a > 0 ? a * -1: Math.abs(a);
}

function operate(operator, a, b){
    if(operator === posNeg){return operator(a)}
    return operator(a, b);
}

let display = {
    one : [],
    two : [],
};

function updateScreen(){
    const number = document.querySelectorAll('.num__num');
    const displayDiv = document.querySelector('.calc__display');
    number.forEach((num)=>{
        num.addEventListener('click', ()=>{
            displayDiv.textContent = num.textContent;
        });
    });
}

/*
function displayThis(){
    const number = document.querySelectorAll('.num__num');
    const display = document.querySelector('.calc__display');
    number.forEach((num)=>{
        num.addEventListener('click', ()=>{
            display.textContent = num.textContent;
            console.log(num.textContent)
        });
    });
}
*/

updateScreen();
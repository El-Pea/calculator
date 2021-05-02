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

function clear(){
    
}

function del(){

}

// stores string-input and provides methods to put them in the type expected by other functions
let stored = {
    numString : [],
    makeFloat : function(arr){
        let float = parseFloat(arr.join(''), 10);
        return float;
    },
    signString : null,
    makeArg : function(signString){
        switch(signString){
            case 'add' :
                return add;
            case 'subtract' :
                return subtract;
            case 'multiply' :
                return multiply;
            case 'divide' :
                return divide;
            case 'posNeg' :
                return posNeg;
            case 'clear' :
                return clear;
            case 'del' :
                return del;
        }
    },
    currentValue : 0,
};

function updateDisplay(){
    const displayDiv = document.querySelector('.calc__display');
        let number = stored.makeFloat(stored.numString);
        displayDiv.textContent = number;
    
}

function numKeyListner(){
    const number = document.querySelectorAll('.num__num');
    number.forEach((num)=>{
        num.addEventListener('click', ()=>{
            stored.numString.push(num.textContent);
            updateDisplay();
        });
    });
}

function opKeyListener(){
    const pressed = document.querySelectorAll('.op');
    pressed.forEach((op)=>{
        op.addEventListener('click', ()=>{stored.signString = op.id;
        stored.currentValue = stored.makeFloat(stored.numString);
        })  
    });
}

numKeyListner();
opKeyListener();
// equals();

/*
function equals(){
    let equalsButton = document.querySelector('#equals');
        equalsButton.addEventListener('click', ()=>{
            let op = stored.makeArg(stored.signString);
            let num = stored.makeFloat(stored.numString);
            stored.currentValue = operate(op, num)
            updateDisplay(stored.currentValue);
        });  
}
*/

/*
function updateDisplay(nextNumber){
    const displayDiv = document.querySelector('.calc__display');
    if(!nextNumber){
        let number = stored.makeFloat(stored.numString);
        displayDiv.textContent = number;
    }else{
        displayDiv.textContent = nextNumber;
    }
}
*/
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

function equals(){
    let op = stored.makeVar(signString);
    let num = stored.makeFloat(stored.numString); 
    operate(op, num);
}

// stores string-input and provides methods to put them in the type expected by other functions
let stored = {
    numString : [],
    makeFloat : function(arr){
        let float = parseFloat(arr.join(''), 10);
        return float;
    },
    signString : null,
    makeVar: function(signString){
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
};

function getInputGiveFloat(){
    const number = document.querySelectorAll('.num__num');
    const displayDiv = document.querySelector('.calc__display');
    number.forEach((num)=>{
        num.addEventListener('click', ()=>{
            stored.numString.push(num.textContent);
            displayDiv.textContent = stored.makeFloat(stored.numString);
        });
    });
}

function setOperator(){
    const pressed = document.querySelectorAll('.op');
    pressed.forEach((op)=>{
        op.addEventListener('click', ()=>{stored.signString = op.id;})
        if(op === 'equals'){equals();}
    });
}

getInputGiveFloat();
setOperator();

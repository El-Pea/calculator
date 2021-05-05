// @ts-check

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
    const clear = document.querySelector('#clear');
    clear.addEventListener('click', ()=>{
        stored.numString = ['0'];
        stored.signString = null;
        stored.float1 = undefined;
        stored.answer = undefined;
        stored.opCount = 0;
        document.querySelector('.calc__display').textContent = '0';
    });
}

// double check
function del(){
    const deleteThis = document.querySelector('#del');
    deleteThis.addEventListener('click', ()=>{
        stored.numString = ['0'];  
        display();
    });  
}

// stores string-input and provides methods to put them in the type expected by other functions
let stored = {
    numString : ['0'],
    makeFloat : function(arr){
        let float = parseFloat(arr.join(''));
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
        }
    },
    float1 : undefined,
    answer : undefined,
    opCount : 0,
    opPressed : false,
};

function display(result){
    const displayDiv = document.querySelector('.calc__display');
    if(!result){
        let number = stored.makeFloat(stored.numString).toString();
        displayDiv.textContent = number;
    }else{
        displayDiv.textContent = result;
    }
}

function numKeyListener(){
    const number = document.querySelectorAll('.num__num');
    number.forEach((num)=>{
        num.addEventListener('click', ()=>{
            stored.numString.push(num.textContent);
            display();
        });
    });
}

// clearing numString in here keeps equals from concatenating num1 and num2 in its block
function opKeyListener(){
    const pressed = document.querySelectorAll('.op');
    pressed.forEach((op)=>{
        op.addEventListener('click', ()=>{
            if(stored.opCount > 0 && stored.opPressed === true){equals();}
            stored.signString = op.id;
            stored.float1 = stored.makeFloat(stored.numString);
            stored.opCount++
            stored.opPressed = true;
            stored.numString = [];            
        });  
    });
}

function equals(){
    let op = stored.makeArg(stored.signString);
    let num1 = undefined;
    if(typeof stored.answer === 'undefined'){
        num1 = stored.float1;
    }else{
        num1 = stored.answer;
    }
    let num2 = stored.makeFloat(stored.numString);
    stored.answer = operate(op, num1, num2); 
    display(stored.answer);
    
}

function equalsListener(){
    let equalsButton = document.querySelector('#equals');
        equalsButton.addEventListener('click', ()=>{
            equals();
            stored.opCount = 0;
    });
}

function init(){
    // document.querySelector('.calc__display').textContent = 0;
    display();
    numKeyListener();
    opKeyListener();
    equalsListener();
    clear();
    del();
}

init();
// 

/*

*/

/*

*/
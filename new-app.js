function add(a, b){
    return a + b;
};

function subtract(a, b){
    return a - b;
};

function multiply(a, b){
    return a * b;
};

function divide(a, b){
    return a / b;
};

function posNeg(a){
    return a > 0 ? a * -1: Math.abs(a);
};

function operate(operator, a, b){
    if(operator === posNeg){return operator(a)}
    return operator(a, b);
};

let calc = {
    value : ['0'],
    operator : '',
    makeFloat : function(arr){
        let float = parseFloat(arr.join(''));
        return float;
    },
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
    float1 : null,
    float2 : null,
    answer : null,
};

function display(result){
    const displayDiv = document.querySelector('.calc__display');
    if(!result){
        let number = calc.makeFloat(calc.value).toString();
        displayDiv.textContent = number;
    }else{
        displayDiv.textContent = result;
    };
};

function numKeyPress(){
    const number = document.querySelectorAll('.num__num');
    number.forEach((num)=>{
        num.addEventListener('click', ()=>{
            if(calc.value[0] === '0'){calc.value.pop()};
            calc.value.push(num.textContent);
            display();
        });
    });
};

function opKeyPress(){
    const opKey = document.querySelectorAll('.op');
    opKey.forEach((op)=>{
        op.addEventListener('click', ()=>{
            
         // if the display value is empty, which equals will do, makeFloat will return NaN
            if(typeof calc.value[0] === 'string'){
                
                if(calc.float1 === null){
                    calc.float1 = calc.makeFloat(calc.value);
                    // first number input
                }else if(calc.answer === null){
                    calc.float2 = calc.makeFloat(calc.value);
                    equals();
                    // second operator pressed
                }else{
                    calc.float1 = calc.answer;
                    calc.float2 = calc.makeFloat(calc.value);
                    equals();
                    // subsequent operations
                }
            
            calc.operator = op.id;
            calc.value = [];
            };
        });
    });
};

function equals(){
    
    let num1 = null;
    let num2 = null;

    /*
    if(calc.float2 === null){
        calc.float2 = calc.makeFloat(calc.value);

    }
    */

    if(calc.value !== null){
        calc.float2 = calc.makeFloat(calc.value);  
    };

    if(calc.answer !== null){
        calc.float1 = calc.answer;
    };

    

    num1 = calc.float1;
    num2 = calc.float2;

    let op = calc.makeArg(calc.operator);
    
    calc.answer = operate(op, num1, num2);

    display(calc.answer);

    calc.value = [];
    // calc.float1 = null;
    // calc.float2 = null;
};

function equalsListener(){
    const equalsButton = document.querySelector('#equals');
          equalsButton.addEventListener('click', ()=>{
            equals();
            calc.float1 = null;
            calc.answer = null;
    });
};

display();
numKeyPress();
opKeyPress();
equalsListener();

// how to arrange an answer after equals pressed then op and number pressed? right now clearing calc.answer on key press lets the user do a new operation
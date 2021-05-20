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
    float1 : undefined,
    float2 : undefined,
    answer : undefined,
    opCount : 0,
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
            if(typeof calc.value[0] === 'string'){calc.float1 = calc.makeFloat(calc.value);};
            if(calc.opCount > 0){equals();}
            calc.operator = op.id;
            calc.value = [];
        });
    });
};

function equals(){
    calc.float2 = calc.makeFloat(calc.value);
    
    let num1 = undefined;
    let num2 = undefined;

    if(calc.float1 !== undefined){
        num1 = calc.float1;
        num2 = calc.makeFloat(calc.value);
    }else{
        num1 = calc.answer;
        num2 = calc.makeFloat(calc.value);
    }

    let op = calc.makeArg(calc.operator);

    calc.answer = operate(op, num1, num2);;
    
    display(calc.answer);

    calc.float1 = undefined;
    calc.value = [];
};

function equalsListener(){
    const equalsButton = document.querySelector('#equals');
          equalsButton.addEventListener('click', ()=>{
            equals();
    });
};

display();
numKeyPress();
opKeyPress();
equalsListener();

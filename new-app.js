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
            calc.operator = op.id;
         // if the display value is empty, which equals will do, makeFloat will return NaN
            if(typeof calc.value[0] === 'string'){
                
                if(calc.float1 === null){
                    calc.float1 = calc.makeFloat(calc.value);

                }else if(calc.float1 !== null){
                    calc.float2 = calc.makeFloat(calc.value);
                    equals();

                };
            };
            calc.value = [];
            calc.opCount++;
        });
    });
};

function equals(){
    
    let num1 = null;
    let num2 = null;
        
    if(calc.float1 === null){
        num1 = calc.answer;
    }else{
        num1 = calc.float1; 
    };

    if(calc.float2 === null){
        num2 = calc.makeFloat(calc.value);
    }else{
        num2 = calc.float2; 
    };
    
    let op = calc.makeArg(calc.operator);

    calc.answer = operate(op, num1, num2);;
    
    display(calc.answer);

    calc.float1 = null;
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

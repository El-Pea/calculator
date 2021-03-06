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

function negate(){
    if(calc.inputArray.length !== 0){
        const number = calc.arrayToFloat(calc.inputArray);
        calc.inputArray = [];
        calc.inputArray[0] = posNeg(number).toString();
        display(calc.arrayToFloat(calc.inputArray)); 
    }else{
        const displayValue = document.querySelector('.calc__display').textContent;
        calc.answer = posNeg(parseFloat(displayValue));
        display(calc.answer);
    };
};

function del(){
    if(calc.inputArray.length !== 0){
        calc.inputArray.pop()
        display();
    };   
};

function clear(){
    calc.inputArray = ['0'];
    calc.operator = null;
    calc.float1 = null;
    calc.float2 = null;
    calc.answer = null; 
    display();     
};

function insertDecimalPoint(){
    const decimalButton = document.querySelector('#decimal');
        if(!calc.inputArray.includes('.')){
            if(calc.inputArray[0] === undefined){
                calc.inputArray.splice(0, 1 ,'0','.')
            }else{
                calc.inputArray.push(decimalButton.textContent);
            };
            
            display(calc.inputArray.join(''));
        };
};

function formatAnswer(num){
    num = num.toString();
    if(num.length > 9){
        return parseFloat(num).toExponential(2)
    }else{
        return num;
    };
};

let calc = {
    inputArray : ['0'],
    operator : null,
    arrayToFloat : function(arr){
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
        }
    },
    float1 : null,
    float2 : null,
    answer : null,
};

function display(result){
    const displayDiv = document.querySelector('.calc__display');
    if(result === undefined){
        let displayValue = calc.inputArray.join('');
        displayDiv.textContent = displayValue;
    }else{
        displayDiv.textContent = result;
    };
};

function numKeyPress(){
    const number = document.querySelectorAll('.num__num');
    number.forEach((num)=>{
        num.addEventListener('click', ()=>{
            if(calc.inputArray.length <= 8){
                if(calc.inputArray[0] === '0' && calc.inputArray[1] === undefined){calc.inputArray.pop()};
                calc.inputArray.push(num.textContent);
                display();
            } 
        });
    });
};

function specialKeyPress(){
    const specialKey = document.querySelectorAll('.spec');
    specialKey.forEach((spec)=>{
        spec.addEventListener('click', ()=>{
            if(spec.id === 'posNeg'){negate()};
            if(spec.id === 'del'){del()};
            if(spec.id === 'clear'){clear()};
            if(spec.id === 'decimal'){insertDecimalPoint()};
        });
    });
}

function opKeyPress(){
    const opKey = document.querySelectorAll('.op');
    opKey.forEach((op)=>{
        op.addEventListener('click', ()=>{
                
                if(calc.float1 === null && calc.operator === null && calc.inputArray.length !== 0){
                    calc.float1 = calc.arrayToFloat(calc.inputArray);
                    // first number input
                }else if(calc.answer === null && calc.inputArray.length !== 0 && calc.float1 !== null){
                    calc.float2 = calc.arrayToFloat(calc.inputArray);
                    equals();
                    // second operator pressed 
                }else if(calc.answer !== null && calc.inputArray.length !== 0){
                    calc.float1 = calc.answer;
                    calc.float2 = calc.arrayToFloat(calc.inputArray);
                    equals();
                    // subsequent operations
                }else if(calc.answer === null && calc.float1 === null){
                    let getAnswer = document.querySelector('.calc__display').textContent;
                    calc.float1 = parseFloat(getAnswer);
                    // after equals is pressed if operating on that answer
                }
            
            calc.operator = op.id;
            calc.inputArray = [];
        });
    });
};

function equals(){
    
    let num1 = null;
    let num2 = null;

    if(calc.answer === null && calc.inputArray.length === 0){
        let getAnswer = document.querySelector('.calc__display').textContent;
        calc.float1 = parseFloat(getAnswer);
    }

    if(calc.inputArray.length !== 0){
        calc.float2 = calc.arrayToFloat(calc.inputArray);  
    };
    
    if(calc.answer !== null){
        calc.float1 = calc.answer;
    };

    num1 = calc.float1;
    num2 = calc.float2;

    let op = calc.makeArg(calc.operator);
    
    calc.answer = operate(op, num1, num2);

    
    display(formatAnswer(calc.answer));

    calc.inputArray = [];
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
specialKeyPress();
numKeyPress();
opKeyPress();
equalsListener();

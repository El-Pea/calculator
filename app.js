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

// needs work

function posNegListener(){
    const posNegButton = document.querySelector('#posNeg');
    posNegButton.addEventListener('click', ()=>{
        // this should handle numbers on either side of the operator because the last thing typed is stored.numString
        if(typeof stored.answer === 'undefined'){
            let a = stored.makeFloat(stored.numString);
            stored.numString[0] = operate(posNeg,a).toString(); 
            display(stored.numString);
        }else{
        // this should handle answers
        //    let a = stored.answer;
        //    stored.answer = operate(posNeg,a);
        //    display(stored.answer);
        }
    });
}

function del(){
    const deleteThis = document.querySelector('#del');
    deleteThis.addEventListener('click', ()=>{
        stored.numString.pop()
        if(stored.numString.length === 0){stored.numString[0] = '0'}  
        display(stored.makeFloat(stored.numString));
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
    numPressed : false,
    error : false,
    
};

function equals(){
    let op = stored.makeArg(stored.signString);
    let num1 = undefined;
    let num2 = undefined;
    
    if(stored.answer === 'Error'){stored.answer = undefined};
    if(num1 === undefined || num2 === undefined){stored.answer = 'Error'}
    
    stored.answer = operate(op, num1, num2);

    // if(stored.answer === 0){stored.numString.pop();}
    display(stored.answer.toString()); 
}

/*
function equals(){
    let op = stored.makeArg(stored.signString);
    let num1 = undefined;
    let num2 = undefined;
    
    if(stored.answer === 'Error'){stored.answer = undefined};

    if(typeof stored.answer === 'undefined'){
        num1 = stored.float1;
    }else{
        num1 = stored.answer;
    };

    if(typeof stored.numString[0] === 'string'){
        num2 = stored.makeFloat(stored.numString);
        stored.answer = operate(op, num1, num2); 
    }else{
        stored.answer = 'Error';
        stored.error = true;
    };
    if(stored.float1 === undefined && stored.answer === undefined){
        stored.answer = 'Error';
        stored.error = true;
    }

    // if(stored.answer === 0){stored.numString.pop();}
    display(stored.answer.toString()); 
}
*/

function allClear(){
    const clear = document.querySelector('#clear');
    clear.addEventListener('click', ()=>{
        stored.numString = ['0'];
        stored.signString = null;
        stored.float1 = undefined;
        stored.answer = undefined;
        stored.opCount = 0;
        stored.error = false;
        document.querySelector('.calc__display').textContent = '0';
    });
}

function opKeyListener(){
    const pressed = document.querySelectorAll('.op');
    pressed.forEach((op)=>{
        op.addEventListener('click', ()=>{
            if(stored.error === false){
                if(stored.opCount > 0 && stored.numPressed === true){equals();}
                if(typeof stored.numString[0] === 'string'){stored.float1 = stored.makeFloat(stored.numString);}
                
                stored.numPressed = false;
                stored.signString = op.id;
                // if(op.id === 'posNeg'){equals();}
                stored.opCount++;
                stored.numString = [];
            };             
        });  
    });
}

// clearing numString in here keeps equals() from concatenating num1 and num2 in its block
function numKeyListener(){
    const number = document.querySelectorAll('.num__num');
    number.forEach((num)=>{
        num.addEventListener('click', ()=>{
            if(stored.error === false){
            if(stored.numString[0] === '0'){stored.numString.pop()};
                stored.numString.push(num.textContent);
                stored.numPressed = true;
                display();
            }; 
        });
    });
}

function equalsListener(){
    let equalsButton = document.querySelector('#equals');
        equalsButton.addEventListener('click', ()=>{
            equals();
            stored.opCount = 0;
    });
}

function display(result){
    const displayDiv = document.querySelector('.calc__display');
    if(!result){
        let number = stored.makeFloat(stored.numString).toString();
        displayDiv.textContent = number;
    }else{
        displayDiv.textContent = result;
    }
}

function lightsOn(){
    display();
    allClear();
    numKeyListener();
    opKeyListener();
    equalsListener();
    // posNegListener();
    del();
}

lightsOn();
// 

/*

*/

/*

*/
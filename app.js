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
        };
    });
};

function del(){
    const deleteThis = document.querySelector('#del');
    deleteThis.addEventListener('click', ()=>{
        stored.numString.pop()
        if(stored.numString.length === 0){stored.numString[0] = '0'}  
        display(stored.makeFloat(stored.numString));
    });  
};

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
    float2 : undefined,
    answer : undefined,
    opCount : 0,
    opPressed : false,
    numPressed : false,
    eqPressed : false,
    error : false,
    
};

// this handles seperate ops
function equals(){
    let op = stored.makeArg(stored.signString);
    let num1 = undefined;
    let num2 = undefined;

    if(typeof stored.float1 === 'number'){
        stored.float2 = stored.makeFloat(stored.numString);
        num1 = stored.float1;
        num2 = stored.float2;
    }else if(stored.float1 === undefined && typeof stored.numString[0] === 'string'){
        stored.float2 = stored.makeFloat(stored.numString);
        num1 = stored.answer;
        num2 = stored.float2;
    }else{
        num1 = stored.answer;
        num2 = stored.float2;
    };

    stored.answer = operate(op, num1, num2);

    if(isNaN(stored.answer)){
        display('Error');
        stored.error = true;
    }else if(Number.isInteger(stored.answer)){
        display(stored.answer)
    }else{
        display(stored.answer.toPrecision(3));
    }

    stored.numString.pop();
    stored.float1 = undefined;
};

function allClear(){
    const clear = document.querySelector('#clear');
    clear.addEventListener('click', ()=>{
        stored.numString = ['0'];
        stored.signString = null;
        stored.float1 = undefined;
        stored.float2 = undefined;
        stored.answer = undefined;
        stored.opCount = 0;
        stored.error = false;
        document.querySelector('.calc__display').textContent = '0';
    });
};

// clearing numString in here keeps equals() from concatenating num1 and num2 in its block
function opKeyListener(){
    const pressed = document.querySelectorAll('.op');
    pressed.forEach((op)=>{
        op.addEventListener('click', ()=>{
            if(stored.error === false){
                if(stored.opCount > 0 && stored.numPressed === true){equals();}
                if(typeof stored.numString[0] === 'string'){stored.float1 = stored.makeFloat(stored.numString);}
                // stored.float1 = stored.makeFloat(stored.numString);
                stored.numPressed = false;
                // stored.opPressed = true;
                stored.signString = op.id;
                stored.opCount++;
                stored.numString = [];
            };             
        });  
    });
};

function numKeyListener(){
    const number = document.querySelectorAll('.num__num');
    number.forEach((num)=>{
        num.addEventListener('click', ()=>{
            if(stored.error === false){
            if(stored.numString[0] === '0'){stored.numString.pop()};
            // if(stored.numString[0] === '.'){stored.numString[0] = '0.0'}
               stored.numString.push(num.textContent);
               stored.numPressed = true;
                // stored.opPressed = false;
               display();
            }; 
        });
    });
};

function equalsListener(){
    let equalsButton = document.querySelector('#equals');
        equalsButton.addEventListener('click', ()=>{
            equals();
            stored.opCount = 0;
            // stored.eqPressed = true;
    });
};

function display(result){
    const displayDiv = document.querySelector('.calc__display');
    if(!result){
        if(stored.numString[0] === '.'){stored.numString[0] = '0.0'}
        let number = stored.makeFloat(stored.numString).toString();
        displayDiv.textContent = number;
    }else{
        displayDiv.textContent = result;
    };
};

function lightsOn(){
    display();
    allClear();
    numKeyListener();
    opKeyListener();
    equalsListener();
    // posNegListener();
    del();
};

lightsOn();

/*
needed functions:
add 
subtract
divide
multiply
toggle +/-

operate (takes operator, two numbers, and calls the operator on them)
*/

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

function operate(a, b, operator){
    if(operator === posNeg){return operator(a)}
    return operator(a, b);
    // works except posNeg
    // will rest parameters help me out here?
    // will putting operator first help me out here?
}
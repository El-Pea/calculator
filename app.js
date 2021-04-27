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

let holder = {
    one : [],
    two : [],
    value : function(arr){
        let newArr = parseFloat(arr.join(''), 10);
        return newArr;
    },
};

function updateScreen(){
    const number = document.querySelectorAll('.num__num');
    const displayDiv = document.querySelector('.calc__display');
    number.forEach((num)=>{
        num.addEventListener('click', ()=>{
            holder.one.push(num.textContent);
            displayDiv.textContent = holder.value(holder.one);
        });
    });
}

updateScreen();
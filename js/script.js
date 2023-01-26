

//calculator functions

function add(a,b) {
    a = Number(a);
    b = Number(b);
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function mod(a,b) {
    return a%b;
}

function negative(a) {
    a = Number(a);
    if(a === 0) return 0;
    return -a;
}


//choose operation

function operate(operator,num1,num2) {
    switch(operator) {
        case '+':
            return add(num1,num2);
        
        case '-':
            return subtract(num1,num2);

        case '*':
            return multiply(num1,num2);

        case '/':
            return divide(num1,num2);

        case '%':
            return mod(num1,num2);

        case 'negative':
            return negative(num1);

        default: return;
    }
}


//enter values on the display





let displayValue = "0";
let curResult = '';
let curOperator = '';
let displayValueAfter = '';
let fromStart = false; //enter from start value or keep going

const displayEnter = document.querySelector('.display>.top-input');

const numbersList = document.querySelectorAll('.calc-numbers');
const operatorsList = document.querySelectorAll('.calc-operator');
const equalOperator = document.querySelector('.calc-equal');

numbersList.forEach(number => {
    number.addEventListener('click',showValue);
});

operatorsList.forEach(operator => {
    operator.addEventListener('click',enterOperator);
});

equalOperator.addEventListener('click',showFullResult);


//event handlers

function showValue(e) {
    if(!curOperator) {
        enterBefore(this);
    }
    else {
        enterAfter(this);
    }
    
}

function enterOperator(e) {
    if(this.dataset.value === 'negative') {
        curResult = operate(this.dataset.value,displayValue);
        curOperator = '';
        displayValue = curResult;
        showResult();
        return;
    }
    if(displayValueAfter) {
        curResult = operate(curOperator,displayValue,displayValueAfter);
        displayValue = curResult;
        showResult();
    }
    curOperator = this.dataset.value;

}

function showFullResult(e) {
    if(displayValueAfter) {
        curResult = operate(curOperator,displayValue,displayValueAfter);
        displayValue = curResult;
        displayValueAfter = '';
        curOperator = '';
        showResult();
        fromStart = true;
    }
    
    
}

function clearDisplay(e) {
    
}


//functions enter values
function enterBefore(curObj) {
    if(fromStart) {
        fromStart = false;
        displayValue = '';
    }
    if(displayValue === "0"){
        displayValue = "";
    }
    if(curObj.dataset.value === '.' && displayValue.length === 0) displayValue+='0';
    if(curObj.dataset.value === '.' && displayValue.includes('.')) return;

    displayValue += curObj.dataset.value;   
    displayEnter.textContent = displayValue;
}

function enterAfter(curObj) {
    if(displayValueAfter === "0"){
        displayValueAfter = "";
    }
    if(curObj.dataset.value === '.' && displayValueAfter.length === 0) displayValueAfter+='0';
    if(curObj.dataset.value === '.' && displayValueAfter.includes('.')) return;

    displayValueAfter += curObj.dataset.value;   
    displayEnter.textContent = displayValueAfter;
}


function showResult() {
    displayValueAfter = '';
    displayEnter.textContent = curResult;
}

const display = document.querySelector('h1');
const clearBtn = document.getElementById('clear-btn');
const sign = document.getElementById('sign');
const percent = document.getElementById('percent');
const decimal = document.getElementById('decimal');
const equal = document.getElementById('equal');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

let firstValue = 0;
let operatorVal = '';
let waitingNextVal = false;

const calculate = {
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
}

function displayNumber(number) {
    if(waitingNextVal) {
        display.textContent = number;
        waitingNextVal = false;
    }else {
        const currenDisplay = display.textContent;
        display.textContent = currenDisplay === '0' ? number: currenDisplay + number;
    }
}

function addDecimal() {
    if(waitingNextVal) {
        return;
    }
    if(!display.textContent.includes('.')) {
        display.textContent = `${display.textContent}.`;
    }
}

function calculating(operator) {
    const currentVal = Number(display.textContent);
    if(operatorVal && waitingNextVal) {
        operatorVal = operator;
        return;
    };
    if(!firstValue) {
        firstValue = currentVal;
    } else {
        const calculation = calculate[operatorVal] (firstValue, currentVal);
        display.textContent = calculation;
        firstValue = calculation;
    }
    waitingNextVal = true;
    operatorVal = operator;
}

function reset() {
    display.textContent = '0';
    firstValue = 0;
    operatorVal = '';
    waitingNextVal = false;
}

numbers.forEach((number) => {
    number.addEventListener('click', () => displayNumber(number.value));
})

decimal.addEventListener('click', addDecimal);
percent.addEventListener('click', () => {
    display.textContent = Number(display.textContent) * 0.01;
})
sign.addEventListener('click', () => {
    display.textContent = Number(display.textContent) * -1;
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => calculating(operator.value));
})

clearBtn.addEventListener('click', reset);

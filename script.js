let displayValue = '0';
let operator = '';
let previousValue = '';

function updateDisplay() {
    document.getElementById('display').innerText = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    operator = '';
    previousValue = '';
    updateDisplay();
}

function deleteLast() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}

function appendNumber(number) {
    if (displayValue === '0' || operator) {
        displayValue = number;
        operator = '';
    } else {
        displayValue += number;
    }
    updateDisplay();
}

function appendOperator(newOperator) {
    if (operator) {
        calculateResult();
    }
    operator = newOperator;
    previousValue = displayValue;
}

function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

function calculateResult() {
    if (operator && previousValue) {
        switch (operator) {
            case '+':
                displayValue = (parseFloat(previousValue) + parseFloat(displayValue)).toString();
                break;
            case '-':
                displayValue = (parseFloat(previousValue) - parseFloat(displayValue)).toString();
                break;
            case '*':
                displayValue = (parseFloat(previousValue) * parseFloat(displayValue)).toString();
                break;
            case '/':
                if (parseFloat(displayValue) !== 0) {
                    displayValue = (parseFloat(previousValue) / parseFloat(displayValue)).toString();
                } else {
                    displayValue = 'Error';
                }
                break;
            default:
                break;
        }
        operator = '';
        previousValue = '';
        updateDisplay();
    }
}

document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Delete' || key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

updateDisplay();

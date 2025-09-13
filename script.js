document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.current-operand');
    const previousDisplay = document.querySelector('.previous-operand');
    const buttons = document.querySelectorAll('button');
    let currentOperand = '0';
    let previousOperand = '';
    let operation = undefined;
    let resetScreen = false;

    // Add event listeners to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Add glow effect
            button.classList.add('glow');
            setTimeout(() => button.classList.remove('glow'), 500);
            
            // Handle button functionality
            if (button.classList.contains('number')) {
                appendNumber(button.textContent);
            } else if (button.classList.contains('operator')) {
                chooseOperation(button.textContent);
            } else if (button.classList.contains('equals')) {
                compute();
            } else if (button.classList.contains('clear')) {
                clear();
            } else if (button.classList.contains('delete')) {
                deleteNumber();
            }
            
            updateDisplay();
        });
    });

    function appendNumber(number) {
        if (currentOperand === '0' || resetScreen) {
            currentOperand = '';
            resetScreen = false;
        }
        
        // Handle decimal point
        if (number === '.' && currentOperand.includes('.')) return;
        
        currentOperand += number;
    }

    function chooseOperation(op) {
        if (currentOperand === '') return;
        
        if (previousOperand !== '') {
            compute();
        }
        
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    computation = 'Error';
                } else {
                    computation = prev / current;
                }
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }
        
        currentOperand = computation.toString();
        operation = undefined;
        previousOperand = '';
        resetScreen = true;
    }

    function clear() {
        currentOperand = '0';
        previousOperand = '';
        operation = undefined;
    }

    function deleteNumber() {
        currentOperand = currentOperand.toString().slice(0, -1);
        if (currentOperand === '') {
            currentOperand = '0';
        }
    }

    function updateDisplay() {
        display.textContent = currentOperand;
        if (operation != null) {
            previousDisplay.textContent = `${previousOperand} ${operation}`;
        } else {
            previousDisplay.textContent = '';
        }
    }
});
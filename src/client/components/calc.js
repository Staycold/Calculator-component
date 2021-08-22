import react from 'react'

const Calculator = () => {

    class Calculator {
        constructor(prevOpTextEl, curOpTextEl) {
            this.prevOpTextEl = prevOpTextEl
            this.curOpTextEl = curOpTextEl
            this.clear()
        }

        clear() {
            this.currentOperand = ''
            this.previousOperand = ''
            this.operation = undefined
        }

        delete() {
            this.currentOperand = this.currentOperand.toString().slice(0, -1)
        }

        appendNumber(number) {
            if (number === '.' && this.currentOperand.includes('.')) return
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }

        chooseOperation(operation){
            if (this.currentOperand === '') return
            if ( this.previousOperand !== '') {
                this.compute()
            }
            this.operation = operation
            this.previousOperand = this.currentOperand
            this.currentOperand = ''
        }

        compute() {
            let computation 
            const prev = parseFloat(this.previousOperand)
            const current = parseFloat(this.currentOperand)
            if (isNaN(prev) || isNaN(current)) return
            switch (this.operation) {
                case '+':
                    computation = prev + current
                    break
                case '-':
                    computation = prev - current
                    break
                case '*':
                    computation = prev * current
                    break
                case '/':
                    computation = prev / current
                    break
                default:
                    return
            }
            this.currentOperand = computation
            this.operation = undefined
            this.previousOperand = ''
        }

        getDisplayNumber(number) {
            const stringNumber = number.toString()
            const integerDigits = parseFloat(stringNumber.split('.')[0])
            const decimalDigits = stringNumber.split('.')[1]
            let integerDisplay 
            if (isNaN(integerDigits)){
                integerDisplay = ''
            } else {
                integerDisplay = integerDigits.toLocaleString('en', {
                    maximumFractionDigits: 0 })
            }
            if (decimalDigits != null) {
                return `${integerDisplay}.${integerDigits}`
            } else {
                return integerDisplay
            }
        }

        updateDisplay() {
            this.curOpTextEl.innerText = this.getDisplayNumber(this.currentOperand)
            if ( this.operationg != null) {
                this.prevOpTextEl.innerText =
                 `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            } else {
                this.prevOpTextEl.innerText = ''
            }          
        }

    }

    const numberButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalsButton = document.querySelectorAll('[data-equals]');
    const deleteButton = document.querySelectorAll('[data-delete]');
    const allClearButton = document.querySelectorAll('[data-all-clear]');
    const prevOpTextEl = document.querySelectorAll('[data-previous-operand]');
    const curOpTextEl = document.querySelectorAll('[data-current-operand]');

    const calculator = new Calculator( prevOpTextEl, curOpTextEl)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()

})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()

})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()

})
    

return(
<>
<div className="calculator-grid">
    <div className="output">
        <div data-previous-operand className="previous-operand"></div>
        <div data-current-operand className="current-operand"></div>
    </div>
    <button data-all-clear className="span-two">AC</button>
    <button data-delete>DEL</button>
    <button data-operation>/</button>
    <button data-number>1</button>
    <button data-number>2</button>
    <button data-number>3</button>
    <button data-operation>*</button>
    <button data-number>4</button>
    <button data-number>5</button>
    <button data-number>6</button>
    <button data-operation>+</button>
    <button data-number>7</button>
    <button data-number>8</button>
    <button data-number>9</button>
    <button data-operation>-</button>
    <button data-number>.</button>
    <button data-number>0</button>
    <button data-equals className="span-two">=</button>
</div>

</>

)

}

export default Calculator
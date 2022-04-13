class Calculator {
    constructor ( opAnterior, opAtual ) {
       this.opAnterior = opAnterior
       this.opAtual = opAtual 
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
        // o if previne que o usuário insira mais de um ponto flutuante
        if ( number === '.' && this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if ( this.currentOperand === '') return
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
            case '÷': 
                computation = prev / current
                break
            default: 
                return 
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber (number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0]) 
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('pt-br', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }  else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.opAtual.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.opAnterior.innerText =
             `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.opAnterior.innerText = ''
        }
    }
}



const previousOperand = document.querySelector('[opAnterior]')
const currentOperand = document.querySelector('[opAtual]')
const allClearButton = document.querySelector('[allClear]')
const numbersButtons = document.querySelectorAll('[numero]')
const deleteButton = document.querySelector('[delete]')
const equalButton = document.querySelector('[igual]')
const operatorsButtons = document.querySelectorAll('[operador]')

// instanciating calculator
const calculator =  new Calculator (previousOperand, currentOperand)

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
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
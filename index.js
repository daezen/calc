const operator_buttons = document.querySelectorAll('[data-operator]')
const number_buttons = document.querySelectorAll('[data-number]')
const decimal_button = document.querySelector('[data-decimal]')
const equal_button = document.querySelector('[data-equal]')
const clear_button = document.querySelector('[data-clear]')
const operation = document.querySelector('[data-last]')
const screen = document.querySelector('[data-screen]')
let isResetScreen = true
let firstOperand = ''
let isSaveAns = false
let operator = ''

function resetScreen() {
  if (isSaveAns) operation.textContent = `ans = ${screen.textContent}`
  screen.textContent = ''
  isSaveAns = false
  isResetScreen = false
}

function appendNumber(e) {
  if (e.target.dataset.number === '0' && screen.textContent === '0') return
  if (isResetScreen) resetScreen()
  screen.textContent += e.target.dataset.number
  clearButton.toggleState(false)
}

function appendDecimal() {
  if (screen.textContent.includes('.')) return
  if (isSaveAns) {
    resetScreen()
    screen.textContent = '0'
  }
  screen.textContent += '.'
  clearButton.toggleState(false)
  isResetScreen = false
}

function useAc() {
  if (isSaveAns) operation.textContent = `ans = ${screen.textContent}`
  else {
    operation.textContent = ''
  }
  screen.textContent = '0'
  firstOperand = ''
  operator = ''
  isSaveAns = false
  isResetScreen = true
  if (firstOperand) {
    clearButton.toggleState(false)
  }
}

function useCe() {
  if (screen.textContent.length === 1 || screen.textContent === '0.') {
    screen.textContent = '0'
    clearButton.toggleState(true)
    isResetScreen = true
    return
  }
  screen.textContent = screen.textContent.slice(0, -1)
}

function setOperator(e) {
  if (operator && !isResetScreen) handleEqual()
  if (!firstOperand) firstOperand = screen.textContent
  operator = e.target.dataset.operator
  operation.textContent = `${firstOperand} ${operator}`
  screen.textContent = '0'
  clearButton.toggleState(true)
  isSaveAns = false
  isResetScreen = true
}

function handleEqual() {
  if (!operator) return
  operation.textContent = `${firstOperand} ${operator} ${screen.textContent} =`
  if ((operator === '÷' && screen.textContent === '0') || screen.textContent === '0.') {
    screen.textContent = 'what'
  } else {
    screen.textContent = round(operate(firstOperand, operator, screen.textContent))
  }
  firstOperand = ''
  operator = ''
  clearButton.toggleState(true)
  isSaveAns = true
  isResetScreen = true
}

const clearButton = {
  state: 'ac',
  toggleState(ac) {
    this.state = ac ? 'ac' : 'ce'
    this.updateButton()
  },
  updateButton() {
    clear_button.dataset.clear = this.state === 'ac' ? 'ac' : 'ce'
    clear_button.textContent = this.state === 'ac' ? 'ac' : 'ce'
  },
  useCurrState() {
    if (this.state === 'ac') useAc()
    if (this.state === 'ce') useCe()
  },
}

function round(n) {
  return Math.round(n * 100) / 100
}

function operate(n1, operator, n2) {
  n1 = Number(n1)
  n2 = Number(n2)

  return operand[operator](n1, n2)
}

const operand = {
  '+': (n1, n2) => n1 + n2,
  '−': (n1, n2) => n1 - n2,
  '×': (n1, n2) => n1 * n2,
  '÷': (n1, n2) => n1 / n2,
}

operator_buttons.forEach((btn) => btn.addEventListener('click', setOperator))
number_buttons.forEach((btn) => btn.addEventListener('click', appendNumber))
clear_button.addEventListener('click', () => clearButton.useCurrState())
decimal_button.addEventListener('click', appendDecimal)
equal_button.addEventListener('click', handleEqual)

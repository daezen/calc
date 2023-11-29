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
let isAc = true

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

  toggleAc(false)
}

function appendDecimal() {
  if (screen.textContent.includes('.')) return
  screen.textContent += '.'

  toggleAc(false)
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
    toggleAc(false)
  }
}

function useCe() {
  if (screen.textContent.length === 1 || screen.textContent === '0.') {
    screen.textContent = '0'
    toggleAc(true)
    isResetScreen = true
    return
  }

  screen.textContent = screen.textContent.slice(0, -1)
}

function setOperator(e) {
  if (operator) handleEqual()

  firstOperand = screen.textContent
  operator = e.target.dataset.operator
  operation.textContent = `${firstOperand} ${operator}`
  screen.textContent = '0'
  toggleAc(true)
  isSaveAns = false
  isResetScreen = true
}

function handleEqual() {
  if (!operator) return

  operation.textContent = `${firstOperand} ${operator} ${screen.textContent} =`
  screen.textContent = round(operate(firstOperand, operator, screen.textContent))
  firstOperand = ''
  operator = ''
  toggleAc(true)
  isSaveAns = true
  isResetScreen = true
}

const toggleAc = (ac) => {
  clear_button.dataset.clear = ac ? 'ac' : 'ce'
  clear_button.textContent = ac ? 'ac' : 'ce'
  isAc = ac
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

number_buttons.forEach((button) => {
  button.addEventListener('mousedown', appendNumber)
})
operator_buttons.forEach((button) => {
  button.addEventListener('mousedown', setOperator)
})
decimal_button.addEventListener('mousedown', appendDecimal)
equal_button.addEventListener('mousedown', handleEqual)
clear_button.addEventListener('mousedown', () => {
  if (isAc) useAc()
  else useCe()
})

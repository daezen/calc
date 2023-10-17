const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operators");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".delete");
const operation = document.querySelector(".operation");
const screen = document.querySelector(".value");
screen.textContent = "0";
clear.textContent = "ac";

let resetScreen = true;
let number1 = "";
let number2 = "";
let operator = "";

function appendNumber(e) {
  if (screen.textContent == "0" || resetScreen) emptyScreen();
  screen.textContent += e.target.textContent;
  acSwitch();
}

function emptyScreen() {
  resetScreen = false;
  screen.textContent = "";
}

function appendDecimal(e) {
  if (screen.textContent.includes(".")) return;
  screen.textContent += e.target.textContent;
  resetScreen = false;
  acSwitch();
}

function removeLast() {
  if (screen.textContent.length === 1 || screen.textContent == "0.") {
    screen.textContent = "0";
    resetScreen = true;
    return acSwitch();
  }
  screen.textContent = screen.textContent.slice(0, -1);
}

function clean() {
  if (resetScreen) return;
  operation.textContent = `ans = ${screen.textContent}`;
  screen.textContent = "0";
  acSwitch();
  number1 = "";
  number2 = "";
  operator = "";
}

function acSwitch() {
  if (resetScreen) {
    clear.textContent = "ac";
    clear.removeEventListener("click", removeLast);
    clear.addEventListener("click", clean);
    return;
  } else if (resetScreen === false) {
    clear.textContent = "ce";
    clear.removeEventListener("click", clean);
    clear.addEventListener("click", removeLast);
    return;
  }
}

function setOperator(e) {
  if (operator !== "") evaluate();
  number1 = screen.textContent;
  operator = e.target.textContent;
  resetScreen = true;
  operation.textContent = `${number1} ${operator}`;
}

function round(numberToRound) {
  return Math.round(numberToRound * 1000) / 1000;
}

function evaluate() {
  if (operator == "" || resetScreen) return;
  if (operator == "÷" && screen.textContent == "0") {
    resetScreen = true;
    acSwitch();
    return (screen.textContent = "dumbass");
  }
  number2 = screen.textContent;
  screen.textContent = round(operate(number1, operator, number2));
  operation.textContent = `${number1} ${operator} ${number2} =`;
  operator = "";
  resetScreen = true;
  acSwitch();
}

function operate(n1, operator, n2) {
  n1 = Number(number1);
  n2 = Number(number2);
  if (operator === "+") {
    return add(n1, n2);
  } else if (operator === "−") {
    return substract(n1, n2);
  } else if (operator === "×") {
    return multiply(n1, n2);
  } else if (operator === "÷") {
    return divide(n1, n2);
  }
}
function add(n1, n2) {
  return n1 + n2;
}
function substract(n1, n2) {
  return n1 - n2;
}
function multiply(n1, n2) {
  return n1 * n2;
}
function divide(n1, n2) {
  return n1 / n2;
}

equals.addEventListener("click", evaluate);
decimal.addEventListener("click", (e) => appendDecimal(e));
clear.addEventListener("click", clean);
numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", (e) => appendNumber(e));
});
operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (e) => setOperator(e));
});

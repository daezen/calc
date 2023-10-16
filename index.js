const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operators");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".delete");
const screenValue = document.querySelector(".value");
screenValue.textContent = "0";

let resetScreen = false;
let number1 = "";
let number2 = "";
let operator = "";

function screen(e) {
  if (screenValue.textContent == "0" || resetScreen) emptyScreen();
  screenValue.textContent += e.target.textContent;
}

function emptyScreen() {
  resetScreen = false;
  screenValue.textContent = "";
}

function addDecimal(e) {
  if (screenValue.textContent.includes(".")) return;
  screenValue.textContent += e.target.textContent;
  resetScreen = false;
}

function removeLastCharacter() {
  if (screenValue.textContent == "0") return;
  else if (screenValue.textContent.length === 1) {
    return (screenValue.textContent = "0");
  }
  screenValue.textContent = screenValue.textContent.slice(0, -1);
}

function clean() {
  screenValue.textContent = "0";
  number1 = "";
  number2 = "";
  operator = "";
  resetScreen = false;
}

function setOperator(e) {
  if (operator !== "") evaluate();
  number1 = screenValue.textContent;
  operator = e.target.textContent;
  resetScreen = true;
}

function evaluate() {
  if (operator == "" || resetScreen) return;
  number2 = screenValue.textContent;
  screenValue.textContent = operate(number1, operator, number2);
  operator = "";
}

function operate(n1, operator, n2) {
  n1 = Number(number1);
  n2 = Number(number2);
  if (operator === "+") {
    return add(n1, n2);
  } else if (operator === "-") {
    return substract(n1, n2);
  } else if (operator === "x") {
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

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", (e) => screen(e));
});
operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (e) => setOperator(e));
});
equals.addEventListener("click", evaluate);
decimal.addEventListener("click", (e) => addDecimal(e));
clear.addEventListener("click", clean);
backspace.addEventListener("click", removeLastCharacter);

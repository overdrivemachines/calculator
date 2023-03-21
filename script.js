const displayResult = document.getElementById("display-result"); // calculatorDisplay
const displayExpression = document.getElementById("display-expression");
const inputBtns = document.querySelectorAll("button"); // NodeList of all buttons
const clearBtn = document.getElementById("clear-btn");
const signBtn = document.getElementById("sign-btn");

// Calculate first and second values depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    displayResult.textContent = number;
    awaitingNextValue = false;
  } else {
    // if the current display value is 0, replace it otherwise append the number
    const displayValue = displayResult.textContent;
    displayResult.textContent = displayValue == "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // if operator pressed, don't add decimal
  if (awaitingNextValue) return;
  // If no decimal, add one
  if (!displayResult.textContent.includes(".")) {
    displayResult.textContent += ".";
  }
}

function useOperator(operator) {
  const currentValue = Number(displayResult.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    displayExpression.textContent = `${firstValue}${operator}`;
    return;
  }
  if (operator == "sign") {
    displayResult.textContent = currentValue * -1;
    return;
  }
  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
    displayExpression.textContent = `${firstValue}${operator}`;

    if (operator == "%") {
      firstValue *= 0.01;
      displayResult.textContent = firstValue;
    }
  } else {
    console.log(firstValue, operatorValue, currentValue);
    if (operator == "=") {
      displayExpression.textContent = `${firstValue}${operatorValue}${currentValue}`;
    }
    const calculation = calculate[operatorValue](firstValue, currentValue);
    console.log("calculation: ", calculation);
    firstValue = calculation;
    displayResult.textContent = firstValue;

    if (operator == "%") {
      displayExpression.textContent = `${firstValue}${operator}`;
      firstValue *= 0.01;
      displayResult.textContent = firstValue;
    } else if (operator != "=") {
      displayExpression.textContent = `${firstValue}${operator}`;
    }
  }
  // Ready for the next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset all values, Display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  displayResult.textContent = "0";
  displayExpression.textContent = "";
}

// Add Event Listeners for buttons
clearBtn.addEventListener("click", resetAll);
inputBtns.forEach((inputButton) => {
  if (inputButton.classList.length == 0 || inputButton.classList.contains("zero")) {
    inputButton.addEventListener("click", () => sendNumberValue(inputButton.value));
  } else if (inputButton.classList.contains("operator1") || inputButton.classList.contains("operator2")) {
    inputButton.addEventListener("click", () => useOperator(inputButton.value));
  } else if (inputButton.classList.contains("decimal")) {
    inputButton.addEventListener("click", () => addDecimal());
  }
});

// 5632+355

// When keys are pressed
document.addEventListener("keydown", function (event) {
  const num = Number(event.key);
  // console.log("Pressed:", event.key);
  // console.log("num:", num);
  if (!isNaN(num)) {
    sendNumberValue(num);
  } else if (event.key == ".") {
    addDecimal();
  } else if (event.key == "/" || event.key == "*" || event.key == "-" || event.key == "+") {
    useOperator(event.key);
  } else if (event.key == "Enter" || event.key == "=") {
    useOperator("=");
  } else if (event.key == "Backspace") {
    // if (awaitingNextValue) return;
    // if (Number(displayResult.textContent) != 0) {
    //   displayResult.textContent = displayResult.textContent.substring(0, displayResult.length - 1);
    // }
  } else {
    console.log(event.key);
  }
});

const displayResult = document.getElementById("display-result"); // calculatorDisplay
const displayExpression = document.getElementById("display-expression");
const inputBtns = document.querySelectorAll("button"); // NodeList of all buttons
const clearBtn = document.getElementById("clear-btn");
const signBtn = document.getElementById("sign-btn");

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
  if (operator == "sign") {
    displayResult.textContent = currentValue * -1;
    return;
  }
  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    console.log("Current Value", currentValue);
  }
  // Ready for the next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;

  displayExpression.textContent = `${firstValue}${operatorValue}`;

  console.log("First Value:", firstValue);
  console.log("Operator:", operatorValue);
}

// Add Event Listeners for buttons
inputBtns.forEach((inputButton) => {
  if (inputButton.classList.length == 0 || inputButton.classList.contains("zero")) {
    inputButton.addEventListener("click", () => sendNumberValue(inputButton.value));
  } else if (inputButton.classList.contains("operator1") || inputButton.classList.contains("operator2")) {
    inputButton.addEventListener("click", () => useOperator(inputButton.value));
  } else if (inputButton.classList.contains("decimal")) {
    inputButton.addEventListener("click", () => addDecimal());
  }
});

// Reset all values, Display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  displayResult.textContent = "0";
  displayExpression.textContent = "";
}

clearBtn.addEventListener("click", resetAll);

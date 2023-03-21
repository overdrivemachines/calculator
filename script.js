const displayResult = document.getElementById("display-result"); // calculatorDisplay
const displayExpression = document.getElementById("display-expression");
const inputBtns = document.querySelectorAll("button"); // NodeList of all buttons
const clearBtn = document.getElementById("clear-btn");
const signBtn = document.getElementById("sign-btn");

function sendNumberValue(number) {
  // if the current display value is 0, replace it otherwise append the number
  const displayValue = displayResult.textContent;
  displayResult.textContent = displayValue == "0" ? number : displayValue + number;
}

// Add Event Listeners for buttons
inputBtns.forEach((inputButton) => {
  if (inputButton.classList.length == 0 || inputButton.classList.contains("zero")) {
    inputButton.addEventListener("click", () => sendNumberValue(inputButton.value));
  } else if (inputButton.classList.contains("operator1") || inputButton.classList.contains("operator2")) {
    inputButton.addEventListener("click", () => sendNumberValue(inputButton.value));
  } else if (inputButton.classList.contains("decimal")) {
    inputButton.addEventListener("click", () => sendNumberValue("."));
  }
});

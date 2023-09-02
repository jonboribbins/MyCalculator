// Get DOM elements
const display = document.getElementById("display");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");

const numberBtns = document.querySelectorAll(".btn:not(#clear):not(#equals)");
const operatorBtns = document.querySelectorAll(".btn[id^='add'], .btn[id^='subtract'], .btn[id^='multiply'], .btn[id^='divide']");
const decimalBtn = document.getElementById("decimal");

let currentValue = "";
let prevValue = "";
let operator = "";

// Helper function to update the display
function updateDisplay() {
    display.textContent = currentValue;
}

// Event listeners for number buttons
numberBtns.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentValue.length < 12) {
            currentValue += button.textContent;
            updateDisplay();
        }
    });
});

// Event listener for operator buttons
operatorBtns.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentValue !== "") {
            prevValue = currentValue;
            operator = button.textContent;
            currentValue = "";
        }
    });
});

// Event listener for decimal button
decimalBtn.addEventListener("click", () => {
    if (!currentValue.includes(".") && currentValue.length < 11) {
        currentValue += ".";
        updateDisplay();
    }
});

// Event listener for equals button
equalsBtn.addEventListener("click", () => {
    if (prevValue !== "" && operator !== "") {
        switch (operator) {
            case "+":
                currentValue = (parseFloat(prevValue) + parseFloat(currentValue)).toString();
                break;
            case "-":
                currentValue = (parseFloat(prevValue) - parseFloat(currentValue)).toString();
                break;
            case "*":
                currentValue = (parseFloat(prevValue) * parseFloat(currentValue)).toString();
                break;
            case "/":
                if (currentValue !== "0") {
                    currentValue = (parseFloat(prevValue) / parseFloat(currentValue)).toString();
                } else {
                    currentValue = "Error";
                }
                break;
        }
        operator = "";
        prevValue = "";
        updateDisplay();
    }
});

// Event listener for clear button
clearBtn.addEventListener("click", () => {
    currentValue = "";
    prevValue = "";
    operator = "";
    updateDisplay();
});

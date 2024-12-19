let operation;
let number1;
let number2;
let signCounter = 0;
let result;

const buttons = document.getElementById("buttons-field");

buttons.addEventListener("click", (event) => {
  let target = event.target.innerHTML;
  if (
    target === "+" ||
    target === "-" ||
    target === "×" ||
    target === ":" ||
    target === "%"
  ) {
    setOperation(target);
    return;
  }
  if (target === "CE") {
    clearArea();
    return;
  }
  if (target === "⇦") {
    deleteOne();
    return;
  }
  if ((target >= 0 && target <= 9) || target === ".") {
    addSymbol(target);
  }
});

function calculateResult() {
  if (signCounter != 0) {
    number2 = Number(document.getElementById("calculator-input").value);
  }
  if (number1 === undefined || number2 === undefined) {
    return;
  }

  number1 = Number(number1);
  console.log("1", number1);
  console.log("2", number2);
  console.log("2", operation);

  switch (operation) {
    case "+":
      result = number1 + number2;
      break;
    case "-":
      result = number1 - number2;
      break;
    case "×":
      result = number1 * number2;
      break;
    case ":":
      result = number1 / number2;
      break;
    case "%":
      result = number1 % number2;
      break;
  }

  let screenResult = result;

  if (
    (Math.abs(result) > 1 * 10 ** 10 || Math.abs(result) < 1 * 10 ** -4) &&
    result != 0
  ) {
    result = result.toExponential();
    screenResult = screenResult.toExponential();

    if (result.length > 12) {
      let newResult = "";
      screenResult = screenResult.split("e");

      for (let i = 0; i < 13 - screenResult[1].length; i++) {
        newResult = newResult + screenResult[0][i];
      }
      screenResult = newResult + "e" + screenResult[1];
    }
  } else {
    if (
      ((Math.abs(result) < 1 && Math.abs(result) >= 1 * 10 ** -4) ||
        (Math.abs(result) > 1 && !Number.isInteger(result))) &&
      result != 0
    ) {
      result = result.toFixed(14);
      result = +result;
      screenResult = result.toFixed(11);
      screenResult = +screenResult;
    }
  }

  document.getElementById("previous-operation").innerHTML =
    number1 + operation + number2;
  document.getElementById("calculator-input").value = screenResult;
  number1 = result;
  signCounter = 0;
  console.log("4", result);
}

function setOperation(sign) {
  let input = document.getElementById("calculator-input");

  if (signCounter < 1) {
    operation = sign;
    number1 = input.value;
    document.getElementById("previous-operation").innerHTML = number1 + sign;
    input.value = number1;
    signCounter++;
  } else {
    if (input.value == number1) {
      operation = sign;
      document.getElementById("previous-operation").innerHTML = number1 + sign;
    } else {
      calculateResult();
      signCounter++;
      operation = sign;
      document.getElementById("previous-operation").innerHTML = number1 + sign;
      input.value = number1;
    }
  }
}

function clearArea() {
  let input = document.getElementById("calculator-input");
  input.value = "0";
}

function deleteOne() {
  let input = document.getElementById("calculator-input");
  if (input.value.length === 1) {
    input.value = "0";
    return;
  }

  let currentValue = [...input.value];

  if (currentValue[0] === "+" || currentValue[0] === "-") {
    signCounter--;
  }
  currentValue.pop();
  input.value = currentValue.join("");
}

function addSymbol(symbol) {
  let input = document.getElementById("calculator-input");

  if (input.value != number1) {
    if (symbol === "." && input.value.includes(".")) {
      return;
    }
    if (input.value === "0" && symbol !== ".") {
      input.value = symbol;
      return;
    }

    input.value = input.value + symbol;
  } else {
    if (symbol === ".") {
      input.value = "0.";
      return;
    }
    input.value = symbol;
  }
  input.scrollLeft = input.scrollWidth;
}

function clearAll() {
  operation = undefined;
  number1 = undefined;
  number2 = undefined;
  signCounter = 0;
  result = undefined;
  document.getElementById("previous-operation").innerHTML = "";
  document.getElementById("calculator-input").value = "0";
}

function inputFocus() {
  document.getElementById("calculator-input").focus();
}

function inputValidation(event) {
  let currentValue = event.key;
  let element;
  if ((currentValue >= 0 && currentValue <= 9) || currentValue === ".") {
    switch (currentValue) {
      case "1":
        element = document.getElementById("one");
        break;
      case "2":
        element = document.getElementById("two");
        break;
      case "3":
        element = document.getElementById("three");
        break;
      case "4":
        element = document.getElementById("four");
        break;
      case "5":
        element = document.getElementById("five");
        break;
      case "6":
        element = document.getElementById("six");
        break;
      case "7":
        element = document.getElementById("seven");
        break;
      case "8":
        element = document.getElementById("eight");
        break;
      case "9":
        element = document.getElementById("nine");
        break;
      case "0":
        element = document.getElementById("zero");
        break;
      case ".":
        element = document.getElementById("point");
        break;
    }

    element.style.background = "#3a3f50";
    element.style.borderColor = "#3a3f50";

    setTimeout(() => {
      element.style.background = "#333438";
      element.style.borderColor = "black";
    }, 250);

    addSymbol(element.innerHTML);
    return false;
  }

  if (currentValue === "=") {
    element = document.getElementById("equals");

    element.style.background = "#b9d4ff";
    element.style.borderColor = "#b9d4ff";

    setTimeout(() => {
      element.style.background = "#a8c7fa";
      element.style.borderColor = "black";
    }, 250);

    calculateResult();

    return false;
  }

  if (
    currentValue === "*" ||
    currentValue === ":" ||
    currentValue === "+" ||
    currentValue === "-" ||
    currentValue === "/" ||
    currentValue === "%"
  ) {
    switch (currentValue) {
      case "*":
        element = document.getElementById("times");
        break;
      case ":":
        element = document.getElementById("divide");
        break;
      case "/":
        element = document.getElementById("divide");
        break;
      case "+":
        element = document.getElementById("plus");
        break;
      case "-":
        element = document.getElementById("minus");
        break;
      case "%":
        element = document.getElementById("remainder-of-division");
        break;
    }

    element.style.background = "#3a3f50";
    element.style.borderColor = "#3a3f50";

    setTimeout(() => {
      element.style.background = "#2c303d";
      element.style.borderColor = "black";
    }, 250);

    setOperation(element.innerHTML);
    return false;
  }

  if (currentValue === "Backspace") {
    element = document.getElementById("deleteOne");
    element.style.background = "#3a3f50";
    element.style.borderColor = "#3a3f50";

    deleteOne();

    setTimeout(() => {
      element.style.background = "#2c303d";
      element.style.borderColor = "black";
    }, 250);
  }
  return false;
}

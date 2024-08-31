const keys = document.querySelectorAll(".key");
const displayInput = document.querySelector(".display .input");
const displayOutput = document.querySelector(".display .output");

let inputValue = "";

keys.forEach((key) => {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value === "clear") {
      inputValue = "";
      displayInput.innerHTML = "";
      displayOutput.innerHTML = "";
    } else if (value === "backspace") {
      inputValue = inputValue.slice(0, -1);
      displayInput.innerHTML = cleanInput(inputValue);
    } else if (value === "=") {
      try {
        const result = eval(prepareInput(inputValue));
        displayOutput.innerHTML = cleanOutput(result);
      } catch {
        displayOutput.innerHTML = "Erreur";
      }
    } else if (value === "brackets") {
      const openBrackets = (inputValue.match(/\(/g) || []).length;
      const closeBrackets = (inputValue.match(/\)/g) || []).length;

      if (
        openBrackets === closeBrackets ||
        inputValue.endsWith("(") ||
        !inputValue.includes("(")
      ) {
        inputValue += "(";
      } else {
        inputValue += ")";
      }
      displayInput.innerHTML = cleanInput(inputValue);
    } else {
      if (value === ".") {
        const lastSegment = inputValue.split(/[\+\-\*\/\(\)]/).pop();
        if (lastSegment.includes(".")) {
          return;
        }
      }

      const lastChar = inputValue.slice(-1);
      const operators = ["+", "-", "*", "/"];

      if (!(operators.includes(value) && operators.includes(lastChar))) {
        inputValue += value;
        displayInput.innerHTML = cleanInput(inputValue);
      }
    }
  });
});

function cleanInput(input) {
  let input_array = input.split("");
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == "*") {
      input_array[i] = `<span class="operator">x</span>`;
    } else if (input_array[i] == "+") {
      input_array[i] = `<span class="operator">+</span>`;
    } else if (input_array[i] == "-") {
      input_array[i] = `<span class="operator">-</span>`;
    } else if (input_array[i] == "/") {
      input_array[i] = `<span class="operator">÷</span>`;
    } else if (input_array[i] == "%") {
      input_array[i] = `<span class="percent">%</span>`;
    } else if (input_array[i] == "(") {
      input_array[i] = `<span class="brackets">(</span>`;
    } else if (input_array[i] == ")") {
      input_array[i] = `<span class="brackets">)</span>`;
    }
  }
  return input_array.join("");
}

function cleanOutput(output) {
  let output_string = output.toString();
  let decimal = output_string.split(".")[1];
  output_string = output_string.split(".")[0];

  let output_array = output_string.split("");

  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ",");
    }
  }

  if (decimal) {
    output_array.push(".");
    output_array.push(decimal);
  }

  return output_array.join("");
}

function ValidateInput(value) {
  const last_input = inputValue.slice(-1);
  const operators = ["+", "-", "*", "/"];

  if (value === "." && last_input === ".") {
    return false;
  }

  if (operators.includes(value) && operators.includes(last_input)) {
    return false;
  }

  return true;
}

function prepareInput(inputValue) {
  return inputValue.replace(/%/g, "/100");
}

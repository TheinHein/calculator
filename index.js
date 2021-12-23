const calculator = {
  operators: ["+", "-", "*", "/"],
  numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
};

const stored = {
  temp: "",
  operator: "",
  operand1: "",
  operand2: "",
  solution: "",
};

const generateOperand = (number) => {
  if (!calculator.numbers.includes(number)) return stored.temp;
  if (stored.temp.length > 10) return stored.temp;
  if (number === "0" && !stored.temp) return 0;
  if (number === "." && stored.temp.includes(".")) return stored.temp;
  stored.temp = stored.temp + number;
  if (stored.temp[0] === ".") {
    stored.temp = stored.temp.replace(stored.temp[0], "0.");
  }
  return stored.temp;
};

const generateOperator = (operator) => {
  if (calculator.operators.includes(operator)) {
    if (stored.operand1 === "") {
      if (stored.solution !== "") {
        stored.operator = operator;
        stored.operand1 = stored.solution;
      }
      if (stored.solution === "") {
        stored.operator = operator;
        stored.operand1 = stored.temp;
        stored.temp = "";
      }
    }
    if (stored.operand1 !== "") {
      stored.operand2 = stored.temp;
      stored.temp = "";
    }
    if (stored.operator !== "" && stored.operand2 !== "") {
      stored.solution = operate(
        stored.operand1,
        stored.operator,
        stored.operand2
      );
      stored.operand1 = stored.solution;
      stored.operand2 = "";
      stored.operator = operator;
    }
  }
  return stored.solution;
};

const add = (x, y) => {
  return x + y;
};
const subtract = (x, y) => {
  return x - y;
};
const multiply = (x, y) => {
  return x * y;
};
const divide = (x, y) => {
  return x / y;
};
const roundedDecimal = (x) => {
  return Math.round((x + Number.EPSILON) * 100) / 100;
};
const operate = (x, method, y) => {
  x = Number(x);
  y = Number(y);

  switch (method) {
    case "+":
      return roundedDecimal(add(x, y));
    case "-":
      return roundedDecimal(subtract(x, y));
    case "*":
      return roundedDecimal(multiply(x, y));
    case "/":
      return roundedDecimal(divide(x, y));
  }
};

const equalTo = (number) => {
  if (!stored.operand1 && !stored.operand2 && !stored.operator)
    return stored.solution !== "" ? stored.solution : stored.temp;
  if (number === "=") {
    stored.operand2 = stored.temp;
    stored.temp = "";
  }
  stored.solution = operate(stored.operand1, stored.operator, stored.operand2);
  stored.operand1 = "";
  stored.operand2 = "";
  stored.operator = "";

  return stored.solution;
};
const clearAll = () => {
  stored.temp = "";
  stored.operator = "";
  stored.operand1 = "";
  stored.operand2 = "";
  stored.solution = "";
};
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const key = e.target.dataset.key;
    const isNum = /^\d+|.$/.test(key);
    if (isNum) {
      display.textContent = generateOperand(key);
    }
    if (calculator.operators.includes(key)) {
      generateOperator(key);
      display.textContent = stored.operand1;
    }
    if (key === "=") {
      display.textContent = equalTo(key);
    }
    if (key === "C") {
      clearAll();
      display.textContent = "0";
    }
    if (key === "plus-minus" && stored.temp !== "") {
      if (stored.temp[0] === "-") return;
      stored.temp = "-" + stored.temp;
      display.textContent = stored.temp;
    }
    if (key === "%") {
      if (stored.operator === "") {
        stored.temp = stored.temp / 100;
        display.textContent = stored.temp;
      }
      if (stored.operator !== "") {
        stored.operand2 = stored.temp / 100;
        display.textContent = stored.operand2;
        stored.solution = operate(
          stored.operand1,
          stored.operator,
          stored.operand2
        );
      }
    }
    console.log(stored);
  });
});

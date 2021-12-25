const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");
const buttons = document.querySelectorAll("button");
const operatorBtns = document.querySelectorAll(".operator");
const operators = ["+", "-", "*", "/"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const data = {
  temp: "",
  operand1: "",
  operand2: "",
  operator: "",
  solution: "",
};
function reduceFS() {
  if (display.textContent.length > 8) {
    display.classList.add("reduceFS-1");
  } else {
    display.classList.remove("reduceFS-1");
  }
  if (display.textContent.length > 11) {
    display.classList.add("reduceFS-2");
  } else {
    display.classList.remove("reduceFS-2");
  }
}
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const key = e.target.dataset.key;
    handle(key);
    toggleActive();
    reduceFS();
  });
});
clearBtn.addEventListener("click", () => clear());

function handle(key) {
  const isNum = numbers.includes(key);
  const isOperator = operators.includes(key);

  //********* Finished *********/
  if (isNum) {
    display.textContent = makeOperand(key);
  }
  if (key === ".") {
    display.textContent = addDecimal(data.temp);
  }
  if (key === "plus-minus") {
    display.textContent = flip(data.temp);
  }
  if (isOperator) {
    storeOperand();
    display.textContent = assignOperator(key);
  }
  if (key === "%") {
    storeOperand();
    display.textContent = makePercentage(
      data.operand1,
      data.operator,
      data.operand2
    );
  }

  if (key === "=") {
    display.textContent = equalTo();
  }
  if (key === "del") {
    data.temp = data.temp.replace(data.temp[data.temp.length - 1], "");
    display.textContent = data.temp;
  }
}
function equalTo() {
  storeOperand();
  assignOperator(data.operator);
  return data.solution;
}

function storeOperand() {
  if (!data.operand1) {
    data.operand1 = data.temp;
    data.temp = "";
    return data.operand1;
  }
  if (!data.operand2) {
    data.operand2 = data.temp;
    data.temp = "";
    return data.operand2;
  }
}
function addDecimal() {
  data.temp = data.temp.toString();
  if (data.temp.includes(".")) return data.temp;
  if (!data.temp) return (data.temp = data.temp + "0.");
  return (data.temp = data.temp + ".");
}
function flip(x) {
  if (!data.temp) return (data.temp = "-0");
  if (data.temp === "0.") return (data.temp = "-0.");
  return (data.temp = -x);
}
function clear() {
  data.temp = "";
  data.operand1 = "";
  data.operand2 = "";
  data.operator = "";
  data.solution = "";
  display.textContent = "0";
}
function makeOperand(x) {
  if (x === "0" && !data.temp) return (display.textContent = "0");
  if (data.temp === "-0") {
    data.temp = data.temp.replace(data.temp[1], "");
  }
  return (data.temp = data.temp + x);
}
function assignOperator(x) {
  if (!data.operand1) return;
  if (data.operand1) data.solution = data.operand1;
  if (data.operand2) {
    data.solution = operate(data.operand1, data.operator, data.operand2);
    data.operand1 = data.solution;
    data.operand2 = "";
  }
  data.operator = x;
  return data.solution;
}
function makePercentage(x = data.temp, sign, y) {
  //**temp fix */
  if (display.textContent === data.solution) {
    data.operand2 = "";
    data.operand1 = Number(display.textContent) / 100;
    return (data.solution = data.operand1);
  }
  //**temp fix */
  if (data.operand1 && data.operator) {
    y = (x * y) / 100;
    return (data.solution = operate(x, sign, y));
  }
  return (data.operand1 = x / 100);
}
function operate(x, sign, y) {
  x = Number(x);
  y = Number(y);
  switch (sign) {
    case "+":
      return round(x + y);
    case "-":
      return round(x - y);
    case "*":
      return round(x * y);
    case "/":
      return round(x / y);
  }
}
const round = (x) => {
  return x;
};
function toggleActive() {
  for (let i = 0; i < operatorBtns.length; i++) {
    if (operatorBtns[i].dataset.key === data.operator) {
      operatorBtns[i].classList.add("active");
    } else {
      operatorBtns[i].classList.remove("active");
    }
  }
}

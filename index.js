const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const key = e.target.dataset.key;
    store(key, e);
    console.table(data);
  });
});

const operators = ["+", "-", "*", "/", "=", "%"];
const numbers = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const data = { temp: "", firstNum: "", secondNum: "", operator: "" };

const store = (key, e) => {
  const isNum = numbers.includes(key);
  const isOperator = operators.includes(key);
  if (isNum) {
    storeTemp(key);
    display.textContent = data.temp || "0";
  }
  if (isOperator) {
    assign(key);
    if (!data.solution) {
      display.textContent = data.firstNum;
    } else {
      display.textContent = data.solution;
    }
  }
  if (key === "C") {
    clear();
    display.textContent = "0";
    e.target.dataset.key = "AC";
    e.target.textContent = "AC";
  }
  if (key === "AC") {
    clearAll();
    display.textContent = "0";
    if (data.firstNum !== "") {
      e.target.dataset.key = "C";
      e.target.textContent = "C";
    }
  }
  if (key === "%") {
    display.textContent = data.secondNum;
  }
  if (key === "plus-minus") {
    toggle();
  }
};

const storeTemp = (key) => {
  if (data.temp.length < 11) {
    if (key === "0" && !data.temp) return data.temp;
    if (key === "." && data.temp.includes(".")) return data.temp;
    if (key === "." && !data.temp) return (data.temp = "0.");
    return (data.temp = data.temp + key);
  }
};

const assign = (key) => {
  if (key === "%") {
    if (data.firstNum === "") {
      data.solution = calculate(data.temp, "%");
      data.firstNum = data.solution;
    }
    if (data.firstNum && data.operator) {
      data.solution = calculate(data.firstNum, "%%", data.temp);
      data.secondNum = data.solution;
      data.temp = "";
    }
    data.solution = "";
    return data.operator;
  }
  if (key === "=") {
    if (data.firstNum && data.secondNum && data.operator) {
      data.solution = calculate(data.firstNum, data.operator, data.secondNum);
      data.firstNum = data.solution;
      data.secondNum = "";
    } else if (!data.secondNum) {
      if (!data.solution)
        return (data.solution = calculate(
          data.firstNum,
          data.operator,
          data.firstNum
        ));
      data.solution = calculate(data.firstNum, data.operator, data.solution);
    }
  }
  if (data.operator === "") {
    data.operator = key;
  }
  if (data.firstNum && data.operator && key !== "=") {
    data.operator = key;
  }
  if (data.firstNum === "") {
    data.firstNum = data.temp;
  } else {
    data.secondNum = data.temp;
  }
  data.temp = "";
  if (data.firstNum && data.secondNum && data.operator) {
    data.solution = calculate(data.firstNum, data.operator, data.secondNum);
    data.firstNum = data.solution;
    data.secondNum = "";
    data.operator = key;
  }
};

const calculate = (x, operator, y) => {
  x = Number(x);
  y = Number(y);
  switch (operator) {
    case "+":
      return round(x + y);
    case "-":
      return round(x - y);
    case "*":
      return round(x * y);
    case "/":
      return round(x / y);
    case "%":
      return x / 100;
    case "%%":
      return (x * y) / 100;
  }
};

const round = (x) => {
  return Math.round((x + Number.EPSILON) * 100) / 100;
};

const clear = () => {
  data.firstNum = data.solution;
  data.secondNum = "";
  data.temp = "";
  data.solution = "";
};

const clearAll = () => {
  data.firstNum = "";
  data.secondNum = "";
  data.operator = "";
  data.temp = "";
  data.solution = "";
};

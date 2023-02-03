const previuos = document.getElementById("previous").firstElementChild;
const result = document.getElementById("result").lastElementChild;
const backspace = document.getElementById("backspace");
const enter = document.getElementById("enter");
const dlt = document.getElementById("delete");

const nums = [...document.querySelectorAll(".num")];
const oprs = [...document.querySelectorAll(".oprs")];

let isResult = false;

function returnResult(key) {
  let value = previuos.innerHTML.slice(0, -2);
  let sumResult = eval(`${value} ${key} ${result.innerHTML}`);
  previuos.innerHTML = "";
  sumResult % 1 !== 0
    ? (result.innerHTML = sumResult.toFixed(2))
    : (result.innerHTML = sumResult);
  isResult = true;
  return;
}

function handleInputBackscape(e) {
  if (e.code === "Backspace") {
    if (result.innerHTML.length > 1) {
      let backspace = result.innerHTML.slice(0, -1);
      result.innerHTML = backspace;
    } else result.innerHTML = 0;
  } else return;
}

function handleInputTypeNumber(key) {
  if (isResult === true) {
    result.innerHTML = key;
    isResult = false;
  } else {
    if (result.innerHTML === "0") {
      if (+key === 0) return;
      else result.innerHTML = key;
    } else {
      if (result.innerHTML.length < 10) result.innerHTML += key;
    }
  }
  return;
}

function handleInputTypeOperator(key) {
  if (isResult === true && key === ",") {
    result.innerHTML = "0.";
    isResult = false;
  } else {
    if (previuos.innerHTML === "" && key !== "Enter") {
      if (key === "," && !result.innerHTML.includes("."))
        result.innerHTML = `${result.innerHTML}.`;
      else {
        if (key === ",") return;
        else previuos.innerHTML = `${result.innerHTML} ${key}`;
        result.innerHTML = 0;
      }
    } else {
      if (key === "," && !result.innerHTML.includes("."))
        result.innerHTML = `${result.innerHTML}.`;
      else {
        if (key === "," || result.innerHTML.slice(-1) === ".") return;
        else if (key === "Enter") returnResult(previuos.innerHTML.slice(-1));
        else return;
      }
    }
  }
}

function handleInput(e) {
  const operators = [13, 37, 42, 43, 44, 45, 47];

  if (e.charCode > 47 && e.charCode < 58) handleInputTypeNumber(e.key);
  else if (operators.includes(e.charCode)) handleInputTypeOperator(e.key);

  return;
}

document.addEventListener("keypress", handleInput);
document.addEventListener("keydown", handleInputBackscape);
nums.forEach((num) => {
  num.addEventListener("click", (e) => {
    handleInputTypeNumber(e.target.innerHTML);
  });
});
oprs.forEach((op) => {
  op.addEventListener("click", (e) => {
    handleInputTypeOperator(e.target.innerHTML);
  });
});
enter.addEventListener("click", () => {
  handleInputTypeOperator("Enter");
});
backspace.addEventListener("click", () => {
  if (result.innerHTML.length > 1) {
    let backspace = result.innerHTML.slice(0, -1);
    result.innerHTML = backspace;
  } else result.innerHTML = 0;
});
dlt.addEventListener("click", () => {
  previuos.innerHTML = "";
  result.innerHTML = 0;
});

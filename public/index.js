import * as selector from "./selectors.js";

// Result Bar
const resultBar = document.querySelector(".result");
const logsBar = document.querySelector(".logs");
let result = 0,
  record = [],
  aOps = [],
  equaled = false,
  isSign = false;

// Numbers Event Listeners
for (const key in selector.btns) {
  selector.btns[key].addEventListener("click", buttonHandler);
}

selector.clearBtn.addEventListener("click", () => {
  logsBar.innerHTML = "";
  resultBar.innerHTML = "";
  record = [];
  aOps = [];
  isSign = false;
  result = 0;
});

selector.backspaceBtn.addEventListener("click", () => {
  if (!resultBar.innerText) return;
  let tempArr = resultBar.innerText.split("");
  tempArr.pop();
  resultBar.innerText = tempArr.join("");
});

// Arithmatic Operations
for (const key in selector.operations) {
  selector.operations[key].addEventListener("click", function (e) {
    if (equaled) {
      aOps = [e.target.innerText];
      logsBar.innerText = record[0] + e.target.innerText;
      console.log(record, aOps);
    }
    // Return If NO number is entered or just Dot is entered
    if (!isSign && (!result || result == ".")) return;

    // If Previous Button was Arithmatic Operation
    if (isSign) {
      aOps[aOps.length - 1] = e.target.innerHTML;
      let tempArr = logsBar.innerText.split("");
      tempArr[tempArr.length - 1] = e.target.innerHTML;
      logsBar.innerText = tempArr.join("");
      return;
    }

    // If Previous Button was a number
    record.push(result);
    aOps.push(e.target.innerHTML);
    logsBar.innerText += e.target.innerText;
    result = 0;
    isSign = true;
  });
}

selector.equalBtn.addEventListener("click", () => {
  record.push(result);
  result = 0;
  console.log(record, aOps);

  for (let i = 0; i < record.length; i++) {
    switch (aOps[i]) {
      case "+": {
        record[i + 1] = Number(record[i]) + Number(record[i + 1]);
        break;
      }
      case "-": {
        record[i + 1] = Number(record[i]) - Number(record[i + 1]);
        break;
      }
      case "/": {
        record[i + 1] = Number(record[i]) / Number(record[i + 1]);
        break;
      }
      case "*": {
        record[i + 1] = Number(record[i]) * Number(record[i + 1]);
        break;
      }
      case "%": {
        record[i + 1] = Number(record[i]) % Number(record[i + 1]);
        break;
      }
    }

    var temp = record[record.length - 1];
    record = [temp];
    equaled = true;
    console.log(record);
    resultBar.innerText = temp;
  }
});

// Sign Change BTN
selector.plusMinusBtn.addEventListener("click", () => {
  var num = Number(resultBar.innerText);

  if (Math.sign(num) == 1 || Math.sign(num) == -1) {
    num = num * -1;
    resultBar.innerText = num;
    if (record[0]) record[0] = num;
    console.log(resultBar.innerText);
  }
});
function buttonHandler(e) {
  // If User Pressed Equal Last time
  if (equaled) {
    // record = [];
    isSign = false;
    result = 0;
    // aOps = [];
    equaled = false;
    // logsBar.innerText = "";
  }
  // Special Case for DOT (.)
  if (e.target.innerHTML == ".") {
    if (logsBar.innerText.includes(".")) return;
  }
  if (logsBar.innerHTML == "&nbsp;") {
    result = e.target.innerText;
    isSign = false;
    logsBar.innerText = e.target.innerText;
    return;
  }
  result += e.target.innerText;
  isSign = false;
  logsBar.innerText += e.target.innerText;
}

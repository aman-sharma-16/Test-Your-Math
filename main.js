const op1 = document.getElementById("op1");
const operator = document.getElementById("operator");
const op2 = document.getElementById("op2");
const result = document.getElementById("userinputs");
const submit = document.getElementById("submit");
const restart = document.getElementById("rbtn");
const container = document.getElementById("box");
const statusText = document.getElementById("statusText");
const arr = ["+", "-", "*", "/", "%"];
const percentageValue = [5, 10, 20, 25, 50, 75, 100];
const rightAnswer = "rgb(117, 237, 117)";
const wrongAnswer = "red";
const originalColor = "aliceblue";
const scoreText = document.getElementById("scoreValue");
const levelText = document.getElementById("levelValue");
let a = 0,
  b = 0,
  op = 0;
let level = 1;
let score = 0;

// Divide by zero handling
const dividingByZero = () => {
  b++;
  op2.innerText = b;
};

// variable initializaiton
const values = (levelValue) => {
  a = Math.floor(Math.random() * 10 * levelValue);
  console.log(a + "op1");
  b = Math.floor(Math.random() * 10 * levelValue);
  console.log(b + "op2");
  op = Math.floor(Math.random() * 5);
  if (op == 3 && b == 0) {
    dividingByZero();
  }
  if (op == 4) {
    percentage();
  }
  op1.innerText = a;
  operator.innerText = arr[op];
  op2.innerText = b;
};

// percentage function
const percentage = (op) => {
  a = percentageValue[Math.floor(Math.random() * 7)];
  op1.innerText = a;
  console.log(a + " operator is % ");
};

// Limiting the levels
const limit = () => {
  if (level > 1000) {
    statusText.innerText = "Out of Range";
  }
};

// operator stack
const opStack = (opValue) => {
  switch (opValue) {
    case 0:
      calculation = a + b;
      console.log(calculation + " answer by the JS");
      break;
    case 1:
      calculation = a - b;
      console.log(calculation + " answer by the JS");
      break;
    case 2:
      calculation = a * b;
      console.log(calculation + " answer by the JS");
      break;
    case 3:
      calculation = a / b;
      calculation = calculation.toFixed(2);
      console.log(Number(calculation));
      if (Number.isInteger(Number(calculation))) {
        calculation = Math.floor(calculation);
        console.log("Interger result");
      }
      console.log(calculation + " answer by the JS");
      break;
    case 4:
      calculation = (a * b) / 100;
      console.log(calculation + " answer by the JS");
      break;
    default:
      break;
  }
};

// displaying the result
const displayResult = () => {
  // Showing the output
  if (Number(result.value) || result.value.length != 0) {
    console.log(result.value + " user Input");
    if (result.value == calculation) {
      result.style.backgroundColor = rightAnswer;
      statusText.innerText = "Correct answer";
      setTimeout(() => {
        result.style.backgroundColor = originalColor;
      }, 2000);
      score++;
      // statusText.style.color="green"
    } else {
      result.style.backgroundColor = wrongAnswer;
      statusText.innerText = "Correct answer is " + calculation;
      setTimeout(() => {
        result.style.backgroundColor = originalColor;
      }, 2000);
      score--;
    }
    updateScore();
  } else {
    statusText.innerText = "Enter a valid input";
  }
};

// updating the questions and statusText
const update = () => {
  // operand and opertor updation;
  setTimeout(() => {
    result.value = "";
    statusText.innerText = "Can you get the next one!";
  }, 2000);
};

values(level);

if (op == 4) {
  percentage();
}

// submit button event
const input = () => {
  limit();

  opStack(op);

  displayResult();

  if (Number(result.value) || result.value.length != 0) {
    update();
    setTimeout(() => {
      values(level);
      while (b == 0 && (op == 3 || op == 4)) {
        dividingByZero();
      }
    }, 2000);
  }

  if (score == 10 * level) {
    updateLevel();
  }
};

const updateScore = () => {
  scoreText.innerText = score;
};

const updateLevel = () => {
  level++;
  levelText.innerText = level;
};

const clickHandler = () => {
  submit.disabled = true;
  setTimeout(() => {
    submit.disabled = false;
  }, 2000);
};

// Error solved
let pressCount = 1;
submit.addEventListener("click", function () {
  input();
  clickHandler();
});

// Error detected
document.addEventListener("keydown", (keyObject) => {
  if (keyObject.key == "Enter") {
    submit.click();
  }
});

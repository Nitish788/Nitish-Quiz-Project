"use strict";

const section = document.getElementById("section-1");
const btnSubmit = document.getElementById("submit");
const totalScore = document.querySelector(".score");
const start = document.querySelector(".start");
const quiz = document.querySelector(".main_section");
const btnStart = document.querySelector(".startquiz");
const result = document.querySelector(".report");
const btnReview = document.querySelector(".review");
const labelTimer = document.querySelector(".timer");
const message = document.querySelector(".message");
const btnContainer = document.querySelector(".btn_container");
const labelStatus = document.querySelector(".status");
const btnQuesNum = document.querySelectorAll(".ques_num");

let score = 0;

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  e.returnValue = " ";
});

class Question {
  #answer;
  constructor(i, question, option1, option2, option3, option4, answer) {
    this.i = i;
    this.question = question;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
    this.#answer = answer;
    this._insertHtml();

    section.addEventListener("click", this._selectOption.bind(this));
    section.addEventListener("dblclick", this._unselectOption.bind(this));
    btnReview.addEventListener("click", this._review.bind(this));
  }

  // Insert questions
  _insertHtml() {
    const html = `<div class = "quiz_question">
    <h2 class = "ques_order">Question ${this.i}</h2>
    <h3 class="question" id = "question-${this.i}" data-ans1="1"> ${this.question}</h3>
    <div class = 'options__list'>
    <div class = "option-${this.i} option"><span>1.</span><p class = "answer">${this.option1}</p></div>
    <div class = "option-${this.i} option"><span>2.</span><p class = "answer">${this.option2}</p></div>
    <div class = "option-${this.i} option"><span>3.</span><p class = "answer">${this.option3}</p></div>
    <div class = "option-${this.i} option"><span>4.</span><p class = "answer">${this.option4}</p></div>
    </div>
    </div>`;

    // Add questions
    section.insertAdjacentHTML("beforeend", html);
  }
  // On select any option
  _selectOption(e) {
    const selectedOption = e.target.closest(`.option-${this.i}`);
    const eachOption = document.querySelectorAll(`.option-${this.i}`);

    // Guard clause to only response for right place
    if (!selectedOption) return;

    eachOption.forEach((el, i) => {
      if (el.classList.contains("color")) {
        el.classList.remove("color");
        el.classList.remove("clicked");
      }

      // Add class to choose option
      selectedOption.classList.add("color");

      // Highlight attemped question
      btnQuesNum.forEach((btn) => {
        if (el.classList.contains("color") && this.i == btn.textContent) {
          btn.style.background =
            "linear-gradient(to top left, #f85032, #e73827)";
          btn.style.color = "white";
        }
      });
    });

    // Remove class from wrong answer
    // if (selectedOption.children[1].textContent !== this.#answer) {
    //   if (selectedOption.classList.contains("clicked")) {
    //     selectedOption.classList.remove("clicked");
    //   }
    // }
    // Add class to correct option on choose that option
    if (selectedOption.children[1].textContent === this.#answer) {
      selectedOption.classList.add("clicked");
    }

    // To get answer of user and update score
    this._marks();

    // Update score
    totalScore.textContent = score;
  }

  // On unselectimg option
  _unselectOption(e) {
    const selectedOption = e.target.closest(`.option-${this.i}`);
    const eachOption = document.querySelectorAll(`.option-${this.i}`);

    // Guard clause to only response for right place
    if (!selectedOption) return;

    eachOption.forEach((el) => {
      btnQuesNum.forEach((btn) => {
        // Make buttons neutral
        if (el.classList.contains("color") && this.i == btn.textContent) {
          btn.style.background = "";
          btn.style.color = "";
        }
      });
      // Unselect option
      if (el.classList.contains("color")) {
        el.classList.remove("color");
      }
      // Unselect option
      if (el.classList.contains("clicked")) {
        el.classList.remove("clicked");
      }
    });

    // To update marks acordingly
    this._marks();
  }

  // calculate score
  _marks() {
    // To calculate Score
    const selectedAnswer = [...document.querySelectorAll(".color")];
    const correctAnswer = selectedAnswer.filter((ans) =>
      ans.classList.contains("clicked")
    );
    score = String(correctAnswer.length).padStart(2, 0);
    if (score > 5 && score < 10) {
      message.textContent = "Good 👍";
    } else if (score == 10) {
      message.textContent = "Excellent 🎉";
    } else {
      message.textContent = "Poor 👎";
    }

    // TO calculate unanswered question
    labelStatus.textContent = `Unattempted(${10 - selectedAnswer.length})`;
  }
  _review(e) {
    const opt = document.querySelectorAll(`.option-${this.i}`);

    opt.forEach((el) => {
      // Mark correct option and attempt answer
      if (el.children[1].textContent === this.#answer) {
        el.style.border = "2px solid green";
        el.style.backgroundColor = "white";
      } else if (
        el.classList.contains("color") &&
        el.children[1].textContent !== this.#answer
      ) {
        el.style.border = "2px solid red";
        el.style.backgroundColor = "white";
      }

      // Mark btn to see correct and incorrect answer
      btnQuesNum.forEach((btn) => {
        if (el.classList.contains("clicked") && this.i == btn.textContent) {
          btn.style.background = "green";
        } else if (btn.style.background !== "green") {
          btn.style.background = "red";
        }
      });
    });
    // Clear status
    labelStatus.textContent = "";
  }
}

// Create Questios

const ques1 = new Question(
  1,
  "Which is the best programming language?",
  "C++",
  "Java",
  "Javascript",
  "Python",
  "Javascript"
);
const ques2 = new Question(
  2,
  "Inside which HTML element do we put the JavaScript?",
  "< js >",
  "< scripting>",
  "< javascript>",
  "< script>",
  "< script>"
);
const ques3 = new Question(
  3,
  "JavaScript is a ___ -side programming language.",
  "Client",
  "Server",
  "Both",
  "None",
  "Both"
);
const ques4 = new Question(
  4,
  "Which of the following will write the message “Hello DataFlair!” in an alert box?",
  "alertBox(“Hello DataFlair!”)",
  "alert(Hello DataFlair!)",
  "msgAlert(“Hello DataFlair!”)",
  "alert(“Hello DataFlair!”)",
  "alert(“Hello DataFlair!”)"
);
const ques5 = new Question(
  5,
  "How do you find the minimum of x and y using JavaScript?",
  "min(x,y);",
  "Math.min(x,y)",
  "Math.min(xy)",
  "min(xy);",
  "Math.min(x,y)"
);
const ques6 = new Question(
  6,
  "If the value of x is 40, then what is the output of the following program? (x % 10 == 0)? console.log(“Divisible by 10”) : console.log(“Not divisible by 10”)",
  "ReferenceError",
  "Divisible by 10",
  "Not divisible by 10",
  "None of the above",
  "Divisible by 10"
);
const ques7 = new Question(
  7,
  "Which are the correct “if” statements to execute certain code if “x” is equal to 2?",
  "if(x 2)",
  "if(x = 2)",
  "if(x === 2)",
  "if(x != 2 )",
  "if(x === 2)"
);
const ques8 = new Question(
  8,
  "What will the code return? Boolean(3 < 7)",
  "true",
  "false",
  "NaN",
  "SyntaxError",
  "true"
);
const ques9 = new Question(
  9,
  "Which of the following function of Number object defines how many total digits to display of a number?",
  "toExponential()",
  "toFixed()",
  "toLocaleString()",
  "toPrecision()",
  "toPrecision()"
);
const ques10 = new Question(
  10,
  " Which of the following function of String object returns the calling string value converted to upper case?",
  "toLocaleUpperCase()",
  "toUpperCase()",
  "toString()",
  "subString()",
  "toUpperCase()"
);

//  Timeup timer
let time = 120;
const timeOverTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min} : ${sec} Left`;

    // Stop timer and submit quiz

    if (time === 0) {
      clearInterval(timer);
      submit();
      labelTimer.classList.add("hidden");
    }
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//   On submit quiz
const submit = function (e) {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");
  // Stop timer
  time = 0;
};
btnSubmit.addEventListener("click", submit);

// On starting the quiz
btnStart.addEventListener("click", function () {
  start.classList.add("hidden");
  quiz.classList.remove("hidden");
  timeOverTimer();
});

// For reviewing the quiz
const reviewQuiz = function () {
  quiz.classList.remove("hidden");
  result.classList.add("hidden");
};
btnReview.addEventListener("click", reviewQuiz);

//  Scroll to certain question
btnContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("ques_num")) {
    const id = e.target.getAttribute("scrollTo");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

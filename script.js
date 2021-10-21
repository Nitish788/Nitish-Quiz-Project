"use strict";

const questions = document.querySelectorAll(".question");
const answers = document.querySelectorAll(".answer");
const section = document.getElementById("section-1");
const optionList = document.querySelector(".options__list");
const totalScore = document.querySelector(".score");

let score = 0;

class Question {
  constructor(i, question, option1, option2, option3, option4, answer) {
    this.i = i;
    this.question = question;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
    this.answer = answer;
    this.insertHtml();

    section.addEventListener("click", this.selectOption.bind(this));
  }
  insertHtml() {
    const html = `<h3 class="question question-${this.i}" data-ans1="1">Q ${this.i}. ${this.question}</h3>
    <div class = 'options__list'>
    <div class = "option-${this.i} option"><span>1</span><p class = "answer">${this.option1}</p></div>
    <div class = "option-${this.i} option"><span>2</span><p class = "answer">${this.option2}</p></div>
    <div class = "option-${this.i} option"><span>3</span><p class = "answer">${this.option3}</p></div>
    <div class = "option-${this.i} option"><span>4</span><p class = "answer">${this.option4}</p></div>
    </div>`;
    section.insertAdjacentHTML("beforeend", html);
  }
  selectOption(e) {
    const selectedOption = e.target.closest(`.option-${this.i}`);

    const eachOption = document.querySelectorAll(`.option-${this.i}`);

    if (!selectedOption) return;

    eachOption.forEach((el) => {
      if (el.classList.contains("color")) {
        el.classList.remove("color");
      }

      selectedOption.classList.add("color", "clicked");
    });
    console.log(selectedOption.children[1].textContent);

    if (selectedOption.children[1].textContent !== this.answer) {
      if (selectedOption.classList.contains("clicked")) {
        selectedOption.classList.remove("clicked");
      }
    }
    this.marks();

    totalScore.textContent = score;
  }

  marks() {
    const selectedAnswer = [...document.querySelectorAll(".color")];
    const correctAnswer = selectedAnswer.filter((ans) =>
      ans.classList.contains("clicked")
    );

    score = correctAnswer.length;
  }
}
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

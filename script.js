const quizData = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Tech Modern Language", correct: false },
      { text: "Hyper Transfer Machine Language", correct: false },
      { text: "Home Tool Markup Language", correct: false }
    ]
  },
  {
    question: "Which CSS property is used to change text color?",
    answers: [
      { text: "font-color", correct: false },
      { text: "text-color", correct: false },
      { text: "color", correct: true },
      { text: "background-color", correct: false }
    ]
  },
  {
    question: "Which JavaScript method is used to select an element by ID?",
    answers: [
      { text: "querySelectorAll()", correct: false },
      { text: "getElementById()", correct: true },
      { text: "getElementsByClassName()", correct: false },
      { text: "innerHTML()", correct: false }
    ]
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: [
      { text: "int", correct: false },
      { text: "var", correct: true },
      { text: "string", correct: false },
      { text: "define", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const quizResult = document.getElementById("quizResult");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerText = "Next Question";
  quizResult.textContent = "";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answersElement.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answersElement.firstChild) {
    answersElement.removeChild(answersElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answersElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextBtn.style.display = "inline-block";
}

function showScore() {
  resetState();
  questionElement.textContent = "Quiz Completed!";
  quizResult.textContent = `You scored ${score} out of ${quizData.length}.`;
  nextBtn.innerText = "Restart Quiz";
  nextBtn.style.display = "inline-block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < quizData.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();

// Joke API Integration
const jokeBtn = document.getElementById("jokeBtn");
const jokeSetup = document.getElementById("jokeSetup");
const jokePunchline = document.getElementById("jokePunchline");
const apiStatus = document.getElementById("apiStatus");

async function fetchJoke() {
  jokeSetup.textContent = "Loading a joke...";
  jokePunchline.textContent = "";
  apiStatus.textContent = "Fetching data from public API...";

  try {
    const response = await fetch("https://official-joke-api.appspot.com/jokes/programming/random");

    if (!response.ok) {
      throw new Error("Failed to fetch joke.");
    }

    const data = await response.json();
    const joke = data[0];

    jokeSetup.textContent = joke.setup;
    jokePunchline.textContent = joke.punchline;
    apiStatus.textContent = "Joke loaded successfully.";
  } catch (error) {
    jokeSetup.textContent = "Unable to load joke at the moment.";
    jokePunchline.textContent = "Please try again later.";
    apiStatus.textContent = "There was an error while fetching the API data.";
  }
}

jokeBtn.addEventListener("click", fetchJoke);

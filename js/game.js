import formatData from "./helper.js";



const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerText = document.querySelectorAll(".answer-text");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const scoreElement = document.getElementById("score");
const questionNumber = document.getElementById("question-number");

let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let currentScore = 0;

const difficulty = localStorage.getItem("userLevel")?.toLowerCase() || "medium";
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`;

const fetchData = async () => {
  try {
    loader.style.display = "block";
    container.style.display = "none";
    
    const res = await fetch(URL);
    const json = await res.json();
    formattedData = formatData(json.results);
    
    start();
  } catch (error) {
    console.error("Error fetching data:", error);
    loader.style.display = "none";
    alert("Failed to load questions. Please try again.");
  }
};

const start = () => {
  loader.style.display = "none";
  container.style.display = "block";
  showQuestion();
};

const showQuestion = () => {
  const currentQuestion = formattedData[questionIndex];
  questionText.innerText = currentQuestion.question;
  correctAnswer = currentQuestion.correctAnswerIndex;
  questionNumber.innerText = questionIndex + 1;

  answerText.forEach((button, index) => {
    button.innerText = currentQuestion.answers[index];
    button.style.backgroundColor = "";
    button.disabled = false;
  });
  
  nextButton.disabled = true;
  finishButton.disabled = false;
};

const showNextQuestion = () => {
  if (questionIndex < formattedData.length - 1) {
    questionIndex++;
    showQuestion();
  } else {
    finishHandler();
    window.location.href = "end.html";
  }
};

const checkAnswer = (button, index) => {
  answerText.forEach(btn => {
    btn.disabled = true;
  });

  if (index === correctAnswer) {
    button.style.backgroundColor = "lightgreen";
    currentScore++;
    scoreElement.innerText = currentScore;
  } else {
    button.style.backgroundColor = "red";
    answerText[correctAnswer].style.backgroundColor = "lightgreen";
  }
  
  nextButton.disabled = false;
};

const finishHandler = () => {
  localStorage.setItem("quizScore", JSON.stringify({
    score: currentScore,
    totalQuestions: formattedData.length,
    date: new Date().toISOString()
  }));
  window.location.href = "end.html";
};

// Event listeners
window.addEventListener("load", fetchData);
nextButton.addEventListener("click", showNextQuestion);
finishButton.addEventListener("click", finishHandler);

answerText.forEach((button, index) => {
  button.addEventListener("click", () => checkAnswer(button, index));
});
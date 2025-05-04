// const saveButton = document.getElementById("save");
// const showResult = document.getElementById("result");
// const userScoreInput = document.getElementById("user-score-input");

// const quizResult = JSON.parse(localStorage.getItem("quizScore"));
// showResult.innerText = +quizResult.score;

// let highScore = [];
// console.log(highScore)

// const saveHandler = () => {
//   const userName = userScoreInput.value;
//   const userValue = +quizResult.score;
//   highScore.push({userName : userName , userValue : userValue})
//   console.log(userName)
//   console.log(userValue);
//   localStorage.setItem("users", JSON.stringify(highScore));
// };

// saveButton.addEventListener("click", saveHandler);


const saveButton = document.getElementById("save");
const showResult = document.getElementById("result");
const userScoreInput = document.getElementById("user-score-input");

// دریافت نتایج از localStorage
const quizResult = JSON.parse(localStorage.getItem("quizScore"));
if (quizResult) {
  showResult.textContent = quizResult.score;
} else {
  showResult.textContent = "No results found";
}

// دریافت لیست امتیازات بالا یا ایجاد آرایه خالی
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const saveHandler = () => {
  const userName = userScoreInput.value.trim();
  
  // اعتبارسنجی ورودی کاربر
  if (!userName) {
    alert("Please enter your name");
    return;
  }

  if (!quizResult) {
    alert("No quiz results to save");
    return;
  }

 
  const newScore = {
    name: userName,
    score: quizResult.score,
    totalQuestions: quizResult.totalQuestions,
    date: new Date().toISOString()
  };

  
  highScores.push(newScore);
  
  
  highScores.sort((a, b) => b.score - a.score);
  
  
  highScores = highScores.slice(0, 10);
  
  localStorage.setItem("highScores", JSON.stringify(highScores));
  alert(`Score saved successfully! Rank: ${highScores.findIndex(score => score.name === userName) + 1}`);
  

  userScoreInput.value = "";
};

saveButton.addEventListener("click", saveHandler);
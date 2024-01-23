// Query and ID Selectors //
var timeEl = document.querySelector(".time");
var mainEl = document.querySelector(".main");
var scoreEl = document.querySelector(".score")
var startButton = document.querySelector(".start-button")
var quizTitle = document.querySelector(".quiz-title")
var answer = document.querySelector(".answer")
var button = document.querySelector("#button")
var scoreForm = document.getElementById("scoreform")
var scoreTitle = document.querySelector(".score-title")
var userName = document.getElementById("name")
var answerContainer = document.querySelector(".quiz");
var quizContainer = document.querySelector(".quiz-container")


// Global variables //
var message = "GAME OVER";
var timeInterval;
var timeLeft = 0;
var score = 0;
var questionIndex = 0;

// Event listeners for the start, answer, and submit score buttons //
scoreForm.addEventListener("submit", function(e) {
  e.preventDefault()
  scoreSet()
})

for (var i = 0; i < answerContainer.children.length; i++) {
answerContainer.children[i].addEventListener("click", checkAnswer);
}

startButton.addEventListener("click", startGame);

// Replacing HTML ID values with game rules using innerHTML property //
quizTitle.textContent = "Java Coding Quiz";
document.getElementById("answer1").innerHTML =
"⚬ You have 30 seconds to finish the quiz ⚬";
document.getElementById("answer2").innerHTML =
"⚬ 5 points for every correct answer ⚬";
document.getElementById("answer3").innerHTML =
"⚬ Subtract 5 seconds for wrong answers ⚬";
document.getElementById("answer4").innerHTML =
"⚬ Good Luck! ⚬";

// Start Game function to start countdown and question index //
function startGame() {
  if (startButton.disabled === true) return;
	timeLeft = 25;
  countdown();
  displayQuestion();
  startButton.disabled = true;
}

// Time countdown function with if statement for time out scenario //
function countdown() {
  timeInterval = setInterval(function() {
    timeLeft--;
    timeEl.textContent = timeLeft + " seconds left";

    if(timeLeft === 0) {
        timeEl.textContent = timeLeft;
        clearInterval(timeInterval);
        startButton.style.display = "none";
      
        displayMessage();
    }
  }, 1000); 
}

// 'Game Over" message function that toggles visbility between of quiz container and score form //
function displayMessage() {
  console.log("displayMessage")
			mainEl.textContent = message;
      quizContainer.classList.add("hidden");
      scoreForm.classList.remove("hidden");
            clearInterval(timeInterval);
}

// Set score function containing an object that also writes final score to local storage //
function scoreSet() {
	var passedScores = JSON.parse(localStorage.getItem("score")) || [];
  var userInitials = userName.value
  var highscoreObj = {
    userInitials, 
    score,
  } 
  passedScores.push(highscoreObj)
  localStorage.setItem("score", JSON.stringify(passedScores))
}

// Question Group display function with for loop iteratation over questions and answers //
function displayQuestion() {
  quizTitle.textContent =
    questionGroups[questionIndex].question;

  for (var i = 0; i < questionGroups[questionIndex].answers.length; i++) {
    var valueId = "answer" + (i + 1);
    var question = document.getElementById(valueId);
    question.textContent =
      questionGroups[questionIndex].answers[i];
  }
}

// check answer function with if/else statements based on user selection and css style attributes //
function checkAnswer(e) {
  if (questionGroups[questionIndex].correct === e.target.dataset.option) {
  e.preventDefault();
   score += 5;
   button.style.backgroundColor = "rgb(192, 240, 187)";
   button.textContent = "Correct!";
   if (score < 30) {
    score++;
    scoreEl.textContent = "Score: " + score;
    localStorage.setItem("score", score);
  }
  } else { 
    timeLeft -= 5;
  button.style.backgroundColor = "";
  button.textContent = "Wrong!";
  return;
  } 
  // stops countdown after last question //
  questionIndex ++;
  if (questionIndex > questionGroups.length -1) {
    displayMessage();

    } else {
      displayQuestion();
    }
}


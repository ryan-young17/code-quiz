var click = 0;
var container = document.querySelectorAll("section");
var questions = document.querySelectorAll(".question");
var correctAnswers = ["0", "2", "1", "1", "2"];
var start = document.querySelector(".start");
var timeEl = document.querySelector(".timer");
var timeLeft = 60;
var penalty = 10;
var score = 0;
var questionContainer = document.querySelector(".questionWrapper");
var endGame = document.querySelector(".endGame");

questionContainer.style.display = "none";
endGame.style.display = "none";


var timerMessage = function () {
    var label = "seconds left";
    if (timeLeft === 1) {
        label = "second left";
    }
    timeEl.textContent = timeLeft + " " + label;
};

// Make this a function for highscore tracking
var displayEndGame = function() {
    timeEl.textContent = "You've run out of time!";
    timeEl.style.color = "red";
    questionContainer.style.display = "none";
    endGame.style.display = "block";
};

var setTime = function () {
    timerMessage();
    var timerInterval = setInterval(function () {
        timeLeft--;
    timerMessage();

    if(timeLeft <= 0) {
        clearInterval(timerInterval);
        displayEndGame();
    }

    }, 1000);

};

// Quiz Functions

var quiz = function () {

var displayQuestion = function () {
    for (var question of questions) {
        if (question.dataset.index != click) {
            question.style.display = "none";
        } else {
            question.style.display = "block";
        }
    }
};

var advance = function (event) {
    var element = event.target;
    if (element.matches(".question button")) {
        if (element.dataset.answer === correctAnswers[click]) {
            score = score + 10;
            console.log(score);
        } else {
            timeLeft = timeLeft - penalty;
        }
        if (click < questions.length - 1) {
            click++;
        }
        displayQuestion();
    }
};

document.addEventListener("click", advance);

displayQuestion();

};

start.addEventListener("click", function () {
    start.style.display = "none";
    questionContainer.style.display = "flex";
    quiz();
    setTime();
});
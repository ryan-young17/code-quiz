var cursor = 0;
var container = document.querySelectorAll("section");
var questions = document.querySelectorAll(".question");
var correctAnswers = ["0", "2", "1", "1", "2"];
var start = document.querySelector(".start");
var timeEl = document.querySelector(".timer");
var timerInterval;
var timeLeft = 60;
var penalty = 5;
var score = 0;
var questionContainer = document.querySelector(".questionWrapper");
var endScreen = document.querySelector(".endScreen");
var highScoreScreen = document.querySelector(".highScoreScreen");
var submitButton = document.querySelector("#submit");
var restartButton = document.querySelector("#restart");
var scoreList = document.querySelector("#scoreList");

questionContainer.style.display = "none";
endScreen.style.display = "none";
highScoreScreen.style.display = "none";

var quiz = function () {

    var displayQuestion = function () {
        for (var question of questions) {
            if (question.dataset.index != cursor) {
                question.style.display = "none";
            } else {
                question.style.display = "block";
            }
        }
    };

    var advance = function (event) {
        var element = event.target;
        if (element.matches(".question button")) {
            if (element.dataset.answer === correctAnswers[cursor]) {
                score = score + 10;
            } else {
                timeLeft = timeLeft - penalty;
            }
            if (cursor < questions.length - 1) {
                cursor++;
                displayQuestion();
            } else {
                displayEndScreen();
            }
        }
    };

    document.addEventListener("click", advance);

    displayQuestion();

};

var displayEndScreen = function () {
    timeEl.textContent = "End of Quiz";
    timeEl.style.color = "red";
    questionContainer.style.display = "none";
    endScreen.style.display = "block";
    document.querySelector("#scoreLabel").textContent = score;

    clearInterval(timerInterval);
};

var displayHighScoresScreen = function () {
    endScreen.style.display = "none";
    highScoreScreen.style.display = "block";
}


var timerMessage = function () {
    var label = "seconds left";
    if (timeLeft === 1) {
        label = "second left";
    }
    timeEl.textContent = timeLeft + " " + label;
};

var setTime = function () {
    timerMessage();
    timerInterval = setInterval(function () {
        timeLeft--;
        timerMessage();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            displayEndScreen();
        }
    }, 1000);

};

start.addEventListener("click", function () {
    start.style.display = "none";
    questionContainer.style.display = "block";
    quiz();
    setTime();
});

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var userScores = [];
    var userInfo = {
        initials: document.querySelector("#initials").value,
        score: score
    };
    userScores.push(userInfo);
    var displayScores = function () {
        var lastScore = JSON.parse(localStorage.getItem("userInfo"));
        if (lastScore !== null) {
            var listEl = document.createElement("li");
            listEl.textContent = userInfo.initials + " | Score: " + userInfo.score;
            document.querySelector("#scoreList").appendChild(listEl);
        }
    }
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    displayHighScoresScreen();
    displayScores();
});

restartButton.addEventListener("click", function () {
    start.style.display = "block";
    questionContainer.style.display = "none";
    endScreen.style.display = "none";
    highScoreScreen.style.display = "none";
    window.location.reload(true);
});
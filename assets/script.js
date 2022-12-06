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
var highScoreScreen = document.querySelector(".highscoreScreen");
var submitButton = document.querySelector("#submit");
var restartButton = document.querySelector("#restart");

questionContainer.style.display = "none";
endScreen.style.display = "none";
highScoreScreen.style.display = "none";

// Quiz Functions

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
            }
            displayQuestion();
        }
    };
    
    document.addEventListener("click", advance);
    
    displayQuestion();
    
};

var displayEndScreen = function() {
    timeEl.textContent = "End of Quiz";
    timeEl.style.color = "red";
    questionContainer.style.display = "none";
    endScreen.style.display = "block";

    // Need to figure out how to stop timer and display end screen at end of questions.
    if (cursor >= questions.length) {
        clearInterval(timerInterval);
        displayEndScreen();
    }
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
    var timerInterval = setInterval(function () {
        timeLeft--;
    timerMessage();

    if(timeLeft <= 0) {
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

// High Score Function
    
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    displayHighScoresScreen();


    var userInfo = {
        initials: document.querySelector("#initials").value,
        score: score
    };
    var showScores = function () {
        var lastScore = JSON.parse(localStorage.getItem("userInfo"));
        if (lastScore !== null) {
            document.querySelector("#msg").textContent = userInfo.initials + " got " + userInfo.score + "!";
            // var scoreMessage = document.createElement('div');
            // scoreMessage.textContent = lastScore.initials + " got " + lastScore.score + "!";
            // highScoreList.appendChild(scoreMessage);
        }
    }
    localStorage.setItem("user", JSON.stringify(userInfo));
    showScores();

    endGame.style.display = "none";
    highScoreList.style.display = "block";
});

restartButton.addEventListener("click", function() {
    start.style.display = "block";
    questionContainer.style.display = "none";
    endScreen.style.display = "none";
    highScoreScreen.style.display = "none";
    // Need to fix this screen
});
var click = 0;
var container = document.querySelectorAll("section");
var questions = document.querySelectorAll(".question");
var correctAnswers = ["0", "2", "1", "1", "2"];
var start = document.querySelector(".start");
var timeEl = document.querySelector(".timer");
var timeLeft = 60;
var penalty = 10;
var score = 0;


// Timer Functions

var timerMessage = function () {
    var label = "seconds left";
    if (timeLeft === 1) {
        label = "second left";
    }
    timeEl.textContent = timeLeft + " " + label;
};

var sendMessage = function() {
    timeEl.textContent = "Oh no! You've run out of time!";
    timeEl.style.color = "red";
};

var setTime = function () {
    timerMessage();
    var timerInterval = setInterval(function () {
        timeLeft--;
    timerMessage();

    if(timeLeft === 0) {
        clearInterval(timerInterval);
        sendMessage();
    }

    }, 1000);

};

// Quiz Function

var quiz = function () {

// var displayQuestion = function () {
//     for (var section of container) {
//         if (section.dataset.index != click) {
//             section.style.display = "none";
//         } else {
//             section.style.display = "block";    
//         }
//     }
// }

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
        // var choice = element.dataset.answer === correctAnswers[click];
        // if (element.dataset.answer !== correctAnswers[click]) {
        //     timeLeft = timeLeft - penalty;
        // }
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
    quiz();
    setTime();
});
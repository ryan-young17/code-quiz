var click = 0;
var questions = document.querySelectorAll(".question");
// var start = document.querySelector(".start");
var correctAnswers = ["0", "2", "1", "1", "2"];

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
        if (click < questions.length - 1) {
            click++;
        }
        displayQuestion();
    }
};

document.addEventListener("click", advance);

displayQuestion();


// var startQuiz = function() {
  
// };

// start.addEventListener("click", startQuiz);
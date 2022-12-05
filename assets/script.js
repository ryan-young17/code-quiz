var forwardEl = document.querySelector("#forward");
var click = 0;
var questions = document.querySelectorAll(".question");
var start = document.querySelector(".start");

var displayQuestion = function () {
    for (var question of questions) {
        if (question.dataset.index != click) {
            question.style.display = "none";
        }
    }
};



// var startQuiz = function() {
  
// };

// start.addEventListener("click", startQuiz);
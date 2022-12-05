var click = 0;
var container = document.querySelectorAll("section");
var questions = document.querySelectorAll(".question");
var correctAnswers = ["0", "2", "1", "1", "2"];
var start = document.querySelector(".start");

// var displayQuestion = function () {
//     for (var question of questions) {
//         if (question.dataset.index != click) {
//             question.style.display = "none";
//         } else {
//             question.style.display = "block";
//         }
//     }
// };

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
        var choice = element.dataset.answer === correctAnswers[click];
        // 
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
});
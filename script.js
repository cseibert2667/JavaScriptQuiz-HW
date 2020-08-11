// Variables
var startScreen = document.querySelector("#startScreen")
var startButton = document.querySelector("#startButton")
var qScreen = document.querySelector("#questions")
var fScreen = document.querySelector("#final-screen")
var finalScore = document.querySelector("#final-score")
var timer = document.querySelector("#timer")
var questionText = document.querySelector("#question-text")
var choices = document.querySelector(".choices")
var finalButtons = document.querySelector(".end-buttons")
var remainingTime = 100
var questionIndex = 0
var timerInterval
// Questions & Answers
var questions = [
    { q: "This is where we ask the first question?", o: ["tree", "rock", "sand", "water"], a: "rock" },
    { q: "This is where we ask the second question?", o: ["option0", "option2", "option3", "option4"], a: "option0" },
    { q: "This is where we ask the third question?", o: ["option1", "option2", "option3", "option4"], a: "option3" },
    { q: "This is where we ask the fourth question?", o: ["chunky", "option2", "option3", "option4"], a: "chunky" },
    { q: "This is where we ask the fifth question?", o: ["option1", "option2", "option3", "option4"], a: "option4" },
]
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
startButton.addEventListener("click", function () {
    startScreen.style.display = "none";  // Hides start prompt
    qScreen.style.display = "block";  // show questions prompt
    setTime() // starts timer
    buildQuestion(0);
})



function setTime() {
    timerInterval = setInterval(function () {
        remainingTime--;
        timer.textContent = remainingTime;  // Displays timer
        if (remainingTime === 0) {
            // clearInterval(timerInterval);
            endGame();  // What happens when time runs out
        }
    }, 1000);
}

// populate questions prompt by pulling them from an array of objects
function buildQuestion(i) {
    var question = questions[i].q;
    var options = questions[i].o;
    questionText.textContent = question;
    for (n = 0; n < options.length; n++) {
        var btn = document.createElement("a");
        btn.setAttribute("class", "btn btn-primary");
        btn.setAttribute("value", options[n])
        btn.setAttribute("onclick", "checkAnswer(" + i + ")")
        btn.textContent = options[n];
        choices.appendChild(btn);
    }
}

// WHEN I answer a question
// THEN I am presented with another question
function checkAnswer(i) {
    selectedAnswer = event.target.getAttribute("value");
    answer = questions[i].a;
    if (selectedAnswer === answer) {
        console.log("correct");
        i++;
        if (i > 4) {endGame()}
         else {
             resetQuestion();
             buildQuestion(i);
            }
    } // what to do when we run out of questions
    else if (selectedAnswer !== answer) {
        console.log("incorrect");
        i++;
        remainingTime -= 10;
        timer.textContent = remainingTime;
        if (i > 4) {endGame()}
         else {
             resetQuestion();
             buildQuestion(i);
            }
    // WHEN I answer a question incorrectly
    // THEN time is subtracted from the clock
    } else {endGame()}
}
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
function endGame (){
    qScreen.style.display = "none";
    fScreen.style.display = "block";
    clearInterval(timerInterval);
    finalScore.textContent = "Your final score is: "+remainingTime;
    var btn = document.createElement("a");
    btn.setAttribute("class", "btn btn-primary");
    btn.setAttribute("href", "");
    btn.textContent = "Try Again"
        finalButtons.appendChild(btn);
}

// clear out previous button values when moving to next question
function resetQuestion() {
    while (choices.firstChild) {
        choices.removeChild(choices.firstChild)
    }
}












// display final score, prompt to start over


// BONUS
// WHEN the game is over
// THEN I can save my initials and score




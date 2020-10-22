// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers
// ```

// ## Acceptance Criteria

// ```
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

/*PSEUDO CODE
Click button to start quiz - starts quizdisplay function, starts timer
quizdisplay function takes an question object and displays it using DOM
    these are a header and an unordered list of questions with a checkbox (form?)
"confirm answer" button that resolves "correct" or "incorrect" and tabs the score on the backend
after all questions are asked, display total score
ask for initials, store score and initials as an array on local machine

each question is a JS object 1 answer, 3 other options
all questions are in an array, ask in a row

TIMERS, DOM, DYNAMIC HTML, OBJECTS
*/


let stopwatchHTML = $("<div class='timer'>");
let secondsLeft = "300";
let score = 0;


let myVar;

function startStopwatch() {
  myVar = setInterval(updateStopwatch, 1000);
}


function updateStopwatch(){
    console.log("stopwatch ticking...");
    secondsLeft--;

    if(secondsLeft < 100){
        secondsLeft = "0".concat(secondsLeft);
    }
    if(secondsLeft < 10){
        secondsLeft = "0".concat(secondsLeft);
    }      

    $("#stopwatch-timer").text(secondsLeft)
    secondsLeft = parseInt(secondsLeft);
}


function startQuiz(){
    $("#stopwatch-div").append("<h4 style='text-align: center' id='stopwatch-title'>Seconds Left</h4>");
    $("#stopwatch-div").append("<h4 style='text-align: center' id='stopwatch-timer'></h4>");
    $("#stopwatch-timer").text(secondsLeft )
    startStopwatch();
    $("#start-btn").hide();
    console.log("quiz started");
    promptQuestion(questionList);
}


function wrongAnswer(){
    secondsLeft -= 10;
}

function correctAnswer(){
    score++;
    console.log(score);
    $("#options").empty();
    $("#question").text("");
}

function promptQuestion(questionArray){
    $("#question").text(questionArray[0].prompt);
    for(i in questionArray[0].options){
        let newLi = $("<li style='list-style-type:none'>");
        let newBtn = $("<button class ='btn btn-primary mx-auto' id='btn-option'>");
        $(newBtn).text(questionArray[0].options[i]);
        if(questionArray[0].options[i] === questionArray[0].answer){
            $(newBtn).click(function(){
                correctAnswer();
                return promptQuestion(questionArray.slice(1,questionArray.length));
            });
        }
        else{
            $(newBtn).click(wrongAnswer);
        }

        $("#options").append(newLi, "<br>");
        $(newLi).append(newBtn);
    }
}

let question1 = {
    prompt: "What floats in water?",
    options: ["Great gravy","Apples","Very small rocks","Wood"],
    answer: "Wood"
}

let question2 = {
    prompt: "Who are you, who are so wise in the ways of science?",
    options: ["Arthur, King of the Britons.","... Tim?","Sir Lancelot","The Brave Ser Robin"],
    answer: "Arthur, King of the Britons."
}

let question3 = {
    prompt: "What have the romans ever done for us?",
    options: ["Nothing","Sanitation, medicine, education, wine, public order, irrigation, roads, fresh-water system, and public health","Peace?","Oh... peace? SHUT UP!"],
    answer: "Sanitation, medicine, education, wine, public order, irrigation, roads, fresh-water system, and public health"
}

let question4 = {
    prompt: "What is a pointer in Javascript?",
    options: ["An html element that draws attention to another element", "The nitty gritty definition for a variable","The icon the user uses to select things on a webpage","The guy behind you who sees the semicolon you missed"],
    answer: "The nitty gritty definition for a variable"
}

let questionList = [question1, question2, question3, question4];


$("button").html("Start Quiz");
$("#start-btn").click(startQuiz);


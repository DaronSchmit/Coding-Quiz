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

function displayQuestion(currentQuestion){
    $("#question").text(currentQuestion.prompt);
}


function startQuiz(){
    //startTimer(); TODO
    $("#start-btn").hide();
    console.log("quiz started");
    
}

// If we needed each line to be its own div, we could just as easily create a new div.
var newDiv = $("<div>");
newDiv.text("butts");

// NOTICE THE DIFFERENCE
// ---------------------
// $("#empty-div")   <-- FIND a DOM node with the ID empty-div
// $("<div>")        <-- CREATE a new DIV

// We can then  append it to the other div using the same ".append" method.
$("#empty-div").append(newDiv);



let question1 = {
    prompt: "What floats in water?",
    options: ["Bread","Apples","Very small rocks","Wood"]
}

let question2 = {
    prompt: "Who are you, who are so wise in the ways of science?",
    options: ["I am Arthur, king of the Britons.","My name is... Tim?","My name is Sir Lancelot","The Brave Ser Robin"]
}

let question3 = {
    prompt: "What have the romans ever done for us?",
    options: ["Nothing","Sanitation, medicine, education, wine, public order, irrigation, roads, fresh-water system, and public health","Peace?","Oh... peace? SHUT UP!"]
}

let question4 = {
    prompt: "What is a pointer in Javascript?",
    options: ["An html element that draws attention to another element", "The nitty gritty definition for a variable","The icon the user uses to select things on a webpage","The guy behind you who sees the semicolon you missed"]
}

let questionList = [question1, question2, question3, question4];


$("button").html("Start Quiz");
$("#start-btn").click(startQuiz);
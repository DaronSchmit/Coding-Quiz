//the questions
let question1 = {
  prompt: "What floats in water?",
  options: ["Great gravy", "Apples", "Very small rocks", "Wood"],
  answer: "Wood",
};

let question2 = {
  prompt: "Who are you, who are so wise in the ways of science?",
  options: [
    "Arthur, King of the Britons.",
    "... Tim?",
    "Sir Lancelot",
    "The Brave Ser Robin",
  ],
  answer: "Arthur, King of the Britons.",
};

let question3 = {
  prompt: "What is wrong with this parrot?",
  options: [
    "He's Resting",
    "It is deceased!",
    "Pining for the fjords.",
    "Beautiful Plumage 'idn'it?",
  ],
  answer: "It is deceased!",
};

let question4 = {
  prompt: "Amongst our weaponry are such elements as: ",
  options: [
    "Fear",
    "Surprise and Fear",
    "Fear and Surprise",
    "Fear and Surprise... and Rutheless Efficiency",
    "Fear, Surprise,Rutheless Efficiency, and devotion to the pope",
  ],
  answer: "Fear, Surprise,Rutheless Efficiency, and devotion to the pope",
  unexpected: "Assets/unexpected.gif",
};

let questionList = [question1, question2, question3, question4];

//Setting initial values
let stopwatchHTML = $("<div class='timer'>");
let secondsLeft = questionList.length * 15;
let score = 0;
//Get highscores or set empty array if none exist in local memory
let highscores = JSON.parse(localStorage.getItem("highscores"));
if (highscores === null) {
  highscores = [];
}

let ticker; //Will be used as timer

//SETTING UP INITIAL PAGE

function displayStartScreen() {
  $("#main-content").empty();
  $("#high-scores").empty();
  $("#stopwatch-div").empty();

  displayHighscores();
  displayTimer();

  $("#main-content").append(
    "<button class='btn btn-primary text-center ' type='submit' id = 'start-btn'>Start Quiz!</button>"
  );
  $("#start-btn").click(startQuiz);
  $("#main-content").append(
    "<h3 class='w-30' style = 'text-align: center;' id='question'></h3>"
  );
  $("#main-content").append("<ul class = 'text-center' id='options'></ul>");
}

function displayTimer() {
  $("#stopwatch-div").append(
    "<h4 id='stopwatch-title'>You will have </h4><h4 id='stopwatch-time'>" +
      secondsLeft +
      "</h4><h4 id='garbage'> seconds to complete this quiz!</h4>"
  );
}

//Create High scores list on right side column, displays nothing and sets highscores to be an empty array
function displayHighscores() {
  $("#high-scores").append("<h3>Scores so far</h3><br>");
  $("#high-scores").append(
    "<table id='score-table'><tr><th>Name...</th><th>Score...</th><th>Time Left<th><tr></table>"
  );
  for (i in highscores) {
    $("#score-table").append("<tr id='table" + i + "-row'></tr>");
    for (x in highscores[i]) {
      $("#table" + i + "-row").append("<td>" + highscores[i][x] + "</td>");
    }
  }
}

//formatting function to make the highscore column less ugly, used by highscores for loop
function upToTenCharacters(string) {
  string = string.toString();
  while (string.length < 10) {
    string = string.concat("_");
  }
  return string;
}

//starts the stopwatch when called by startQuiz()
function startStopwatch() {
  ticker = setInterval(updateStopwatch, 1000);
}

//updates time left display
function updateStopwatch() {
  console.log("stopwatch ticking...");
  secondsLeft--;
  if (secondsLeft <= 0) {
    clearInterval(ticker);
    displayScoreScreen();
  }

  $("#stopwatch-time").text(secondsLeft);
  secondsLeft = parseInt(secondsLeft);
}

//sets time left HTML, starts stopwatch, hides itself, then starts asking questions
function startQuiz() {
  $("#garbage").empty();
  $("#stopwatch-title").text("Seconds Left");
  $("#stopwatch-time").text(secondsLeft);
  startStopwatch();
  $("#start-btn").hide();
  console.log("quiz started");
  promptQuestion(questionList);
}

//decrements time left by 10, called by buttons that
function wrongAnswer() {
  secondsLeft -= 10;
}

//updates the score, resets the options and question
function correctAnswer() {
  score++;
  console.log(score);
  $("#options").empty();
  $("#question").text("");
}

//Displays Score information in the question
function displayScoreScreen() {
  //clear unnecessary HTML
  $("#options").empty();

  //display relevant info
  $("h1").text("Hope you enjoyed the Quiz!");
  $("#question").text("Your Score: " + score);
  $("#question").append("<h3>Seconds Left: " + secondsLeft + "</h3>");
  $("#options").append("<input type='text' id='highscore-name'></text>");
  $("#options").append("<button id='highscore-submit'>Submit</button>");

  //add new score to highscore array and push to local storage
  $("#highscore-submit").click(function () {
    let savescore = [$("#highscore-name").val(), score, secondsLeft];
    console.log("saving score");
    highscores.push(savescore);
    localStorage.setItem("highscores", JSON.stringify(highscores));

    //display current score in score sidebar
    $("#high-scores").empty();
    displayHighscores();
    $("#main-content").empty();
    $("#main-content").append(
      "<tr><th>Your Name...</th><th>Your Score...</th><th>Your Time Left</th></tr>"
    );
    $("#main-content").append(
      "<tr>" +
        "<td>" +
        savescore[0] +
        "</td>" +
        "<td>" +
        savescore[1] +
        "</td>" +
        "<td>" +
        savescore[2] +
        "</td>" +
        "</tr>"
    );

    //add buttons to retake quiz and reset scores
    $("#main-content").append(
      "<button class='btn btn-primary text-center ' type='submit' id = 'retake-btn'>Take Quiz Again!</button>"
    );
    $("#retake-btn").on("click", function () {
      secondsLeft = questionList.length * 15;
      score = 0;
      displayStartScreen();
    });

    $("#main-content").append(
      "<button class='btn btn-danger text-center ' type='submit' id = 'reset-btn'>Reset all scores</button>"
    );
    $("#reset-btn").on("click", function () {
      highscores = [];
      localStorage.setItem("highscores", JSON.stringify(highscores));
      displayHighscores();
    });
  });
}

//Displays questions to main-content.
//I thought to myself "what if I did this recursively?"
//I was too preoccupied with whether or not I could, I never thought to think about whether or not I should
function promptQuestion(questionArray) {
  console.log("questions left: " + questionArray.length);
  if (questionArray.length === 0) {//if the question array is empty, this will stop calling itself and end the quiz
    clearInterval(ticker);
    displayScoreScreen();
    return;
  } else {
    $("#question").text(questionArray[0].prompt);
    //This next if statement is only for a fun joke, the question falls flat otherwise
    if (
      questionArray[0].prompt === "Amongst our weaponry are such elements as: " //if the question is about the spanish inquisition
    ) {
      $("#question").prepend( 
        "<br><div class='text-center'><img class = 'text-center' style='max-width: 90%;' src='" + //add html to display the "nobody expects the spanish inquisition" gif
          questionArray[0].unexpected +
          "' /></div><br>"
      );
    }

    //iterate through the question's options, display each option as a button in an unordered list, uses only the first array index, because this is unnecessarily recursive.
    //lots of comments here to make sure it can be followed
    for (i in questionArray[0].options) {
      let newLi = $("<li style='list-style-type:none'>"); //make a new list item
      let newBtn = $(
        "<button class ='btn btn-primary mx-auto' id='btn-option'>" //make a new button
      );

      $(newBtn).text(questionArray[0].options[i]); //display the option text as the button's inner text
      if (questionArray[0].options[i] === questionArray[0].answer) { //if the option is also the answer, add the "correct answer" on-click function, call the function again
        $(newBtn).click(function () {
          correctAnswer();
          promptQuestion(questionArray.slice(1, questionArray.length)); //call the function again, slicing off the first index, setting up line 233 for the next time through
        });
      } else {
        $(newBtn).click(wrongAnswer); //else, wrongAnswer (decrement time left)
      }
      $(newLi).append(newBtn);//stick the new button onto the new list item
      $("#options").append(newLi, "<br>"); // adds the new list item to the ul, gives extra space between items
    }
  }
}

displayStartScreen(); //kick this whole thing off

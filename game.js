var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
//variable to start the game
var started = false;
var level = 0;


$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

// A function to see if the game pattern matches the user pattern selected
// **It does not get called until its placed in the btn click function**
function checkAnswer(currentLevel){
  // This if statement checks to see if the same colors cliked match the game pattern
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    // This if statement checks to see if the user clicks the same amount of buttos as the game pattern showed
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over, Press any key to restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();

  }
}




// Generate a random number
function nextSequence() {
  userClickedPattern= [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  // Variable for selection a random color from the color arrays using random numbers 0-3
  var randomChosenColors = buttonColors[randomNumber];

  // Add the new randomChosenColor to the gamePattern
  // In the check Answer fucntion nextSequence gets called again if the pattern is correct, this will keep adding 1 (+1) to the array of gamePattern
  gamePattern.push(randomChosenColors);

  // Add fading effect of button, the nubmers represent the milliseconds of the effects
  $("#" + randomChosenColors).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //Refactoring the code to use this function in the nextSequence function
  playSound(randomChosenColors);
}

//Checks to see which button is clicked
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  // Adds the playSound function when the user clicks on a button
  playSound(userChosenColor);
  // Adds the animation function when the user clicks on a button
  animatePress(userChosenColor);
  //check for the last color selected in the array
  checkAnswer(userClickedPattern.length-1);
});

// Add animation to the button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
//removes the animation after 100 miliseconds
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// Add audio to buttons
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// A function to reset the variables and start the game over
function startOver(){
  level= 0;
  gamePattern = [];
  started= false;
}

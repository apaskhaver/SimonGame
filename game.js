var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

//start game, thus handles restarts
$(document).keydown(function() {
  if (!started) {
    //change title text and start sequence
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//record pattern user clicked, animate it, play sound
$(".btn").click(function() {
  //add the color user chose to an array
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  //animate and play the sound of the pressed button
  animatePress(userChosenColor);
  playSound(userChosenColor);

  //check if user's choice was correct
  checkAnswer(userClickedPattern.length - 1);
});

//generate next part of pattern, flash it, play sound. Update levels.
function nextSequence() {
  //reset pattern user clicked to make sure they keep getting it right
  userClickedPattern = [];

  //change title to update level
  $("#level-title").text("Level " + ++level);

  //randomly choose next button in game pattern sequence;
  //add to gamePattern array
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //animate new button in sequence to indicate it to the user; play its sound
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//play the sounds of the buttons
function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

//animate buttons when pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//checks answer
function checkAnswer(currentLevel) {
  //if game pattern matches what the user clicked
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //if at the end of the sequence, game picks next step in pattern
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    //user choice is wrong
    playSound("wrong");

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key To Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    //reset everything. Now on the keydown, the whole started routine
    //at the beginning of the game repeats on the keydown
    startOver();
  }
}

//reset all necessary variables
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

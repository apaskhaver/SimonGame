var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
started = false;

//start game
$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

//record pattern user clicked, animate it, play sound
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

//generate next part of pattern, flash it, play sound. Update levels.
function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + ++level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//play the sounds of the buttons
function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

//animates button when it is pressed
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
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("#level-title").text("Game Over, Press Any Key To Restart");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $(document).keydown(startOver);

    nextSequence();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

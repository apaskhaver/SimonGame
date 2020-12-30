var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//start game
$(document).keydown(nextSequence);
var level = 1;

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
  $("#level-title").text("Level " + level++);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//play the sounds of the buttons
function playSound(name) {
  //array of audio elements
  for (var i = 0; i < $("audio").length; i++) {
    if (($($("audio")[i]).attr("src")).includes(name)) {
      $("audio")[i].play();
    }
  }
}

//animates button when it is pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//checks answer
function checkAnswer(currentLevel) {
  //if the last button clicked equals the last color uploaded to gamePattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    for (var i = 0; i < $("audio").length; i++) {
      if (($($("audio")[i]).attr("src")).includes("wrong")) {
        $("audio")[i].play();
      }
    }
    $("#level-title").text("Game Over, Press Any Key To Restart");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  }
}

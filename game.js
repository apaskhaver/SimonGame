var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//record pattern user clicked
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
});

//generate next part of pattern, flash it
function nextSequence() {
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

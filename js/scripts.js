//back
var randomNumber = function() {
  return Math.floor(Math.random() * 6) + 1;
}

var changeTurn = function() {
  if (playerOne.isMyTurn === true) {
    playerOne.isMyTurn = false;
    playerTwo.isMyTurn = true;
    $("#currentPlayer").text("2");
  } else if (playerTwo.isMyTurn === true) {
    playerTwo.isMyTurn = false;
    playerOne.isMyTurn = true;
    $("#currentPlayer").text("1");
  }
}

function User(name){
  this.name=name;
  this.diceOne = 0;
  this.diceTwo = 0;
  this.currentScore = 0;
  this.totalScore = 0;
  this.isMyTurn = false;
}

User.prototype.roll = function() {
  this.diceOne = randomNumber();
  this.diceTwo = randomNumber();
  $("#diceOne").text(this.diceOne);
  $("#diceTwo").text(this.diceTwo);
  if (this.diceOne === 1 || this.diceTwo === 1) {
    this.currentScore = 0;
    changeTurn();
    $("#currentTotal").text(this.currentScore);
  } else {
    this.currentScore = this.currentScore + this.diceOne + this.diceTwo;
    $("#currentTotal").text(this.currentScore);
  }
}

User.prototype.hold = function() {
  this.totalScore += this.currentScore;
  this.currentScore = 0;
  if (playerOne.isMyTurn === true) {
    $("#currentTotal").text("0");
    $("#playerOneTotal").text(this.totalScore);
    changeTurn();
  } else if (playerTwo.isMyTurn === true) {
    $("#currentTotal").text("0");
    $("#playerTwoTotal").text(this.totalScore);
    changeTurn();
  }
}

var playerOne = new User("Player One"); //random blah blah blah
playerOne.isMyTurn = true;
var playerTwo = new User("Player Two");
//front
$(document).ready(function() {
  $("#playButton").click(function() {
    if (playerOne.isMyTurn === true) {
      playerOne.roll();
    } else if (playerTwo.isMyTurn === true) {
      playerTwo.roll();
    }
  });
  $("#stopButton").click(function() {
    if (playerOne.isMyTurn === true) {
      playerOne.hold();
    } else if (playerTwo.isMyTurn === true) {
      playerTwo.hold();
    }
  });
});

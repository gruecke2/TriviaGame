/**
 * Author: Garret Rueckert
 *
 * Homework 4
 *
 * Trivia Game
 *
 * UofU Bootcamp 2018
 */

$(document).ready(function() {
  $(".io").hide();
  var answerList = $("#options");
  var question = $("#question");
  var startBtn = $("#start");
  var numCorrect = 0;
  var numIncorrect = 0;
  var totalQs = 6;

  var questionTextArray = [
    '"Just a small town _______"',
    '"_______ has got it going on"',
    '"The boys are back _______"',
    '"In the days of my youth, I was told what it means _______"',
    '"You show us everything you got,\nYou keep on dancing and the room gets hot,\nYou drive us wild _______!"',
    '"For those about to rock, _______!\n'
  ];

  var answers = [
    ["girl", "boy", "world", "man"], //0
    ["Stacy's bomb", "Stacy's mom", "sugar sugar", "Mickey"], //1
    ["in town", "in the saddle again", "in black", "and at it again"], //0
    ["to love again", "to rock", "to be good", "to be a man"], //3
    [
      "and keep going crazy",
      "we'll keep you movin'",
      "we'll drive you crazy",
      "we'll rock you easy"
    ], //2
    ["it's a long ways", "never stop", "fire away", "we salute you"] //3
  ];

  var correctAns = [0, 1, 0, 3, 2, 3];

  //four list items per question
  var ans1 = $("<li>");
  var ans2 = $("<li>");
  var ans3 = $("<li>");
  var ans4 = $("<li>");

  //clock variables
  var clockrunning = false;
  var intervalID;

  //clock object
  var clock = {
    time: 10,
    questionNumber: 0,

    next: function() {
      clock.time = 10;
      if (clock.questionNumber < totalQs - 1) {
        clock.questionNumber++;
        clock.updateDisplays();
      } else {
        endGame();
      }
    },

    updateDisplays() {
      populateQ(clock.questionNumber);
      $("#timer").text(clock.time);
    },

    start: function() {
      if (!clockrunning) {
        clockrunning = true;
        intervalID = setInterval(clock.count, 1000);
      }
    },

    stop: function() {
      clearInterval(intervalID);
      clockrunning = false;
    },

    count: function() {
      clock.time--;
      $("#timer").text(clock.time);
      if (clock.time === 0) clock.next();
    }
  };

  function populateQ(qNum) {
    var qText = questionTextArray[qNum];
    ans1.text(answers[qNum][0]);
    ans2.text(answers[qNum][1]);
    ans3.text(answers[qNum][2]);
    ans4.text(answers[qNum][3]);

    $(question).text(qText);
    $(answerList).append(ans1);
    $(answerList).append(ans2);
    $(answerList).append(ans3);
    $(answerList).append(ans4);
  }

  function evaluate(selection) {
    if (selection == correctAns[clock.questionNumber]) {
      numCorrect++;
      clock.next();
    } else {
      numIncorrect++;
      clock.next();
    }
  }

  function endGame() {
    clock.stop();
    $(question).text("Game over! Here's how you did!");
    $(ans1).text("Number correct: " + numCorrect);
    $(ans2).text("Number incorrect: " + numIncorrect);
    $(ans3).text(
      "You scored approximately " +
        Math.floor((numCorrect * 100) / totalQs) +
        "%!"
    );
    $(ans4).text("");
    $(answerList).append(startBtn);
    startBtn.text("Click to restart!");
    startBtn.show();
    numCorrect = 0;
    numIncorrect = 0;
    clock.questionNumber = 0;

  }

  $(ans1).on("click", function() {
    if(clockrunning) evaluate(0);
  });
  $(ans2).on("click", function() {
    if(clockrunning) evaluate(1);
  });
  $(ans3).on("click", function() {
    if(clockrunning) evaluate(2);
  });
  $(ans4).on("click", function() {
    if(clockrunning) evaluate(3);
  });

  $(startBtn).on("click", function(){
    $(startBtn).hide();
    $(".io").show();
    clock.start();
    clock.updateDisplays();
  })

  
});

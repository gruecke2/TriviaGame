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
  var numMissed = 0;
  var totalQs = 6;

  //Text for the quuestions
  var questionTextArray = [
    '"Just a small town _______"',
    '"_______ has got it going on"',
    '"The boys are back _______"',
    '"In the days of my youth, I was told what it means _______"',
    '"You show us everything you got,\nYou keep on dancing and the room gets hot,\nYou drive us wild _______!"',
    '"For those about to rock, _______!"'
  ];

  //Hard coded answers, comments reflect the correct option
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

  var imgLinks = [
    "assets/images/escape.png",
    "assets/images/stacy.png",
    "assets/images/jailbreak.jpg",
    "assets/images/zeppelin.jpg",
    "assets/images/kiss.jpg",
    "assets/images/ACDC.jpg"
  ];

  var correctAns = [0, 1, 0, 3, 2, 3];

  //four list items per question
  var ans1 = $("<li>");
  var ans2 = $("<li>");
  var ans3 = $("<li>");
  var ans4 = $("<li>");

  //splashscreen elements
  var imgTag = $("<img>");
  imgTag.addClass("splash img-fluid rounded");
  var result = $("<div>");
  result.addClass("splash");

  //clock variables
  var clockrunning = false;
  var intervalID;

  //clock object
  var clock = {
    time: 10,
    questionNumber: 0,
    splashTime: 5,

    //Move to next question
    next: function() {
      $(".splash").hide();
      $(".io").show();
      clock.time = 10;
      if (clock.questionNumber < totalQs - 1) {
        clock.questionNumber++;
        clock.updateDisplays();
      } else {
        endGame();
      }
    },

    //Set the question and update the timer back to 10
    updateDisplays() {
      populateQ(clock.questionNumber);
      $("#timer").text(clock.time);
    },

    //Get clock running
    start: function() {
      if (!clockrunning) {
        clockrunning = true;
        intervalID = setInterval(clock.count, 1000);
      }
    },

    //stop the clock
    stop: function() {
      clearInterval(intervalID);
      clockrunning = false;
    },

    //Clock ticks down from 10 to 0
    count: function() {
      clock.time--;
      $("#timer").text(clock.time);
      if (clock.time === 0) {
        numMissed++;
        splashScreen(clock.questionNumber, false);
        setTimeout(function() {
          clock.start();
          clock.next();
        }, 5000);
      }
    }
  };

  /**
   * Displays a splash screen with appropriate image
   * (per question) for a short time
   * @param qNum The question number
   *
   */
  function splashScreen(qNum, correct) {
    clock.stop();
    $(".io").hide();
    $(".splash").show();
    //clock.stop();

    var txt = correct ? "Correct!" : "Incorrect :(";
    result.html("<h2>"+txt+"</h2>");
    imgTag.attr("src", imgLinks[qNum]);
    $("#message").append(result);
    $("#splashImg").append(imgTag);
  }

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

  /**
   * Checks the selected answer vs what the correct answer would be per question
   * @param selection The option selected
   *
   */
  function evaluate(selection) {
    if (selection == correctAns[clock.questionNumber]) {
      numCorrect++;
      splashScreen(clock.questionNumber, true);
      setTimeout(function() {
        clock.start();
        clock.next();
      }, 5000);
    } else {
      numIncorrect++;
      splashScreen(clock.questionNumber, false);
      setTimeout(function() {
        clock.start();
        clock.next();
      }, 5000);
    }
  }

  /**
   * Stops the clock, resets the game. Called on start/restart button function
   */
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
    $(ans4).text("You timed out on " + numMissed + " questions");
    $(answerList).append(startBtn);
    startBtn.text("Click to restart!");
    startBtn.show();
    numCorrect = 0;
    numIncorrect = 0;
    clock.questionNumber = 0;
  }

  $(ans1).on("click", function() {
    if (clockrunning) evaluate(0);
  });
  $(ans2).on("click", function() {
    if (clockrunning) evaluate(1);
  });
  $(ans3).on("click", function() {
    if (clockrunning) evaluate(2);
  });
  $(ans4).on("click", function() {
    if (clockrunning) evaluate(3);
  });

  $(startBtn).on("click", function() {
    $(startBtn).hide();
    $(".io").show();
    clock.start();
    clock.updateDisplays();
  });
});

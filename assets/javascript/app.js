//Global Variables

//Trivia Questions
var triviaQuestions = [{
    question: "Which ingredient is in Polyjuice potion?",
    answers: ["Powdered Bicorn horn", "Snake Bile", "Eye of Newt", "Hags Hair"],
    image: ["../images/polyjuice.jpg"],
    validAnswer: 0,
    questionNum: 1,
    questionAnswered: false
}, {
    question: "Dumbledore's scar above his left knee looks like what?",
    answers: ["The Eifel Tower", "The London Underground", "Lord Voldemort", "Map of Hogwarts"],
    image: ["../images/Dumbledore.jpg"],
    validAnswer: 1,
    questionNum: 2,
    questionAnswered: false
}, {
    question: "Where did Vernon Dursley work?",
    answers: ["Berkeley Group", "Spirax-Sarco Engineering", "Grunnings", "The Evening Standard"],
    image: ["../images/Vernon.jpg"],
    validAnswer: 2,
    questionNum: 3,
    questionAnswered: false
}, {
    question: "Which row in the Hall of Prophecy contains the prophecy about Harry and Voldemort?",
    answers: ["Row 42", "Row 97", "div class=row", "Row 1985"],
    image: ["../images/hallProphet.jpg"],
    validAnswer: 1,
    questionNum: 4,
    questionAnswered: false
}, {
    question: "What is the name of Ginny Weasley's Pygmy Puff?",
    answers: ["Artemis", "Snowball", "Stephanie", "Arnold"],
    image: ["../images/pygmyPuff.jpeg"],
    validAnswer: 3,
    questionAnswered: false
}]
//Timer Variables 
var time = 120;
var intervalId;

var userGuess = "";
var correctCount = 0;
var wrongCount = 0;




//Function to render Question and Answers
function questionRender() {
    $(triviaQuestions).each(function (index, element) {
        element = this;
        var questBox = $('<div>');
        var questionLine = $('<h3>').text(element.question);
        var answersbox = $('<div>')
        var answersline = $('<ol>')
        var i = 0 
        for (i=0; i < 4; i++){
            var answerChoice = $('<li class="tChoice">').html(element.answers[i]);
            $(answerChoice).attr("questIndex", index);
            $(answerChoice).attr("answerIndex", i);
            answersline.append(answerChoice);
        }
        answersbox.append(answersline)
        questBox.append(questionLine, answersline);
        $(".maingame").append(questBox);
       
    });
    $(".tChoice").on("click", function() {
        $(this).css("border", "goldenrod 2px solid" )
        var questIndex = parseInt($(this).attr("questIndex"));
        var userGuess = parseInt($(this).attr("answerIndex"));
        var currentQuestion = triviaQuestions[questIndex];
        var correctAnswer = currentQuestion.validAnswer;

        if (userGuess === correctAnswer && currentQuestion.questionAnswered == false) {
            currentQuestion.questionAnswered = true;
            correctCount++;
            userGuess="";
        } else if (currentQuestion.questionAnswered == false) {
            currentQuestion.questionAnswered = true;
            wrongCount++;
            userGuess=""; 
        }
    })
}
function timer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}
function decrement() {
    time--;
    $(".timer").text("Time Left: " + time);
    if (time === 0) {
        stop();
    }
}
    function stop() {
        $(".timer").html("Time's Up!")
        clearInterval(intervalId);
        $(".maingame").html("<h1> Better Luck Next Time!")
    }

    function renderSubmit () {
        var submit = $("<button>");
        $(submit).text("Submit");
        $(submit).addClass("submitButt");
        $(".maingame").append(submit);
    }

    //On Load window function
    $(document).ready(function () {
        //Start Button to activate game
        $(".startButt").on("click", function () {
            renderSubmit ();
            questionRender();
            $(".startButt").hide();
            $(".instText").html("");
            timer();
            $(".submitButt").on("click", function (){
                stop ()
                $(".maingame").html("<h1> Right Count: " + correctCount);
                $(".maingame").append("<h1> Wrong Count: " + wrongCount);
            })
        });
       
    });


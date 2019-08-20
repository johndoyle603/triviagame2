let counter = 5;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;
let possibleAnswers = (homerBlasts[currentQuestion].possibleAnswers);

// Start 30-second countdown for user to respond or choose 

function nextQuestion() {

    let isQuestionOver = (homerBlasts.length - 1) === currentQuestion;
    if (isQuestionOver) {
        console.log("Game over babie");
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }
}

function timeUp() {
    clearInterval(timer);
    lost++;
    nextQuestion();
}

function countDown() {

    counter--;

    $('#time').html('Time left: ' + counter + ' seconds!');

    if (counter === 0) {
        timeUp();
    }



}

function loadQuestion() {
    counter = 5;
    timer = setInterval(countDown, 1000)

    let question = homerBlasts[currentQuestion].question;
    let possibleAnswers = homerBlasts[currentQuestion].possibleAnswers;

    $('#time').html('Time left: ' + counter + ' seconds!');
    $('#game').html(`
        <h4>${question}</h4>
        ${loadPossibleAnswers(possibleAnswers)}
       
`)
}

function loadPossibleAnswers(possibleAnswers) {
    let result = '';

    for (let i = 0; i < 4; i++) {
        result += `<p class="choice" data-answer="${possibleAnswers[i]}">${possibleAnswers[i]}</p>`;
    }

    return result;
}

// when selection made, go to next question

$(document).on('click', '.choice', function() {
    clearInterval(timer);
    let selectedAnswer = $(this).attr('data-answer');
    let wantedAnswer = homerBlasts[currentQuestion].wantedAnswer;
    if (wantedAnswer === selectedAnswer) {
        //another todo
        //user wins
        score++;
        nextQuestion();
        console.log('winner');
    } else {
        lost++;
        nextQuestion();
        console.log('loser');
    }

    console.log(selectedAnswer);
    console.log(wantedAnswer);


    console.log('yassssss', selectedAnswer);
})

function displayResult() {
    let result = `
    <p>${score} Cromulent answers!</p>
    <p>${lost} were the Worst. Answers. Ever.</p>
    <button class="btn btn-primary" id="reset">Reset Game</button></p> 
`;

    $('#game').html(result);
}

$(document).on('click', '#reset', function() {
    counter = 5;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;
    console.log('Test test test!');

})

loadQuestion();

//need function that shows "right/wrong" message upon selection (whether it's just a message or an image/gif)
//need function that displays message for ~3 seconds before moving on to next question 
//need function that "reset game" button at end actually resets the game
//also need to get rid of timer after game is over
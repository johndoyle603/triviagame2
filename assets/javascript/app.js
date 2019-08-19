let counter = 5;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;
let messages = {
    right: "Cromulent!",
    wrong: "Worst. Answer. Ever",
    timesUp: "Boo-urns!",
    finished: "Weezle wuzzle!",
}
let possibleAnswers = (homerBlasts[currentQuestion].possibleAnswers);

// Start 30-second countdown for user to respond or choose 

function nextQuestion() {

    let isQuestionOver = (homerBlasts.length - 1) === currentQuestion;
    if (isQuestionOver) {
        // this is "todo"
        console.log("Game over babie");
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
       
`);
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


loadQuestion();

// variables 
let
    bodyEl = document.body,
    eachAnswerBox = document.querySelectorAll('.each-answer-box'),
    minutesEl = document.querySelector('#minutes'),
    secondsEl = document.querySelector('#seconds'),
    wholeQuestionBox = document.querySelectorAll('.whole-question-box'),
    finalResultEl = document.querySelector('#final-result'),
    currentQuestion = 0,
    correct = 0,
    wrong = 0,
    minutes = 4,
    seconds = 60,
    answersFunction,
    timerInterval;

// -----------
// creating HTML
// creates start div
// creates nav -> 2 div in it:
// 1: current question
// 2: timer box
// creates container
bodyEl.innerHTML = `
    <div id="start-div">
    <span>start</span>
    </div>
    <nav> 
    <div class="current-question hide"> 1/12</div>
    <div class="timer-box hide">
        <span id="minutes"></span>
        <span>:</span>
        <span id="seconds"></span>
    </div>
    </nav>  
    <div class="container hide"></div>
`

// variables after creating elements
let
    startBtn = document.querySelector('#start-div'),
    container = document.querySelector('.container'),
    timerBox = document.querySelector('.timer-box'),
    currentQuestionEl = document.querySelector('.current-question');

// -----------

// events
// * start button
// calls changeDisplay function to hide the button
// calls question box to create the first question
// calls timer function
// calls answer function
startBtn.addEventListener("click", () => {
    currentQuestion++
    changeDisplay(startBtn)
    changeDisplay(container)
    changeDisplay(timerBox)
    changeDisplay(currentQuestionEl)
    questionBox()
    timer()
    answerFunction()
    timerInterval = setInterval(timer, 1000)
})
// functions


// * TITLE: question box 
// creates question box
// if current questions are 1 to 13 it calls the answer1to13Box function and puts in answer box
// if current questions are 13 to 30 it calls the answer13to30Box function and puts in answer box
// reloads added items
function questionBox() {
    if (currentQuestion < 13) {
        answersFunction = answer1to13()
    } else {
        answersFunction = answer13to30()
    }
    currentQuestionFunction()
    container.innerHTML = `
            <div class="whole-question-box">
                <!-- question box -->
                <div class="question-box">
                    <img src="Images/${currentQuestion}/test${currentQuestion}.png">
                </div> 
                <!-- answer box -->
                <div class="whole-answer-box">
                ${answersFunction}
                </div >
                </div>
    `
    correctAnswers()
    // selectors
    eachAnswerBox = document.querySelectorAll('.each-answer-box')
    timerBox = document.querySelector('.timer-box')
    minutesEl = document.querySelector('#minutes')
    secondsEl = document.querySelector('#seconds')
    wholeQuestionBox = document.querySelectorAll('.whole-question-box')
}

// * TITLE: answers from 1 to 13
function answer1to13() {
    return `
        <div div class="each-answer-box" >
            <img src="Images/${currentQuestion}/${currentQuestion}-1.png">
        </div>
        <div class="each-answer-box">
            <img src="Images/${currentQuestion}/${currentQuestion}-2.png">
        </div>
        <div class="each-answer-box">
            <img src="Images/${currentQuestion}/${currentQuestion}-3.png">
        </div>
        <div class="each-answer-box">
            <img src="Images/${currentQuestion}/${currentQuestion}-4.png">
        </div>
        <div class="each-answer-box">
            <img src="Images/${currentQuestion}/${currentQuestion}-5.png">
        </div>
        <div class="each-answer-box">
            <img src="Images/${currentQuestion}/${currentQuestion}-6.png">
        </div>
        `
}


// * TITLE: answers from 13 to 30
function answer13to30() {
    return `
    <div div class="each-answer-box" >
        <img src="Images/${currentQuestion}/${currentQuestion}-1.png">
    </div>
    <div class="each-answer-box">
        <img src="Images/${currentQuestion}/${currentQuestion}-2.png">
    </div>
    <div class="each-answer-box">
        <img src="Images/${currentQuestion}/${currentQuestion}-3.png">
    </div>
    <div class="each-answer-box">
        <img src="Images/${currentQuestion}/${currentQuestion}-4.png">
    </div>
    <div class="each-answer-box">
        <img src="Images/${currentQuestion}/${currentQuestion}-5.png">
    </div>
    <div class="each-answer-box">
        <img src="Images/${currentQuestion}/${currentQuestion}-6.png">
    </div>
    <div class="each-answer-box">
        <img src="Images/${currentQuestion}/${currentQuestion}-7.png">
    </div>
    <div class="each-answer-box">
        <img src="Images/${currentQuestion}/${currentQuestion}-8.png">
    </div>
    `

}

// * TITLE: answer function
// after clicking each button it removes that question
// adds 1 to currentQuestion variable
// calls the questionBox function to create a new question
// calls currentQuestionFunction() to update current question
// calls the function it self again for, forEach to work
// if the answer is correct , the correct variable will be increased by 1
// if the answer is wrong , the wrong variable will be increased by 1
// calls the end screen if questions are done
function answerFunction() {
    if (currentQuestion <= 30) {
        eachAnswerBox.forEach(answer => {
            answer.addEventListener("click", () => {
                if (answer.classList.contains("correct")) {
                    correct++
                } else {
                    wrong++
                }
                currentQuestion++
                currentQuestionFunction()
                questionBox()
                answerFunction()
            })
        })
    } else {
        endScreen()
    }
}
// * TITLE: changeDisplay
// parameters: 
// el: element
function changeDisplay(el) {
    el.classList.toggle('hide')
}

// * TITLE: end screen
function endScreen() {
    bodyEl.innerHTML = `
    <div class="end-screen">
        <span>the test is over!</span>
        <span>correct answers: ${correct}</span>
        <span>wrong answers: ${wrong}</span>
        <span id="final-result"></span>
        <button onclick="location.reload()">take a new test</button>
    </div>
    `
    finalResultEl = document.querySelector('#final-result')
    IQStatus()
}

// * TITLE: IQStatus
function IQStatus() {
    if (correct > 25) {
        finalResultEl.innerHTML = "your IQ is super high"
    } else if (correct > 20 && correct < 25) {
        finalResultEl.innerHTML = "your IQ is high"
    }
    else if (correct > 15 && correct < 20) {
        finalResultEl.innerHTML = "your IQ is above average"
    }
    else if (correct > 10 && correct < 15) {
        finalResultEl.innerHTML = "your IQ is average"
    } else if (correct < 10) {
        finalResultEl.innerHTML = "your IQ is below average"
    }
}
// * TITLE: current question
function currentQuestionFunction() {
    if (currentQuestion < 31) {
        currentQuestionEl.innerHTML = `${currentQuestion}/30`
    }
}

// * TITLE: correctAnswers
// gives correct answers "correct" class
// class correctAnswersPath
function correctAnswers() {
    wholeQuestionBox = document.querySelectorAll('.whole-question-box')

    // question 1
    correctAnswersPath(2, 1)
    // question 2
    correctAnswersPath(0, 2)
    // question 3
    correctAnswersPath(4, 3)
    // question 4
    correctAnswersPath(4, 4)
    // question 5
    correctAnswersPath(1, 5)
    // question 6
    correctAnswersPath(0, 6)
    // question 7
    correctAnswersPath(1, 7)
    // question 8
    correctAnswersPath(1, 8)
    // question 9
    correctAnswersPath(1, 9)
    // question 10
    correctAnswersPath(5, 10)
    // question 11
    correctAnswersPath(3, 11)
    // question 12
    correctAnswersPath(0, 12)
    // question 13
    correctAnswersPath(3, 13)
    // question 14
    correctAnswersPath(6, 14)
    // question 15
    correctAnswersPath(1, 15)
    // question 16
    correctAnswersPath(2, 16)
    // question 17
    correctAnswersPath(0, 17)
    // question 18
    correctAnswersPath(5, 18)
    // question 19
    correctAnswersPath(4, 19)
    // question 20
    correctAnswersPath(7, 20)
    // question 21
    correctAnswersPath(3, 21)
    // question 22
    correctAnswersPath(3, 22)
    // question 23
    correctAnswersPath(6, 23)
    // question 24
    correctAnswersPath(5, 24)
    // question 25
    correctAnswersPath(3, 25)
    // question 26
    correctAnswersPath(6, 26)
    // question 27
    correctAnswersPath(6, 27)
    // question 28
    correctAnswersPath(2, 28)
    // question 29
    correctAnswersPath(1, 29)
    // question 30
    correctAnswersPath(7, 30)
}

// * TITLE: correctAnswersPath
// parameter:
// correct: number of child element which is correct
function correctAnswersPath(correct, questionNumber) {
    if (currentQuestion == questionNumber) {
        wholeQuestionBox[0].children[1].children[correct].classList.add("correct")
    }
}

// * TITLE: timer
// calls addZeroMinutes and addZeroToSeconds
// Interval will be set after clicking start button
// decreases seconds by 1 
// if seconds are 0 they will be set to 60 and minutes will be decreased by 1
// if minutes are 0 the interval for this function will be cleared
function timer() {
    seconds--
    addZeroMinutes()
    addZeroToSeconds()
    secondsEl.innerHTML = seconds
    minutesEl.innerHTML = minutes
    if (seconds == 0) {
        seconds = 60
        minutes--
        if (minutes == -1) {
            minutes = 0
            seconds = 0
            clearInterval(timerInterval)
            endScreen()
            alert("time is up")
        }
    }
}
// * TITLE: adds zero to minutes
function addZeroMinutes() {
    if (minutes < 10) {
        minutes = ('0' + minutes).slice(-2)
    } 
}
// * TITLE: adds zero to seconds
function addZeroToSeconds(){
    if (seconds < 10){
        seconds = ('0' + seconds).slice(-2)
    }
}

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
    notAnswered = 0,
    validate = 0,
    minutes = 14,
    seconds = 60,
    persian = "",
    english = "",
    width = 0,
    answersFunction = "",
    timerInterval;

// -----------
// creating HTML

// icon
let titleEl = document.createElement("link")
titleEl.setAttribute("rel", "icon")
titleEl.setAttribute("href", "Images/icon.ico")
document.head.appendChild(titleEl)

// creates start divB
// creates nav -> 2 div in it:
// 1: current question
// 2: timer box
// creates container
bodyEl.innerHTML = `
<input type="text" id="name"placeholder="Enter Your Name:" class="start-style inputs">
    <button id="start-button" class="start-style">START</button>
    <nav> 
    <div id="timer-current-question" class="hide">
    <div class="current-question"></div>
    
    <div class="timer-box">
        <span id="minutes"></span>
        <span>:</span>
        <span id="seconds"></span>
    </div>
    </div>
    </nav>  
    <div class="container hide"></div>
    
    <div id="box" class="hide">
    <div id="progress-bar"> </div>
    </div>  
`

// variables after creating elements
let
    startBtn = document.querySelector('#start-button'),
    container = document.querySelector('.container'),
    timerBox = document.querySelector('.timer-box'),
    usersNameInput = document.querySelector('#name'),
    currentQuestionEl = document.querySelector('.current-question'),
    timerAndCurrentEl = document.querySelector('#timer-current-question'),
    progressBar = document.querySelector('#progress-bar'),
    progressBox = document.querySelector('#box');

// -----------

// events

startBtn.addEventListener("click", () => {
    startFunction()
})
document.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        startFunction()
    }
})

// functions

// TITLE: start function
// calls changeDisplay function to hide the button
// calls questionBox function to create the first question
// calls timer function
// sets an Interval for timer function and stores it in timerInterval variable
// calls answer function
function startFunction() {
    if (usersNameInput.value != "") {
        currentQuestion++
        changeDisplay(startBtn)
        changeDisplay(container)
        changeDisplay(usersNameInput)
        changeDisplay(timerAndCurrentEl)
        changeDisplay(progressBox)
        questionBox()
        timer()
        timerInterval = setInterval(timer, 1000)
        answerFunction()
    } else {
        alert("enter a value")
    }
}

// TITLE: question box 
// sets answersFunction variable to empty so the previous answers are not printed
// if current question is less than 13 calls the answerFunctionTemplate 6 times and puts it in answersFunction
// if current question is more than 13 calls the answerFunctionTemplate 8 times and puts it in answersFunction
// calls currentQuestionFunction() to update the current question number
// creates question box
// calls correctAnswers function to give correct class name to correct answers
// reloads added items
// if currentQuestion is more than 12 (13 to 30) the question box min-height will change to 600px
function questionBox() {
    answersFunction = ""
    // answers function
    if (currentQuestion < 13) {
        for (let i = 1; i < 7; i++) {
            answersFunction += answerFunctionTemplate(i)
        }
    } else {
        for (let i = 1; i < 9; i++) {
            answersFunction += answerFunctionTemplate(i)
        }
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

// TITLE: addWidth
function addWidth() {
    width += 1.7
    progressBar.style.width = width + "%"
}
// TITLE: answers function
function answerFunctionTemplate(number) {
    return `
    <div div class="each-answer-box">
        <img src="Images/${currentQuestion}/${currentQuestion}-${number}.png">
    </div>
    `
}

// TITLE: current question
// changes the currentQuestionEL innerHTML after called
function currentQuestionFunction() {
    if (currentQuestion < 31) {
        addWidth()
        currentQuestionEl.innerHTML = `${currentQuestion}/30`
    }
}

// TITLE: answer function
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

// TITLE: changeDisplay
// parameters: 
// el: element
function changeDisplay(el) {
    el.classList.toggle('hide')
}

// TITLE: end screen
// reassigns notAnswered
// clears the Interval of timerInterval variable
// creates end screen inside of the body by calling endTemplate
// reloads added items
// calls IQStatus to calculate the user answers
// if statement to prevent user from calling the function in Developer Console
// calls translate function
function endScreen() {
    notAnswered = 30 - (correct + wrong)
    if (usersNameInput.value != "") {
        clearInterval(timerInterval)
        endTemplate("تست به پایان رسید", "جواب های درست", "جواب های غلط", "پاسخ داده نشده", "تست جدید شروع کنید", "rtl", "fa", "،")
        IQStatus()
    } else {
        alert("please enter a name")
    }

    // selectors 
    english = document.querySelector('#english')
    persian = document.querySelector('#persian')
    translate()
}


// TITLE: translate
// changes body inner HTML according to language
// reassigns finalResultEl 
// calls IQstatus 
// re-assign english and persian element 
// calls the function it self to do apply the event listeners
function translate() {
    persian.addEventListener("click", () => {
        endTemplate("تست به پایان رسید", "جواب های درست", "جواب های غلط", "پاسخ داده نشده", "تست جدید شروع کنید", "rtl", "fa", "،")
        IQStatus()
        translate()
    })
    english.addEventListener("click", () => {
        endTemplate("the test is over!", "correct answers", "wrong answers", "not answered", "take a new test", "ltr", "en", ",")
        IQStatus()
        translate()
    })
}

// TITLE: endScreen Template
function endTemplate(testOver, correctText, wrongText, notAnsweredText, newTest, direction, language, comma) {
    bodyEl.innerHTML = `
    <div class="end-screen" lang=${language} style="direction:${direction};">
    <div id="translate">
    <span id="english" class="end-screen-spans-hoverAble">EN</span>
    <span id="persian" class="end-screen-spans-hoverAble">FA</span>
    </div>
    <span>${usersNameInput.value}${comma} ${testOver}</span>
    <span>${correctText} = ${correct}</span>
    <span>${wrongText} = ${wrong}</span>
    <span class="end-screen-spans">${notAnsweredText} = ${notAnswered}</span>
    <span id="final-result"></span>
    <span onclick="location.reload()" class="end-screen-spans-hoverAble">${newTest}</span>
    </div>
    `
    finalResultEl = document.querySelector('#final-result')
    english = document.querySelector('#english')
    persian = document.querySelector('#persian')
}

// TITLE: IQStatus
// changes finalResultEl innerHTML according to user results of the test
// calls checkLanguage function
function IQStatus() {
    if (correct >= 25) {
        checkLanguage("Your IQ is SUPER high!", "ضریب هوشی شما بسیار بالا است")
    } else if (correct >= 15) {
        checkLanguage("Your IQ is average", "ضریب هوشی شما متوسط است")
    } else if (correct <= 15) {
        checkLanguage("Your IQ is the lowest level (Cognitively impaired)", "ضریب هوشی شما پاییت ترین حالت ممکن است")

    }
    // TITLE: check language
    // if lang is en = message will go to enMessage parameter
    // if lang is fa = message will go to faMessage parameter
    function checkLanguage(enMessage, faMessage) {
        finalResultEl.innerHTML = document.querySelector('#final-result')
        if (finalResultEl.parentElement.getAttribute("lang") == "en") {
            finalResultEl.innerHTML = enMessage
        } else if (finalResultEl.parentElement.getAttribute("lang") == "fa") {
            finalResultEl.innerHTML = faMessage
        }
    }
}

// TITLE: correctAnswers
// gives correct answers "correct" class
// calls correctAnswersPath function
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

// TITLE: correctAnswersPath
// parameter:
// correct: number of child element which is correct
// questionNumber: the question number
function correctAnswersPath(correct, questionNumber) {
    if (currentQuestion == questionNumber) {
        wholeQuestionBox[0].children[1].children[correct].classList.add("correct")
    }
}

// TITLE: timer
// calls addZeroMinutes and addZeroToSeconds
// Interval will be set after clicking start button
// decreases seconds by 1 
// if seconds are 0 they will be set to 60 and minutes will be decreased by 1
// if minutes are 0 the interval for this function will be cleared
// endScreen will be called after timer is 00:00

function timer() {
    seconds--
    addZeroToMinutes()
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
// TITLE: adds zero to minutes
function addZeroToMinutes() {
    if (minutes < 10) {
        minutes = ('0' + minutes).slice(-2)
    }
}

// TITLE: adds zero to seconds
function addZeroToSeconds() {
    if (seconds < 10) {
        seconds = ('0' + seconds).slice(-2)
    }
}
import axios from 'axios'
import {data} from './data/capitales_europe'

const gameBlock  = document.querySelector('div.gameBlock')
const liveScore  = gameBlock.querySelector('div.liveScore')
const game       = gameBlock.querySelector('div.game')
const beforeGame = game.querySelector('div.beforeGame')
const btnPlay    = beforeGame.querySelector('button.btnPlay')

const countdown = game.querySelector('div.countdown')

let alreadyUsed = []

const gaming       = gameBlock.querySelector('div.gaming')
const timer        = gaming.querySelector('div.timer')
const flag         = gaming.querySelector('div.flag')
console.log(flag)
const question     = gaming.querySelector('p.question')
const pronom       = question.querySelector('span.pronom')
const paysQuestion = question.querySelector('span.pays')
const answers      = gaming.querySelectorAll('div.answers div.answer')
const counter      = gaming.querySelector('div.counter')

let score             = 0
let nbQuestionsGaming = 0
let nbMaxQuestions    = 20
let nbSeconds         = 60
let quizIsFinished    = false

const result    = gameBlock.querySelector('div.result')
const playAgain = result.querySelector('button.playAgain')

btnPlay.addEventListener('click', displayCountdown)

function setTimer() {
    timer.textContent = `${nbSeconds}`

    var interval = setInterval(function(){
        if (quizIsFinished) {
            clearInterval(interval)
            return
        }

        nbSeconds--
        timer.textContent = `${nbSeconds}`

        if (nbSeconds <= 0) {
            clearInterval(interval)
            endGame()
        }
    }, 1000)
}

function endGame() {
    quizIsFinished = true
    gaming.style.display = 'none'
    result.style.display = 'flex'

    emptyCounter()
    displayCounter()

    alreadyUsed = []

    const data = {
        type : 'capitales-europe',
        score: score,
        time : nbSeconds > 0 ? nbSeconds : 0
    }

    axios.post('/game/save', data)
        .then((res) => {

        })
        .catch((err) => {

        })
}

function displayCountdown() {
    let counter              = 3
    beforeGame.style.display = 'none'
    countdown.style.display  = 'flex'
    countdown.textContent    = `${counter}`
    quizIsFinished           = false
    nbSeconds                = 60

    var i = setInterval(function(){
        counter--
        countdown.textContent = `${counter}`

        if (counter === 0) {
            countdown.style.display = 'none'
            gaming.style.display    = 'flex'

            clearInterval(i)
            newQuestion()
            setTimer()
        }
    }, 800)
}

function newQuestion() {
    shuffle(data)
    const temporaireData = data
    let possibleAnswers  = []

    temporaireData.forEach((element) => {
        if (!alreadyUsed.includes(element.Pays)) {
            possibleAnswers.push(element)
        }
    })

    const random = getRandomPays(possibleAnswers)
    if (random === undefined) {
        endGame()
        return
    }

    pronom.textContent       = random.Pronom
    paysQuestion.textContent = random.Pays

    test(random.Pays)

    var displayAnswers = [random]
    alreadyUsed.push(random.Pays)
    data.forEach((element) => {
        if (displayAnswers.length < 4 && element.Pays !== random.Pays) {
            displayAnswers.push(element)
        }
    })

    shuffle(displayAnswers)

    var index = 0
    answers.forEach((answer) => {
        answer.innerHTML = displayAnswers[index].Capitale
        answer.setAttribute('data-pays', displayAnswers[index].Pays)
        index++
    })
}

function updateCounter(bool) {
    const counters = gaming.querySelectorAll('button.bubble')

    counters[nbQuestionsGaming].style.backgroundColor = bool ? 'green' : 'red'
}

function displayCounter() {
    for (let i = 0; i < nbMaxQuestions; i++) {
        let newElement = document.createElement('button')
        newElement.classList.add('bubble')
        counter.appendChild(newElement)
    }
}

displayCounter()

function shuffle(array) {
    array.sort(() => Math.random() - 0.5)
}

function getRandomPays(data) {
    return data[Math.floor(Math.random() * data.length)]
}

answers.forEach((answer) => {
    answer.addEventListener('click', function() {
        const pays = answer.getAttribute('data-pays')
        let answerIsCorrect = false

        if (pays === paysQuestion.textContent) {
            score += 500
            liveScore.textContent = score
            answerIsCorrect       = true
        } else {
            //nbSeconds -= 5
        }

        updateCounter(answerIsCorrect)

        nbQuestionsGaming++

        if (nbQuestionsGaming === nbMaxQuestions) {
            endGame()
            return
        }

        newQuestion()
    })
})

function emptyCounter() {
    const counters = counter.querySelectorAll('button.bubble')

    counters.forEach((bubble) => {
        bubble.remove()
    })
}

playAgain.addEventListener('click', function() {
    result.style.display     = 'none'
    beforeGame.style.display = 'block'
    score                    = 0
    liveScore.textContent    = score
    nbQuestionsGaming        = 0
    nbMaxQuestions           = 20
})
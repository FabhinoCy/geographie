import axios from 'axios'
import {data} from './data/capitales_europe'

/** debut refonte */

const gameBlock  = document.querySelector('div.gameBlock')
const liveScore  = gameBlock.querySelector('div.liveScore')
const game       = gameBlock.querySelector('div.game')
const beforeGame = game.querySelector('div.beforeGame')
const btnPlay    = beforeGame.querySelector('button.btnPlay')

// Quand on clique sur jouer
btnPlay.addEventListener('click', function() {
    //btnPlay.style.display = 'none'
    //countdown()
    
    beforeGame.style.display = 'none'
})

/** fin refonte */

/*var blockGame  = document.getElementById('block-game')
var titre      = blockGame.querySelector('h1')
//var btnPlay    = blockGame.querySelector('.btnPlay')
var answers    = blockGame.querySelector('#answers')
//var liveScore  = document.getElementById('liveScore')
var result     = document.getElementById('result')
var playAGain  = document.getElementById('playAgain')
var goodAnswer = document.getElementById('goodAnswer')
var resultTime = document.getElementById('time')
var stats      = document.getElementById('stats')*/

/*var score             = 0
var nbQuestionsGaming = 0
var nbMaxQuestions    = 6
var time              = 1
var gameFinished      = false
var alreadyUsed       = []

function runTime() {
    const timer = setInterval(function() {
        time++
    }, 1000)
    if (gameFinished === true) {
        clearInterval(timer)
        time = 1
    }
}

playAGain.addEventListener('click', function() {
    playAgain()
})

function playAgain() {
    titre.innerHTML          = 'Capitales d\'Europe'
    liveScore.style.display  = 'none'
    resultTime.style.display = 'none'
    playAGain.style.display  = 'none'
    btnPlay.style.display    = 'flex'
    score                    = 0
    nbQuestionsGaming        = 0
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5)
}

function getRandomPays(data) {
    return data[Math.floor(Math.random() * data.length)]
}

function countdown() {
    liveScore.style.display = 'none'

    stats.style.display = 'none'

    var counter     = 3
    titre.innerHTML = `${counter}`

    var i = setInterval(function(){
        counter--
        titre.innerHTML = counter

        if (counter === 0) {
            clearInterval(i)
            newQuestion()
            runTime()
            answers.style.display   = 'flex'
            liveScore.style.display = 'block'
        }
    }, 200)
}

function endGame() {
    titre.innerHTML          = 'Partie terminée'
    answers.style.display    = 'none'
    playAGain.style.display  = 'block'
    gameFinished             = true
    resultTime.style.display = 'block'
    resultTime.innerHTML     = 'Temps de la partie : ' + time + ' s'

    const data = {
        type: 'capitales-europe',
        score: score,
        time: time
    }

    // faire une requête vers le controller pour envoyer les données en bdd
    axios.post('/game/test', data)
        .then((res) => {

        })
        .catch((err) => {

        })
}

function newQuestion() {
    shuffle(data)

    const temporaireData  = data
    const possibleAnswers = []

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
    var pays        = random.Pays
    titre.innerHTML = pays

    var displayAnswers = [random]
    alreadyUsed.push(pays)
    data.forEach((element) => {
        if (displayAnswers.length < 4 && element.Pays !== pays) {
            displayAnswers.push(element)
        }
    })

    shuffle(displayAnswers)

    const spans = answers.querySelectorAll('span')
    var index   = 0
    spans.forEach((span) => {
        span.innerHTML = displayAnswers[index].Capitale
        span.setAttribute('data-pays', displayAnswers[index].Pays)
        index++
    })
}

btnPlay.addEventListener('click', function() {
    btnPlay.style.display = 'none'
    countdown()
})

var spans = answers.querySelectorAll('span')
spans.forEach((span) => {
    span.addEventListener('click', function() {
        const pays = span.getAttribute('data-pays')

        if (pays === titre.textContent) {
            score++
            goodAnswer.style.display = 'block'
            const i = setInterval(function() {
                goodAnswer.style.display = 'none'
                clearInterval(i)
            }, 400)
        }

        nbQuestionsGaming++
        liveScore.textContent = `${score} / ${nbQuestionsGaming}`

        if (nbQuestionsGaming === nbMaxQuestions) {
            endGame()
            return
        }

        newQuestion()
    })
})*/
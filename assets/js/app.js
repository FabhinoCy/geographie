import axios from 'axios'

export default function createQuiz({ data, continent, maxQuestions = 20, timerSeconds = 60 }) {
    const gameBlock  = document.querySelector('div.gameBlock')
    const liveScore  = gameBlock.querySelector('div.liveScore')
    const game       = gameBlock.querySelector('div.game')
    const beforeGame = game.querySelector('div.beforeGame')
    const btnPlay    = beforeGame.querySelector('button.btnPlay')
    const countdown  = game.querySelector('div.countdown')
    const stats      = gameBlock.querySelector('div.otherStats')

    let alreadyUsed    = []
    const gaming       = gameBlock.querySelector('div.gaming')
    const timer        = gaming.querySelector('div.timer')
    const question     = gaming.querySelector('p.question')
    const pronom       = question.querySelector('span.pronom')
    const paysQuestion = question.querySelector('span.pays')
    const answers      = gaming.querySelectorAll('div.answers div.answer')
    const counter      = gaming.querySelector('div.counter')

    let score              = 0
    let nbQuestionsGaming  = 0
    let nbSeconds          = timerSeconds
    let quizIsFinished     = false
    const result           = gameBlock.querySelector('div.result')
    const resultScore      = result.querySelector('span.score')
    const resultTime       = result.querySelector('span.time')
    const resultFinalScore = result.querySelector('span.finalScore')
    const playAgain        = result.querySelector('button.playAgain')
    const rankings         = document.querySelector('div.rankings')

    btnPlay.addEventListener('click', displayCountdown)

    function setTimer() {
        timer.textContent = `${nbSeconds}`
        const interval    = setInterval(function() {
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
        quizIsFinished             = true
        gaming.style.display       = 'none'
        result.style.display       = 'flex'
        resultScore.innerHTML      = `Votre score : <span class="big">${score}</span>`
        resultTime.innerHTML       = `Temps de la partie : <span class="big">${timerSeconds - nbSeconds}</span>s`
        resultFinalScore.innerHTML = `Résultat final : <span class="big">${(nbSeconds * score)}</span> points`
        alreadyUsed                = []

        emptyCounter()
        displayCounter()
        otherStats()
        saveScore()
    }

    function saveScore() {
        const dataToSave = {
            type: `capitales-${continent}`,
            score: score,
            time: nbSeconds > 0 ? nbSeconds : 0,
        }

        axios.post('/game/save', dataToSave)
            .then(() => {
                scoreboard()
            })
    }

    function displayCountdown() {
        let counter              = 3
        beforeGame.style.display = 'none'
        countdown.style.display  = 'flex'
        countdown.textContent    = `${counter}`
        quizIsFinished           = false
        nbSeconds                = timerSeconds

        const i = setInterval(function() {
            counter--
            countdown.textContent = `${counter}`
            if (counter === 0) {
                countdown.style.display = 'none'
                gaming.style.display    = 'flex'
                clearInterval(i)
                newQuestion()
                setTimer()
            }
        }, 80)
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
        setImage(random.Pays)

        let displayAnswers = [random]
        alreadyUsed.push(random.Pays)
        data.forEach((element) => {
            if (displayAnswers.length < 4 && element.Pays !== random.Pays) {
                displayAnswers.push(element)
            }
        })

        shuffle(displayAnswers)

        let index = 0
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
        for (let i = 0; i < maxQuestions; i++) {
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
                answerIsCorrect = true
            }
            updateCounter(answerIsCorrect)
            nbQuestionsGaming++
            if (nbQuestionsGaming === maxQuestions) {
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
    })

    function otherStats() {
        axios.get('/game/capitales-europe/stats')
            .then(res => {
                stats.innerHTML = res.data
            })
            .catch(err => {
                console.log(err)
            })
    }

    otherStats()

    function scoreboard() {
        axios.get(`/game/scoreboard/capitales-${continent}`)
            .then(res => {
                rankings.innerHTML = res.data
            })
    }

    scoreboard()
}

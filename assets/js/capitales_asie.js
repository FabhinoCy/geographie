var blockGame  = document.getElementById('block-game')
var titre      = blockGame.querySelector('h1')
var btnPlay    = blockGame.querySelector('.btnPlay')
var answers    = blockGame.querySelector('#answers')
var liveScore  = document.getElementById('liveScore')
var result     = document.getElementById('result')
var playAGain  = document.getElementById('playAgain')
var goodAnswer = document.getElementById('goodAnswer')
var resultTime = document.getElementById('time')

var score             = 0
var nbQuestionsGaming = 0
var nbMaxQuestions    = 10
var time              = 1
var gameFinished      = false

function runTime() {
    const timer = setInterval(function() {
        if (gameFinished === true) {
            clearInterval(timer)
        }
        time += 1
    }, 1000)
}

playAGain.addEventListener('click', function() {
    playAgain()
})

function playAgain() {
    playAGain.style.display  = 'none'
    score                    = 0
    nbQuestionsGaming        = 0
    liveScore.textContent    = `${score} / ${nbQuestionsGaming}`
    alreadyUsed              = []
    resultTime.style.display = 'none'

    countdown()
}

var data = [
    { 'Pays': 'Afghanistan', 'Capitale': 'Kaboul', },
    { 'Pays': 'Arménie', 'Capitale': 'Erevan', },
    { 'Pays': 'Azerbaïdjan', 'Capitale': 'Bakou', },
    { 'Pays': 'Bahreïn', 'Capitale': 'Manama', },
    { 'Pays': 'Bangladesh', 'Capitale': 'Dacca', },
    { 'Pays': 'Bhoutan', 'Capitale': 'Thimphou', },
    { 'Pays': 'Birmanie (Myanmar)', 'Capitale': 'Naypyidaw', },
    { 'Pays': 'Brunei', 'Capitale': 'Bandar Seri Begawan', },
    { 'Pays': 'Cambodge', 'Capitale': 'Phnom Penh', },
    { 'Pays': 'Chine', 'Capitale': 'Pékin', },
    { 'Pays': 'Chypre', 'Capitale': 'Nicosie', },
    { 'Pays': 'Corée du Nord', 'Capitale': 'Pyongyang', },
    { 'Pays': 'Corée du Sud', 'Capitale': 'Séoul', },
    { 'Pays': 'Émirats arabes unis', 'Capitale': 'Abou Dabi', },
    { 'Pays': 'Géorgie', 'Capitale': 'Tbilissi', },
    { 'Pays': 'Inde', 'Capitale': 'New Delhi', },
    { 'Pays': 'Indonésie', 'Capitale': 'Jakarta', },
    { 'Pays': 'Irak', 'Capitale': 'Bagdad', },
    { 'Pays': 'Iran', 'Capitale': 'Téhéran', },
    { 'Pays': 'Israël', 'Capitale': 'Jérusalem', },
    { 'Pays': 'Japon', 'Capitale': 'Tokyo', },
    { 'Pays': 'Jordanie', 'Capitale': 'Amman', },
    { 'Pays': 'Kazakhstan', 'Capitale': 'Astana', },
    { 'Pays': 'Koweït', 'Capitale': 'Koweït', },
    { 'Pays': 'Kirghizistan', 'Capitale': 'Bichkek', },
    { 'Pays': 'Laos', 'Capitale': 'Vientiane', },
    { 'Pays': 'Liban', 'Capitale': 'Beyrouth', },
    { 'Pays': 'Malaisie', 'Capitale': 'Kuala Lumpur', },
    { 'Pays': 'Maldives', 'Capitale': 'Malé', },
    { 'Pays': 'Mongolie', 'Capitale': 'Oulan-Bator', },
    { 'Pays': 'Népal', 'Capitale': 'Katmandou', },
    { 'Pays': 'Oman', 'Capitale': 'Mascate', },
    { 'Pays': 'Pakistan', 'Capitale': 'Islamabad', },
    { 'Pays': 'Palestine', 'Capitale': 'Ramallah', },
    { 'Pays': 'Philippines', 'Capitale': 'Manille', },
    { 'Pays': 'Qatar', 'Capitale': 'Doha', },
    { 'Pays': 'Russie', 'Capitale': 'Moscou', },
    { 'Pays': 'Arabie Saoudite', 'Capitale': 'Riyad', },
    { 'Pays': 'Singapour', 'Capitale': 'Singapour', },
    { 'Pays': 'Sri Lanka', 'Capitale': 'Colombo', },
    { 'Pays': 'Syrie', 'Capitale': 'Damas', },
    { 'Pays': 'Tadjikistan', 'Capitale': 'Douchanbé', },
    { 'Pays': 'Taïwan', 'Capitale': 'Taipei', },
    { 'Pays': 'Thaïlande', 'Capitale': 'Bangkok', },
    { 'Pays': 'Timor oriental', 'Capitale': 'Dili', },
    { 'Pays': 'Turkménistan', 'Capitale': 'Achgabat', },
    { 'Pays': 'Turquie', 'Capitale': 'Ankara', },
    { 'Pays': 'Émirats Arabes Unis', 'Capitale': 'Abou Dabi', },
    { 'Pays': 'Vietnam', 'Capitale': 'Hanoï', },
    { 'Pays': 'Yémen', 'Capitale': 'Sanaa', },
]

var alreadyUsed = []

function shuffle(array) {
    array.sort(() => Math.random() - 0.5)
}

function getRandomPays(data) {
    return data[Math.floor(Math.random() * data.length)]
}

function countdown() {
    liveScore.style.display = 'none'

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
    }, 800)
}

function endGame() {
    titre.innerHTML          = 'Partie terminée'
    answers.style.display    = 'none'
    playAGain.style.display  = 'block'
    gameFinished             = true
    resultTime.style.display = 'block'
    resultTime.innerHTML     = 'Temps de la partie : ' + time + ' s'
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
})
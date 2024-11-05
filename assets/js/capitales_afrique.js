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
    { 'Pays': 'Afrique du Sud', 'Capitale': 'Prétoria', },
    { 'Pays': 'Algérie', 'Capitale': 'Alger', },
    { 'Pays': 'Angola', 'Capitale': 'Luanda', },
    { 'Pays': 'Bénin', 'Capitale': 'Porto-Novo', },
    { 'Pays': 'Botswana', 'Capitale': 'Gaborone', },
    { 'Pays': 'Burkina Faso', 'Capitale': 'Ouagadougou', },
    { 'Pays': 'Burundi', 'Capitale': 'Bujumbura', },
    { 'Pays': 'Cameroun', 'Capitale': 'Yaoundé', },
    { 'Pays': 'Cap-Vert', 'Capitale': 'Praia', },
    { 'Pays': 'Comores', 'Capitale': 'Moroni', },
    { 'Pays': 'Congo (République du Congo)', 'Capitale': 'Brazzaville', },
    { 'Pays': 'Congo (République Démocratique du Congo)', 'Capitale': 'Kinshasa', },
    { 'Pays': 'Côte d\'Ivoire', 'Capitale': 'Yamoussoukro', },
    { 'Pays': 'Djibouti', 'Capitale': 'Djibouti', },
    { 'Pays': 'Égypte', 'Capitale': 'Le Caire', },
    { 'Pays': 'Équateur Guinée', 'Capitale': 'Malabo', },
    { 'Pays': 'Erythrée', 'Capitale': 'Asmara', },
    { 'Pays': 'Eswatini', 'Capitale': 'Mbabane', },
    { 'Pays': 'Éthiopie', 'Capitale': 'Addis-Abeba', },
    { 'Pays': 'Gabon', 'Capitale': 'Libreville', },
    { 'Pays': 'Gambie', 'Capitale': 'Banjul', },
    { 'Pays': 'Ghana', 'Capitale': 'Accra', },
    { 'Pays': 'Guinée', 'Capitale': 'Conakry', },
    { 'Pays': 'Guinée-Bissau', 'Capitale': 'Bissau', },
    { 'Pays': 'Kenya', 'Capitale': 'Nairobi', },
    { 'Pays': 'Lesotho', 'Capitale': 'Maseru', },
    { 'Pays': 'Liberia', 'Capitale': 'Monrovia', },
    { 'Pays': 'Libye', 'Capitale': 'Tripoli', },
    { 'Pays': 'Madagascar', 'Capitale': 'Antananarivo', },
    { 'Pays': 'Malawi', 'Capitale': 'Lilongwe', },
    { 'Pays': 'Mali', 'Capitale': 'Bamako', },
    { 'Pays': 'Maroc', 'Capitale': 'Rabat', },
    { 'Pays': 'Maurice', 'Capitale': 'Port-Louis', },
    { 'Pays': 'Mauritanie', 'Capitale': 'Nouakchott', },
    { 'Pays': 'Mozambique', 'Capitale': 'Maputo', },
    { 'Pays': 'Namibie', 'Capitale': 'Windhoek', },
    { 'Pays': 'Niger', 'Capitale': 'Niamey', },
    { 'Pays': 'Nigeria', 'Capitale': 'Abuja', },
    { 'Pays': 'Ouganda', 'Capitale': 'Kampala', },
    { 'Pays': 'Rwanda', 'Capitale': 'Kigali', },
    { 'Pays': 'Sao Tomé-et-Principe', 'Capitale': 'São Tomé', },
    { 'Pays': 'Sénégal', 'Capitale': 'Dakar', },
    { 'Pays': 'Seychelles', 'Capitale': 'Victoria', },
    { 'Pays': 'Sierra Leone', 'Capitale': 'Freetown', },
    { 'Pays': 'Somalie', 'Capitale': 'Mogadiscio', },
    { 'Pays': 'Soudan', 'Capitale': 'Khartoum', },
    { 'Pays': 'Soudan du Sud', 'Capitale': 'Djouba', },
    { 'Pays': 'Tanzanie', 'Capitale': 'Dodoma', },
    { 'Pays': 'Togo', 'Capitale': 'Lomé', },
    { 'Pays': 'Tunisie', 'Capitale': 'Tunis', },
    { 'Pays': 'Zambie', 'Capitale': 'Lusaka', },
    { 'Pays': 'Zimbabwe', 'Capitale': 'Harare', },
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
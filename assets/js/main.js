var blockGame = document.getElementById('block-game')
var titre     = blockGame.querySelector('h1')
var btnPlay   = blockGame.querySelector('.btnPlay')
var answers   = blockGame.querySelector('#answers')

var data = [
    { 'Pays': 'Albanie', 'Capitale': 'Tirana', },
    { 'Pays': 'Allemagne', 'Capitale': 'Berlin', },
    { 'Pays': 'France', 'Capitale': 'Paris', },
    { 'Pays': 'Pays-Bas', 'Capitale': 'Amsterdam', },
    //{ 'Pays': 'Roumanie', 'Capitale': 'Bucarest', },
    //{ 'Pays': 'Hongrie', 'Capitale': 'Budapest', },
];

var alreadyUsed = []

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function getRandomPays(data) {
    return data[Math.floor(Math.random() * data.length)];
}

function countdown() {
    var counter     = 3;
    titre.innerHTML = counter

    var i = setInterval(function(){
        counter--;
        titre.innerHTML = counter

        if (counter === 0) {
            clearInterval(i);
            newQuestion();
            answers.style.display = 'flex'
        }
    }, 100);
}

function endGame() {
    titre.innerHTML = 'Partie terminée'
    answers.style.display = 'none'
}

function newQuestion() {
    shuffle(data)

    const random = getRandomPays(data);
    var pays = random.Pays

    if (alreadyUsed.includes(pays)) {
        endGame();
    }

    if (!alreadyUsed.includes(random)) {
        alreadyUsed.push(random.Pays)
        titre.innerHTML = random.Pays
    }

    var ok = [random]
    alreadyUsed.push(pays)
    data.forEach((element) => {
        if (ok.length < 4 && element.Pays !== pays) {
            ok.push(element)
        }
    })

    shuffle(ok)

    const spans = answers.querySelectorAll('span')
    var toto = 0
    spans.forEach((span) => {
        span.innerHTML = ok[toto].Capitale
        span.setAttribute('data-pays', ok[toto].Pays)
        toto++;
    })
}

btnPlay.addEventListener('click', function() {
    btnPlay.style.display = 'none'
    countdown();
})

var spans = answers.querySelectorAll('span')
spans.forEach((span) => {
    span.addEventListener('click', function() {
        const pays = span.getAttribute('data-pays')

        if (pays === titre.textContent) {
            //console.log('bonne réponse')

        } else {
            //console.log('mauvaise réponse')
        }

        newQuestion()
    })
})
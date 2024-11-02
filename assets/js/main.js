const blockGame = document.getElementById('block-game')
const titre     = blockGame.querySelector('h1')
const btnPlay   = blockGame.querySelector('.btnPlay')
btnPlay.addEventListener('click', function() {
    btnPlay.style.display = 'none'
    titre.style.display   = 'none'

    fetch('/game/capitales-europe-data')
        .then(response => {
            response.text().then(text => {
                console.log(text)
            })
        })
        .catch(error => {
            console.log(error)
        })
})
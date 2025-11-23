// assign html elements

const upperRow = document.getElementById('upperRow');
const middleRow = document.getElementById('middleRow');
const lowerRow = document.getElementById('lowerRow');
const scene = document.getElementById('sceneImage');
const theatre = document.getElementById('theatre');
const bye = document.getElementById('bye');
const btnPlayAgain = document.getElementById('btnPlayAgain');
const btnDone = document.getElementById('btnDone');

// setup keyboard
const keyboard = new Keyboard(upperRow,middleRow,lowerRow);
const btnABCD = document.getElementById('btnABCD');
const btnQWER = document.getElementById('btnQWER');
const btnAnimals = document.getElementById('btnAnimals');
const btnCountries = document.getElementById('btnCountries');
const btnMovies = document.getElementById('btnMovies');


// add listerners to the buttons
btnPlayAgain.addEventListener('click', function() {
    closeModal();
    restartGame();
});

btnDone.addEventListener('click', function() {
    closeModal();
    theatre.style.display = 'none';
    bye.style.display = 'block';
});

btnABCD.addEventListener('click',function() {
    btnABCD.classList.add('btn-active');
    btnQWER.classList.remove('btn-active');
    keyboard.setLayout('ABCDEF');
});

btnQWER.addEventListener('click',function() {
    btnQWER.classList.add('btn-active');
    btnABCD.classList.remove('btn-active');
    keyboard.setLayout('QWERTY');
});

btnAnimals.addEventListener('click',function() {
    btnAnimals.classList.add('btn-active');
    btnCountries.classList.remove('btn-active');
    btnMovies.classList.remove('btn-active');
    game.topic = 'animals';
    restartGame();
});

btnCountries.addEventListener('click',function() {
    btnCountries.classList.add('btn-active');
    btnAnimals.classList.remove('btn-active');
    btnMovies.classList.remove('btn-active');
    game.topic = 'countries';
    restartGame();
});

btnMovies.addEventListener('click',function() {
    btnMovies.classList.add('btn-active');
    btnCountries.classList.remove('btn-active');
    btnAnimals.classList.remove('btn-active');
    game.topic = 'movies';
    restartGame();
});

// setup game
const game = new Game();
game.topic = 'countries';
(async () => { await restartGame() } )();

//restartGame();
async function restartGame() {
    await game.reset();
    showProgress();
    swapImage(0);
    keyboard.resetKeyboard();
    theatre.style.display = 'block';
    bye.style.display = 'none';
    document.getElementById('theatre').style.opacity = 1;
}

function evaluate(keyId, keyText) {
    game.turns++;
    // disable button after clicked
    const key = document.getElementById(keyId);
    key.disabled = true;
    key.classList.add('btn-disabled');
    keyboard.disabledButtons.push(keyText);

    // invalid key test
    if(game.secretWord.toUpperCase().indexOf(keyText) == -1 ) {
        game.wrongGuesses++;
        swapImage(game.wrongGuesses);
    }

    // number of attempts exceeded test
    if(game.wrongGuesses > 6) {
        fadeOut(theatre, 2000);
        setTimeout(function() {
            openModal(`Sorry!! You've lost. The correct answer was "${game.secretWord}".`);
        }, 2000);        
    }

    // valid guess, update progress
    for(let i = 0; i < game.secretWord.length; i++) {
        if(keyText == game.secretWord[i].toUpperCase()) {
            game.hiddenWord[i] = keyText;
            showProgress();
        }
    }

    // success, game is over
    if(game.hiddenWord.join("").toUpperCase()==game.secretWord.toUpperCase()) {
        openModal(`Congratulations!! "${game.secretWord}" was the correct answer! You've guessed the secret word in ${game.turns} turns.`);
    }

}

// javascript animation for fading the element out 
function fadeOut(element, duration =1000) {
    let opacity = 1;
    const interval = 50;
    const gap = interval / duration;

    const fading = setInterval(() => {
        opacity -= gap;
        if (opacity <= 0) {
            opacity = 0;
            clearInterval(fading);
        }
        element.style.opacity = opacity;
    }, interval);
}

// swap images as game progresses
function swapImage(stage) {
    scene.src = `./images/stage0${stage}.png`;
    scene.title = stage;
}

// open modal window for GAME OVER
function openModal(text) {
    const txtResult = document.getElementById('txtResult');
    txtResult.innerHTML = text;
    document.getElementById("modal").classList.add("show");
}

// close modal windows
function closeModal() {
    document.getElementById("modal").classList.remove("show");
}

// update progress indicator
function showProgress() {
    const progress = document.getElementById('progress');
    let html = ''
    for(let i = 0; i < game.hiddenWord.length; i++) {
        html += `<span class="letter">${game.hiddenWord[i]}</span>`;
    }
    html+=`<div class="">${game.hint}</div>`;

    progress.innerHTML = html;
}







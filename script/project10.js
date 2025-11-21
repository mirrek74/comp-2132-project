// assign html elements

const upperRow = document.getElementById('upperRow');
const middleRow = document.getElementById('middleRow');
const lowerRow = document.getElementById('lowerRow');
const scene = document.getElementById('sceneImage');
const theatre = document.getElementById('theatre');
const bye = document.getElementById('bye');
const btnPlayAgain = document.getElementById('btnPlayAgain');

btnPlayAgain.addEventListener('click', function() {
    closeModal();
    restartGame();
});

const btnDone = document.getElementById('btnDone');

btnDone.addEventListener('click', function() {
    closeModal();
    theatre.style.display = 'none';
    bye.style.display = 'block';
});

// setup keyboard
const keyboard = new Keyboard(upperRow,middleRow,lowerRow);
const btnABCD = document.getElementById('btnABCD');
const btnQWER = document.getElementById('btnQWER');
const btnAnimals = document.getElementById('btnAnimals');
const btnCountries = document.getElementById('btnCountries');
const btnMovies = document.getElementById('btnMovies');

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
    btnABCD.disabled = false;
    btnQWER.disabled = false;
}



function evaluate(keyId, keyText) {
    game.turns++;
    btnABCD.disabled = true;
    btnQWER.disabled = true;
    const key = document.getElementById(keyId);
    key.disabled = true;
    key.classList.add('btnDisabled');
    if(game.secretWord.toUpperCase().indexOf(keyText) == -1 ) {
        game.wrongGuesses++;
        console.log('Wrong Guess #',game.wrongGuesses);
        swapImage(game.wrongGuesses);
    }
    if(game.wrongGuesses > 6) {
        fadeOut(theatre, 2000);
        setTimeout(function() {
            openModal(`Sorry!! You've lost. The correct answer is "${game.secretWord}".`);
        }, 2000);        
    }

    for(let i = 0; i < game.secretWord.length; i++) {
        if(keyText == game.secretWord[i].toUpperCase()) {
            game.hiddenWord[i] = keyText;
            showProgress();
        }
    }
    if(game.hiddenWord.join("").toUpperCase()==game.secretWord.toUpperCase()) {
        openModal(`Congratulations!! "${game.secretWord}" was the correct answer! You've guess the secret word in ${game.turns} turns.`);
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


function swapImage(stage) {
    scene.src = `./images/stage0${stage}.png`;
    scene.title = stage;
}

function openModal(text) {
    const txtResult = document.getElementById('txtResult');
    txtResult.innerHTML = text;
    document.getElementById("modal").classList.add("show");
}

function closeModal() {
    document.getElementById("modal").classList.remove("show");
}

function showProgress() {
    const progress = document.getElementById('progress');
    let html = ''
    for(let i = 0; i < game.hiddenWord.length; i++) {
        html += `<span class="letter">${game.hiddenWord[i]}</span>`;
    }
    html+=`<div class="">${game.hint}</div>`;

    progress.innerHTML = html;
}







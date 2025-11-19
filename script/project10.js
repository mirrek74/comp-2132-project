// assign html elements

const upperRow = document.getElementById('upperRow');
const middleRow = document.getElementById('middleRow');
const lowerRow = document.getElementById('lowerRow');
const scene = document.getElementById('sceneImage');
const btnPlayAgain = document.getElementById('btnPlayAgain');

btnPlayAgain.addEventListener('click', function() {
    closeModal();
    restartGame();
});

const btnDone = document.getElementById('btnDone');

btnDone.addEventListener('click', function() {
    closeModal();
});

// setup keyboard
const keyboard = new Keyboard(upperRow,middleRow,lowerRow);

// setup game
const game = new Game();

(async () => {
    await game.reset();
    showProgress();
    swapImage(0);
    keyboard.resetKeyboard();
})();


//restartGame();

async function restartGame() {
    await game.reset();
    showProgress();
    swapImage(0);
    keyboard.resetKeyboard();
}


function evaluate(keyId, keyText) {
    game.turns++;
    const key = document.getElementById(keyId);
    key.disabled = true;
    key.classList.add('btnDisabled');
    if(game.secretWord.toUpperCase().indexOf(keyText) == -1 ) {
        game.wrongGuesses++;
        console.log('Wrong Guess #',game.wrongGuesses);
        swapImage(game.wrongGuesses);
    }
    if(game.wrongGuesses > 6) {
        openModal(`Sorry!! You've lost. The correct answer is "${game.secretWord}".`);
    }

    for(let i = 0; i < game.secretWord.length; i++) {
        if(keyText == game.secretWord[i].toUpperCase()) {
            game.hiddenWord[i] = keyText;
            showProgress();
        }
    }
    if(game.hiddenWord.join("").toUpperCase()==game.secretWord.toUpperCase()) {
        openModal(`Congratulations!! You've guess the secret word in ${game.turns} turns.`);
    }

}

function swapImage(stage) {
    scene.classList.add("fade-out");

    setTimeout(() => {
        scene.src = `./images/stage${stage}.png`;

        scene.onload = () => scene.classList.remove("fade-out");
    }, 500); 
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







class Game {
    static dictionaryPath = "/json/";

    dictionary;
    topic;

    secretWord = '';
    hint = '';
    hiddenWord = [];
    wrongGuesses = 0;
    turns = 0;

    async reset() {
        this.wrongGuesses = 0;
        this.turns = 0;
        return this.fetchRandomWord().then(() => {
            this.hiddenWord = Array(this.secretWord.length).fill('_');
        });
    }

    async fetchRandomWord() {
        const response = await fetch(Game.dictionaryPath + this.topic + '.json');

        if (!response.ok) {
            console.log("Error fetching file");
            return;
        }

        const data = await response.json();
        this.dictionary = data;

        const index = Math.floor(Math.random() * this.dictionary.length);
        this.secretWord = this.dictionary[index].word;
        this.hint = this.dictionary[index].hint;
    }
}

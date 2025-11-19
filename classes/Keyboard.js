class Keyboard {
    
    buttons = [];
    upperRow = '';
    middleRow;
    lowerRow;
    row1;
    row2;
    row3;

    constructor(row1, row2, row3) {
        this.row1 = row1;
        this.row2 = row2;
        this.row3 = row3;
        this.setLayout('QWERTY');
    }

    setLayout(layout = 'QWERTY') {
        if(layout==='QWERTY') {
            this.upperRow = 'QWERTYUIOP';
            this.middleRow = 'ASDFGHJKL';
            this.lowerRow = 'ZXCVBNM';
        } else {
            this.upperRow = 'ABCDEFGHI';
            this.middleRow = 'JKLMNOPQR';
            this.lowerRow = 'STUVWXYZ';
        }
        this.draw();
        this.listen();
    }

    draw() {
        this.buttons = [];
        this.setKeyboardRow(this.row1, this.upperRow);
        this.setKeyboardRow(this.row2, this.middleRow);
        this.setKeyboardRow(this.row3, this.lowerRow);
    }

    listen() {
        this.buttons.forEach(id => {
            const btn = document.getElementById(id);
            btn.addEventListener('click', function(event) {
                evaluate(btn.id, btn.textContent);
            })
        });
    }

    setKeyboardRow(row,rowKeys) {
        let keys = '';
        for(let i = 0; i < rowKeys.length; i++) {
            const id = `key${rowKeys[i]}`;
            keys += `<button id="${id}" class="btnKey">${rowKeys[i]}</button>`;
            this.buttons.push(id);        
        }
        row.innerHTML = keys;
    }

    resetKeyboard() {
        this.buttons.forEach(id => {
            const btn = document.getElementById(id);
            if(btn) {
                btn.disabled = false;
                btn.classList.remove('btnDisabled');
            }
        });
    }
}
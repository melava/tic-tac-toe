const board = (() => {
    let arrayBoard = []    
    const divBoard = document.getElementById('board');
    
    function createNewBoard () {
        for (let i = 0; i < 9; i++) {
            let arrayCase = "";
            arrayBoard.push(arrayCase);

            let newDivCase = document.createElement('div');
            newDivCase.setAttribute('id', 'pos' + i);
            newDivCase.setAttribute('class', 'case');
            newDivCase.setAttribute('data-index', i);
            newDivCase.textContent = arrayCase;
            divBoard.appendChild(newDivCase)
        }

        _listenToCase()
    }

    function _listenToCase () {
        const caseArray = document.querySelectorAll('div.case')
        caseArray.forEach(square => {
            square.addEventListener('click', game.fillBoard)
        });
        
    }

    return { 
        createNewBoard,
        arrayBoard,
        divBoard,
    };
})();

const game = (() => {
    function fillBoard () {
        if (!this.textContent) {
            let symbol = me.currentPlayer ? me.symbol : other.symbol;
            let index = this.dataset.index
            board.arrayBoard[index] = symbol;
            board.divBoard.childNodes[index].textContent = symbol;
            _toggleCurrentPlayer();   
        }
    }

    function _toggleCurrentPlayer () {
        me.currentPlayer ? me.currentPlayer = false : me.currentPlayer = true;
        other.currentPlayer ? other.currentPlayer = false : other.currentPlayer = true;
    }

    return {
        fillBoard,
    }
})();

const Player = (name, symbol, currentPlayer) => {
    return {
        name,
        symbol,
        currentPlayer,
    }
}

const me = Player('Player 1', 'X', true);
const other = Player('Player 2', 'O', false);
board.createNewBoard();
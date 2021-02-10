const board = (() => {
    const divContainer = document.getElementById('board');

    function initiate () {
        _createNew()
        _startPopUp()
    }
    
    function reset() {
        const caseArray = document.querySelectorAll('div.case')
        caseArray.forEach(singleCase => {
            divContainer.removeChild(singleCase)
        });
        _createNew();
    }

    function fill (index, symbol) {
        divContainer.childNodes[index].textContent = symbol;
    }

    function endPopUp(message) {
        let overlay = document.createElement('div');
        overlay.classList.add('overlay');
        let pMessage = document.createElement('p');
        pMessage.classList.add('end')
        pMessage.textContent = message;
        overlay.appendChild(pMessage);
        let again = document.createElement('div');
        again.classList.add('button');
        again.textContent = 'Do you want to play again?';
        overlay.appendChild(again);
        divContainer.appendChild(overlay);
        again.addEventListener('click', _startPopUp)
    }

    function _startPopUp() {
        let overlay = document.createElement('div');
        overlay.classList.add('overlay');
        let pMessage = document.createElement('p');
        pMessage.classList.add('start')
        pMessage.textContent = 'Let\'s start a Tic tac toe game!';
        overlay.appendChild(pMessage);
        let start = document.createElement('div');
        start.classList.add('button');
        start.textContent = 'Start';
        overlay.appendChild(start);
        divContainer.appendChild(overlay);
        start.addEventListener('click', _clearOverlay)
    }

    function _clearOverlay() {
        const overlays = document.querySelectorAll('div.overlay')
        overlays.forEach(popup => {
            divContainer.removeChild(popup)
        });
    }

    function _createNew () {
        for (let i = 0; i < 9; i++) {
            let newDivCase = document.createElement('div');
            newDivCase.setAttribute('id', 'pos' + i);
            newDivCase.classList.add('case');
            newDivCase.setAttribute('data-index', i);
            newDivCase.textContent = "";
            divContainer.appendChild(newDivCase)
        }
        _listenToCase()
    }

    function _listenToCase () {
        const caseArray = document.querySelectorAll('div.case')
        caseArray.forEach(singleCase => {
            singleCase.addEventListener('click', game.play)
        }); 
    }

    return { 
        initiate,
        reset,
        fill,
        endPopUp,
    };
})();

const game = (() => {
    let arrayBoard = Array(9).fill("");
    
    function play () {
        if (!this.textContent) {
            let currentSymbol = _checkCurrentlyPlaying();

            _fill(this.dataset.index, currentSymbol);
            
            let isWon = _checkVictory(currentSymbol);
            let isTie = _checkTie();
            if (isWon || isTie) {
                let message
                if (isWon) {
                    let theWinner = _winnerName(currentSymbol);
                    message = `Yeah! ${theWinner} has won`;
                    isWon = _reset(isWon);
                } else if (isTie) {
                    message = 'it\'s a tie!';
                    isTie = _reset(isTie);
                }  
                board.endPopUp(message);          
            } else if (!isWon && !isTie) {
                _toggleCurrentPlayer(); 
            }
        }
    }
    
    function _fill (index, symbol) {
        arrayBoard[index] = symbol;
        board.fill(index, symbol);
    }

    function _checkCurrentlyPlaying() {
        let currentlyPlaying = player1.currentPlayer ? player1.symbol : player2.symbol;
        return currentlyPlaying
    }

    function _toggleCurrentPlayer () {
        player1.currentPlayer ? player1.currentPlayer = false : player1.currentPlayer = true;
        player2.currentPlayer ? player2.currentPlayer = false : player2.currentPlayer = true;
    }

    function _checkVictory (currentSymbol) {
        let MappedArrayBoard = arrayBoard.map(aCase => aCase === currentSymbol);
        if (MappedArrayBoard[0] && MappedArrayBoard[1] && MappedArrayBoard[2]
        || MappedArrayBoard[3] && MappedArrayBoard[4] && MappedArrayBoard[5]
        || MappedArrayBoard[6] && MappedArrayBoard[7] && MappedArrayBoard[8]
        || MappedArrayBoard[0] && MappedArrayBoard[3] && MappedArrayBoard[6]
        || MappedArrayBoard[1] && MappedArrayBoard[4] && MappedArrayBoard[7]
        || MappedArrayBoard[2] && MappedArrayBoard[5] && MappedArrayBoard[8]
        || MappedArrayBoard[0] && MappedArrayBoard[4] && MappedArrayBoard[8]
        || MappedArrayBoard[2] && MappedArrayBoard[4] && MappedArrayBoard[6]) {
            return true;
        } else {
            return false
        }
    }

    function _winnerName(symbol) {
        if (player1.symbol === symbol) {
            return player1.name
        } else {
            return player2.name
        }
    }

    function _checkTie () {
        if (arrayBoard.indexOf("") === -1) {
            return true;
        } else {
            return false;
        }
    }

    function _reset(element) {
        element = false;
        arrayBoard = Array(9).fill("");
        board.reset();
        return element
    }

    return {
        play,
    }
})();

const Player = (name, symbol, currentPlayer) => {
    return {
        name,
        symbol,
        currentPlayer,
    }
}

const player1 = Player('Player 1', 'X', true);
const player2 = Player('Player 2', 'O', false);

window.onload = board.initiate();
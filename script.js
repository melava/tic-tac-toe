const board = (() => {
    const divContainer = document.getElementById('board');
    const turn = document.getElementById('turn');

    function initiate () {
        _startPopUp();
        _createNew();
    }

    function fill (index, symbol) {
        divContainer.childNodes[index].textContent = symbol;
    }
    
    function end(message) {
        const caseArray = document.querySelectorAll('div.case')
        caseArray.forEach(singleCase => {
            divContainer.removeChild(singleCase)
        });
        _createNew();
        _endPopUp(message);
    }

    function _letsStart(){
        _updateName();
        _clearOverlay();
    }

    function _updateName() {
        const updateP1Name = document.getElementById('Player1').value;
        const updateP2Name = document.getElementById('Player2').value;

        if (updateP1Name) {
            player1.name = updateP1Name
        }
        if (updateP2Name) {
            player2.name = updateP2Name
        }
    }

    function _startPopUp() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        const pMessage = document.createElement('p');
        pMessage.classList.add('start');
        pMessage.textContent = 'Let\'s start a Tic tac toe game!';
        overlay.appendChild(pMessage);
        
        const player1 = document.createElement('div');
        const labelP1 = document.createElement('label');
        labelP1.setAttribute('for', 'Player1');
        labelP1.textContent = 'Player 1';
        player1.appendChild(labelP1);
        const inputP1 = document.createElement('input');
        inputP1.setAttribute('id', 'Player1');
        inputP1.setAttribute('type', 'text');
        player1.appendChild(inputP1);
        overlay.appendChild(player1);
        
        const player2 = document.createElement('div');
        const labelP2 = document.createElement('label');
        labelP2.setAttribute('for', 'Player2');
        labelP2.textContent = 'Player 2';
        player2.appendChild(labelP2);
        const inputP2 = document.createElement('input');
        inputP2.setAttribute('id', 'Player2');
        inputP2.setAttribute('type', 'text');
        player2.appendChild(inputP2);
        overlay.appendChild(player2);
        
        const start = document.createElement('div');
        start.classList.add('button');
        start.textContent = 'Start';
        overlay.appendChild(start);
        divContainer.appendChild(overlay);
        
        start.addEventListener('click', _letsStart)
    }
    
    function _endPopUp(message) {
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
        again.addEventListener('click', _clearOverlay)
    }
       
    function _clearOverlay() {
        const overlays = document.querySelectorAll('div.overlay')
        overlays.forEach(popup => {
            divContainer.removeChild(popup)
        });
        _clearTurns();
    }

    function _clearTurns () {
        player1.currentPlayer = true;
        player2.currentPlayer = false;
        turn.textContent = `It's ${player1.name}'s turn ! ("${player1.symbol}" symbol)`;
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
        turn,
        initiate,
        fill,
        end,
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
                    isWon = _reset(isWon, message);
                } else if (isTie) {
                    message = 'It\'s a tie!';
                    isTie = _reset(isTie, message);
                }          
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
        if(player1.currentPlayer) {
            player1.currentPlayer = false;
            player2.currentPlayer = true;
            board.turn.textContent = `It's ${player2.name}'s turn ! ("${player2.symbol}" symbol)`;
        } else {
            player2.currentPlayer = false;
            player1.currentPlayer = true;
            board.turn.textContent = `It's ${player1.name}'s turn ! ("${player1.symbol}" symbol)`;
        }
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

    function _reset(element, message) {
        element = false;
        arrayBoard = Array(9).fill("");
        board.end(message);
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

window.onload = board.initiate();

const player1 = Player('Player 1', 'X', true);
const player2 = Player('Player 2', 'O', false);
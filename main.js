window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetBtn = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    const strike = document.getElementById('strike');


    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;
    let comp;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    /*
        0 1 2
        3 4 5
        6 7 8
    */ 
    const winningConditions = [
        {c: [0, 1, 2], strikeClass: "strike-row-1"},
        {c: [3, 4, 5], strikeClass: "strike-row-2"},
        {c: [6, 7, 8], strikeClass: "strike-row-3"},
        {c: [0, 3, 6], strikeClass: "strike-col-1"},
        {c: [1, 4, 7], strikeClass: "strike-col-2"},
        {c: [2, 5, 8], strikeClass: "strike-col-3"},
        {c: [0, 4, 8], strikeClass: "strike-dig-1"},
        {c: [2, 4, 6], strikeClass: "strike-dig-2"},
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i<= 7; i++) {
            const winCondition = winningConditions[i].c;
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }

            if ( a === b && b === c) {
                roundWon = true;
                comp = winningConditions[i].strikeClass;
                break;
            }
        }

        if (roundWon){
            strike.classList.add(comp);
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerText = `Winner is O .`;
                break;
            case PLAYERX_WON:
                announcer.innerText = `Winner is X .`;
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true; 
        announcer.classList.add('hide');
        strike.classList.remove(comp);

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach( tile => {
            tile.innerText = '';
            tile.classList.remove('X');
            tile.classList.remove('O');
        });
    }
    tiles.forEach( (tile, index) => {
        tile.addEventListener( 'click', () => userAction(tile, index));
    });


    resetBtn.addEventListener('click' ,  resetBoard);

})
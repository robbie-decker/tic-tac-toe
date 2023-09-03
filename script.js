const player = (sign) =>{
    const _sign = sign;

    const getSign = () => _sign
    return{getSign}
}

// Need an object for the board
const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    }
    // Getter function to return gameboard
    const getBoard = () => board

    const changeBoard = (index, value) =>{
        board[index] = value;
    }

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];

    const isGameOver = () => {
        for(combination of winningCombinations){
            [a, b, c] = combination;
            if(board[a] === board[b] && board[a] === board[c] && board[a] != ''){
                return true;       
            }
        }
        return false;
    }
    return{getBoard, changeBoard, resetBoard, isGameOver}
})();

const displayController = ((game) => {
    let xSVG;
    let oSVG;
    xPlayer = player('X');
    oPlayer = player('O');
    const cells = document.querySelectorAll('.cell'); 
    const status = document.getElementById('status');
    const reset = document.getElementById('reset');
    const move_status = document.getElementById('moveStatus');
    const board = document.getElementById('board');
    
    let moves = 0;
    let currentPlayer = xPlayer;
    
    const resetGame = () => {
        currentPlayer = xPlayer;
        moves = 0;
        status.innerText = '';
        board.classList.remove('unclickable');
        game.resetBoard();
        clearDisplay();
    }
    
    // This would be better with the cells being classes, but for now I am going to keep them like this
    const setUpEventHandlers = () => {
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () =>{
                if(cell.innerHTML === ''){
                    let currentSign = currentPlayer.getSign()
                    game.changeBoard(index, currentSign);
                    if(game.isGameOver()){
                        status.innerText = ` ${currentPlayer.getSign()} wins`
                        board.classList.add('unclickable');
                    }
                    renderSquare(index, currentSign);
                    // Just swap between players
                    currentSign == 'X' ? currentPlayer = oPlayer : currentPlayer = xPlayer;
                    move_status.innerText = `${currentPlayer.getSign()} to move`
                    moves++;
                    if(moves >= 9 && !game.isGameOver()){
                        status.innerText = 'It is a draw';
                    }
                }
            });
        });
        
        setUpAnimations();

        reset.addEventListener('click', (e) =>{
            // This allows the reset button animation to start over mid animation. Pretty cool :)
            e.preventDefault;
            reset.firstChild.classList.remove("icon_spin");
            void reset.firstChild.offsetWidth;
            resetGame();
            reset.firstChild.classList.add("icon_spin");
        });
        
        reset.firstChild.addEventListener('transitionend', (e) => e.target.classList.remove("icon_spin"));
    }
    
    // Sets up SVGs for placement of X and O
    const setUpAnimations = () => {
        xSVG = document.createElement("object");
        xSVG.type = "image/svg+xml";
        xSVG.data = "imgs/X.svg";
        xSVG.classList.add("sign");
        oSVG = document.createElement("object");
        oSVG.type = "image/svg+xml";
        oSVG.data = "imgs/O.svg";
        oSVG.classList.add("sign");
    }

    const clearDisplay = () =>{
        for(cell of cells){
            cell.innerText = '';
        }
    }
    // Go through gameboard and render sign in the appropriate spot
    // Should change to render square
    const renderSquare = (index, sign) => {
        if(sign === "X"){
            cells[index].appendChild(xSVG.cloneNode(true));
        }
        else{
            cells[index].appendChild(oSVG.cloneNode(true));
        }
    }
    return{resetGame, setUpEventHandlers, clearDisplay}
})(gameBoard);

// Only global calls we need
displayController.setUpEventHandlers();
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
    xPlayer = player('x');
    oPlayer = player('o');
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
        renderBoard();
    }
    
    // This would be better with the cells being classes, but for now I am going to keep them like this
    const setUpEventHandlers = () => {
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () =>{
                if(cell.innerText === ''){
                    let currentSign = currentPlayer.getSign()
                    game.changeBoard(index, currentSign);
                    if(game.isGameOver()){
                        status.innerText = ` ${currentPlayer.getSign()} wins`
                        board.classList.add('unclickable');
                    }
                    // Just swap between players
                    currentSign == 'x' ? currentPlayer = oPlayer : currentPlayer = xPlayer;
                    renderBoard();
                    moves++;
                    if(moves >= 9 && !game.isGameOver()){
                        status.innerText = 'It is a draw';
                    }
                }
            });
        });
        
        reset.addEventListener('click', () =>{
            resetGame();
        });


    }

    const clearBoard = () =>{
        for(cell of cells){
            cell.innerText = '';
        }
    }
    // Go through gameboard and render sign in the appropriate spot
    const renderBoard = () => {
        move_status.innerText = `${currentPlayer.getSign()} to move`
        console.log(cells);
        for([index, value] of game.getBoard().entries()){
            cells[index].innerText = value;
        }
    }
    return{renderBoard, resetGame, setUpEventHandlers}
})(gameBoard);

// Only global calls we need
displayController.renderBoard();
displayController.setUpEventHandlers();
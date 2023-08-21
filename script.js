const player = (sign) =>{
    const _sign = sign;

    const getSign = () => _sign
    return{getSign}
}

// Need an object for the board
const gameBoard = (() => {
    let board = ['x', 'x', 'x', 'o', '', '', '', '', 'x'];
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
    let cells = document.querySelectorAll('.cell'); 
    let status = document.getElementById('status');
    let moves = 0;
    let currentPlayer = xPlayer;

    const resetGame = () => {
        currentPlayer = xPlayer;
        moves = 0;
        status.innerText = '';
        game.resetBoard();
        renderBoard();
    }

    // This would be better with the cells being classes, but for now I am going to keep them like this
    const setUpEventHandlers = () => {
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () =>{
                if(cell.innerText === ''){
                    let currentSign = currentPlayer.getSign()
                    cell.innerText = currentSign;
                    game.changeBoard(index, currentSign);
                    if(game.isGameOver()){
                        status.innerText = ` ${currentPlayer.getSign()} wins`
                    }
                    // Just swap between players
                    currentSign == 'x' ? currentPlayer = oPlayer : currentPlayer = xPlayer;
                    moves++;
                    console.log(moves);
                    if(moves >= 9){
                        status.innerText = 'It is a draw';
                    }
                }
            });
        });
    }

    const clearBoard = () =>{
        for(cell of cells){
            cell.innerText = '';
        }
    }
    // Go through gameboard and render sign in the appropriate spot
    const renderBoard = () => {
        // clearBoard();
        for([index, value] of game.getBoard().entries()){
            cells[index].innerText = value;
        }
    }
    return{renderBoard, resetGame, setUpEventHandlers}
})(gameBoard);

displayController.renderBoard();
displayController.setUpEventHandlers();

reset = document.getElementById('reset')
reset.addEventListener('click', () =>{
    displayController.resetGame();
})
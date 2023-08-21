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
    return{getBoard, resetBoard}
})();

const displayController = ((game) => {
    xPlayer = player('x');
    oPlayer = player('o');
    let cells = document.querySelectorAll('.cell'); 
    let moves = 0;
    let currentPlayer = xPlayer;
    // This would be better with the cells being classes, but for now I am going to keep them like this
    const setUpEventHandlers = () => {
        cells.forEach((cell) => {
            cell.addEventListener('click', () =>{
                if(cell.innerText === ''){
                    let currentSign = currentPlayer.getSign()
                    cell.innerText = currentSign;
                    // Just swap between players
                    currentSign == 'x' ? currentPlayer = oPlayer : currentPlayer = xPlayer;
                    moves++;
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
        clearBoard();
        for([index, value] of game.getBoard().entries()){
            cells[index].innerText = value;
        }
    }
    return{renderBoard, setUpEventHandlers}
})(gameBoard);

displayController.renderBoard();
displayController.setUpEventHandlers();
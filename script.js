
// Need an object for the board
const gameBoard = (() => {
    let board = ['x', 'x', 'x', 'o', '', '', '', '', 'x'];
    const clearBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    } 
    // Getter function to return gameboard
    const getBoard = () => board
    return{getBoard, clearBoard}
})();

const displayController = ((game) => {
    cells = document.getElementsByClassName('cell');
    // Go through gameboard and render shape in the appropriate spot
    const renderBoard = () => {
        for([index, value] of game.getBoard().entries()){
            cells[index].innerText = value;
        }
    }
    return{renderBoard}
})(gameBoard);

const players = () =>{

}


displayController.renderBoard();
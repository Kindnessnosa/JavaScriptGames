
document.addEventListener('DOMContentLoaded', () =>{
  const home_screen = document.getElementById('home_screen');
  
  home_screen.style.display = "block";
  container.classList.add('model-open');
});

const play_now = document.getElementById('play_now').addEventListener("click", () =>{
  home_screen.style.display = "none";
  ClosePopUp();
});

//home_screen.style.display = "block";
//container.classList.add('model-open');


const container = document.getElementById('container')

const cells = document.querySelectorAll('.cell');

let playerO = '0';
let playerX = 'X';

let currentPlayer = playerX;

let gameState = ['', '', '', '', '', '', '', '', '']; // keeps track of the current state of the game
const winningConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row 
    [6, 7, 8], // bottom row 
    [0, 3, 6], // left column 
    [1, 4, 7], // middle column 
    [2, 5, 8], // right column 
    [0, 4, 8], // diagonal left to right 
    [2, 4, 6] // diagonal right to left 
]; // all possible winning positions 

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
}); // adding a click event listener to each cell 

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || checkWinner()) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (currentPlayer === playerX) {
      clickedCell.classList.add('player_X')
    }else{
      clickedCell.classList.add('player_O')
    }

    if (checkWinner()) {
        //alert(`${currentPlayer} has won!`);
        OpenPopUp();
        return;
    }

    if (isDraw()) {
        //alert('It\'s a draw!');
        OpenPopUp();
        return;
    }

    currentPlayer = currentPlayer === playerX ? playerO : playerX ;
}


function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    return roundWon;
}

function isDraw() {
    return !gameState.includes('');
}






const popup = document.getElementById('game_over');

const quit_game = document.getElementById('quit').addEventListener("click", () =>{
  
  home_screen.style.display = "block";
  
  ClosePopUp();
  container.classList.add('model-open');
});

function ClosePopUp() {
  popup.style.display = "none"
  
  container.classList.remove('model-open');
}

function OpenPopUp() {
  popup.style.display = "block"
  
  container.classList.add('model-open');
}



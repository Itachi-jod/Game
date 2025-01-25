// Author: Itachiffx
const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] === '' && gameActive) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('taken');

    if (checkWin()) {
      message.textContent = `${currentPlayer} wins!`;
      gameActive = false;
    } else if (board.every(cell => cell !== '')) {
      message.textContent = 'It\'s a draw!';
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = `Player ${currentPlayer}'s turn`;
  gameBoard.innerHTML = '';
  createBoard();
}

function createBoard() {
  board.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
  });
}

resetButton.addEventListener('click', resetGame);

// Initialize the game
message.textContent = `Player ${currentPlayer}'s turn`;
createBoard();

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

  if (board[index] === '' && gameActive && currentPlayer === 'X') {
    makeMove(index, 'X');
    if (gameActive) computerMove();
  }
}

function makeMove(index, player) {
  board[index] = player;
  const cell = document.querySelector(`[data-index='${index}']`);
  cell.textContent = player;
  cell.classList.add('taken');

  if (checkWin(player)) {
    message.textContent = `${player} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== '')) {
    message.textContent = 'It\'s a draw!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (currentPlayer === 'X') {
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function computerMove() {
  let availableCells = board
    .map((cell, index) => (cell === '' ? index : null))
    .filter(index => index !== null);

  if (availableCells.length > 0) {
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    makeMove(randomIndex, 'O');
  }
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === player);
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

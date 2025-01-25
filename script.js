let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const statusText = document.querySelector(".status");
const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");

// Sound effects
const clickSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
const winSound = new Audio('https://www.fesliyanstudios.com/play-mp3/396');

function playerMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].textContent = currentPlayer;
        clickSound.play();
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;

        setTimeout(() => {
            if (currentPlayer === "O") aiMove();
        }, 500);
    }
}

function aiMove() {
    let emptyCells = board.map((cell, index) => (cell === "" ? index : null)).filter(i => i !== null);
    if (emptyCells.length > 0) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = "O";
        document.getElementsByClassName("cell")[randomIndex].textContent = "O";
        clickSound.play();
        checkWinner();
        currentPlayer = "X";
        statusText.textContent = `Player X's turn`;
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusText.textContent = `Player ${board[a]} wins!`;
            winSound.play();
            board[a] === "X" ? scoreX++ : scoreO++;
            updateScores();
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    }
}

function updateScores() {
    scoreXText.textContent = scoreX;
    scoreOText.textContent = scoreO;
}

function resetGame() {
    board.fill("");
    document.querySelectorAll(".cell").forEach(cell => (cell.textContent = ""));
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
}

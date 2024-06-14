const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (boardState[index] !== null || !isGameActive) {
        return;
    }

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkForWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!boardState.includes(null)) {
        message.textContent = 'Draw!';
        isGameActive = false;
        return;
    }
};

const resetGame = () => {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameActive = true;
    message.textContent = '';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

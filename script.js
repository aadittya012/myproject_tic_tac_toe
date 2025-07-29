const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
let board = [];
let currentPlayer = 'X';
let isGameOver = false;

const winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function startGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  isGameOver = false;
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    if (cell) cellDiv.classList.add(cell.toLowerCase());
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => makeMove(index));
    boardElement.appendChild(cellDiv);
  });
}

function makeMove(index) {
  if (board[index] || isGameOver) return;

  board[index] = currentPlayer;
  if (checkWinner(currentPlayer)) {
    statusElement.textContent = `🎉 Player ${currentPlayer} wins!`;
    isGameOver = true;
  } else if (board.every(cell => cell)) {
    statusElement.textContent = "It's a draw!";
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
  renderBoard();
}

function checkWinner(player) {
  return winCombos.some(combo =>
    combo.every(index => board[index] === player)
  );
}
startGame();

const playerXName = localStorage.getItem('playerXName');
const playerOName = localStorage.getItem('playerOName');

let moveCount = 0;

let storedData = localStorage.getItem('users');
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Hämta alla celler och andra nödvändiga element från DOM
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const endGameBtn = document.getElementById('endGameBtn');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');

// Variabel för att hålla reda på om det är X:s eller O:s tur
let circleTurn;


// Starta spelet när sidan laddas
startGame();

// Går till nästa sida efter någon vunnit
endGameBtn.addEventListener('click', goToEndGamePage);

function goToEndGamePage() {
  const winner = localStorage.getItem('winner');
  window.location.href = 'endGame.html';

  setTimeout(() => {
    window.location.href = 'endGame.html';
  }, 200);
}

// Funktion för att starta spelet
function startGame() {
  // Det är X:s tur
  circleTurn = false;


  // Återställ alla celler och lägg till klick-händelsehanterare
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick);
  });

  // Uppdatera stilen på spelbrädet
  setBoardHoverClass();

  winningMessageElement.classList.remove('show');
}

// Funktion som körs när en spelare klickar på en cell
function handleClick(e) {
  const cell = e.target;

  // Om cellen redan är markerad, avsluta funktionen
  if (cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)) {
    return;
  }

  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  placeMark(cell, currentClass);

  moveCount++;

  // Kolla om någon har vunnit
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins! Total moves done: ${moveCount}`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  });
}

const MAX_X_MARKS = 3;
const MAX_CIRCLE_MARKS = 3;

const xMarks = [];
const circleMarks = [];

function placeMark(cell, currentClass) {
  const marks = currentClass === X_CLASS ? xMarks : circleMarks;
  const maxMarks = currentClass === X_CLASS ? MAX_X_MARKS : MAX_CIRCLE_MARKS;

  if (marks.length >= maxMarks) {
    const oldestMark = marks.shift();
    const lastMovedMark = marks[0];
    oldestMark.classList.remove(currentClass);
    oldestMark.classList.remove(`lastSelected`);
    lastMovedMark.classList.add(`lastSelected`);
  }
  else if (marks.length >= maxMarks - 1) {
    const alertMark = marks[0];
    alertMark.classList.add('lastSelected');
  }
  marks.push(cell);

  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  const isWinner = WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });

  if (isWinner) {
    console.log(`${currentClass === X_CLASS ? playerXName : playerOName} has won!`);

    let existingData = localStorage.getItem('users');

    if (existingData) {
      existingData = JSON.parse(existingData);

      const winnerName = currentClass === X_CLASS ? playerXName : playerOName;
      if (existingData[winnerName]) {
        existingData[winnerName].score = (existingData[winnerName].score || 0) + 1;
      }

      localStorage.setItem('users', JSON.stringify(existingData));

      console.log(`New point for ${winnerName}: ${existingData[winnerName].score}`);
    } else {
      console.log('No users found in localStorage.');
    }

    let matchResult = {
      playerX: playerXName,
      playerO: playerOName,
      winner: currentClass === X_CLASS ? playerXName : playerOName,
      timestamp: new Date().toLocaleString(),
      moveCount: moveCount
    };

    let matchHistory = localStorage.getItem('matchHistory') ? JSON.parse(localStorage.getItem('matchHistory')) : [];
    matchHistory.push(matchResult);
    localStorage.setItem('matchHistory', JSON.stringify(matchHistory));

  }

  return isWinner;
}







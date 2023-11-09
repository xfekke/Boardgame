// Definiera konstanter för olika klasser och kombinationer
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
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');

// Variabel för att hålla reda på om det är X:s eller O:s tur
let circleTurn;

// Starta spelet när sidan laddas
startGame();

// Lägg till en lyssnare för restart-knappen
restartButton.addEventListener('click', startGame);

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

  // Placera markeringen i cellen och hantera spelets logik
  placeMark(cell, currentClass);

  // Kolla om någon har vunnit
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    // Kolla om det är oavgjort
    endGame(true);
  } else {
    // Byt spelare och uppdatera spelbrädet
    swapTurns();
    setBoardHoverClass();
  }
}

// Funktion för att avsluta spelet och visa det vinnande meddelandet
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

// Funktion för att kolla om det är oavgjort
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  });
}

// Konstanter för att hålla reda på det maximala antalet markeringar för X och O
const MAX_X_MARKS = 3;
const MAX_CIRCLE_MARKS = 3;

// Arrayer för att hålla reda på vilka celler som är markerade med X och O
const xMarks = [];
const circleMarks = [];

// Funktion för att placera en markering i en cell
function placeMark(cell, currentClass) {
  const marks = currentClass === X_CLASS ? xMarks : circleMarks;
  const maxMarks = currentClass === X_CLASS ? MAX_X_MARKS : MAX_CIRCLE_MARKS;

  // Om antalet markeringar är lika med eller större än det maximala antalet tillåtna, ta bort den äldsta markeringen
  if (marks.length >= maxMarks) {
    const oldestMark = marks.shift();
    cell.classList.remove(currentClass);
    oldestMark.classList.remove(currentClass);
    marks.push(cell);
  } else {
    marks.push(cell);
  }

  // Lägg till klassen för den aktuella spelaren i cellen
  cell.classList.add(currentClass);
}

// Funktion för att byta tur mellan spelarna
function swapTurns() {
  circleTurn = !circleTurn;
}

// Funktion för att uppdatera stilen på spelbrädet beroende på vilken spelare som är aktiv
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

// Funktion för att kolla om någon har vunnit
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

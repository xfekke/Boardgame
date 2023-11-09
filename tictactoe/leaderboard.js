const headLine = document.createElement("h1");
headLine.innerText = "Scoreboard!";

// Lista med spelare
const users = [
  {
    name: "Player1",
    score: 0
  },
  {
    name: "Player2",
    score: 0
  },
  {
    name: "Player3",
    score: 0
  },
  {
    name: "Player4",
    score: 0
  },
  {
    name: "Player5",
    score: 0
  },
  {
    name: "Player6",
    score: 0
  }
];

// Skapa table element
const table = document.createElement("table");
const thead = document.createElement("thead");
const tbody = document.createElement("tbody");
const trHead = document.createElement("tr");
const thName = document.createElement("th");
const thScore = document.createElement("th");
const thAdd1 = document.createElement("th");
const thRemove1 = document.createElement("th");
const thAdd5 = document.createElement("th");
const thRemove5 = document.createElement("th");

// Stoppa in text i table head columns
thName.innerText = "Player Name";
thAdd1.innerText = "Add 1";
thRemove1.innerText = "Remove 1";
thAdd5.innerText = "Add 5";
thRemove5.innerText = "Remove 5";
thScore.innerText = "Player Score";

// Bygger ihopa min table
trHead.appendChild(thName);
trHead.appendChild(thAdd1);
trHead.appendChild(thRemove1);
trHead.appendChild(thAdd5);
trHead.appendChild(thRemove5);
trHead.appendChild(thScore);
thead.appendChild(trHead);
table.appendChild(thead);
table.appendChild(tbody);

let index = 0;

for (let user of users) {
  // Skapa alla table element för varje spelar rad 
  const playerRow = document.createElement("tr");
  const playerName = document.createElement("td");
  const playerAdd1 = document.createElement("td");
  const playerRemove1 = document.createElement("td");
  const playerAdd5 = document.createElement("td");
  const playerRemove5 = document.createElement("td");
  const playerScore = document.createElement("td");

  // Lägger till text i varje spelar rads kolumn 
  playerName.innerText = user.name;
  playerAdd1.innerText = "+ 1";
  playerRemove1.innerText = "- 1";
  playerAdd5.innerText = "+ 5";
  playerRemove5.innerText = "- 5";
  playerScore.innerText = user.score;

  // Lägger till ett id på varje rad. 
  playerRow.id = index;

  // Lägger till en class för varje kolumn
  playerAdd1.classList.add("add1");
  playerRemove1.classList.add("remove1");
  playerAdd5.classList.add("add5");
  playerRemove5.classList.add("remove5");
  playerScore.classList.add("playerScore");

  // Stoppar in kolumnerna i raden
  playerRow.appendChild(playerName);
  playerRow.appendChild(playerAdd1);
  playerRow.appendChild(playerRemove1);
  playerRow.appendChild(playerAdd5);
  playerRow.appendChild(playerRemove5);
  playerRow.appendChild(playerScore);

  // Stoppar in raden i tbody
  tbody.appendChild(playerRow);
  index++;
}

// Lägger till en eventlistener på tbody
tbody.addEventListener("click", function (event) {

  // Hämtar vilket html-element som användaren klickade på
  const target = event.target;

  // Använder closest-metoden för att hämtar raden som elementet la i.
  const playerRow = event.target.closest('tr');

  // Hämtar ut index värde från raden.
  const playerIndex = playerRow.id;

  // Kollar vilken av poäng förändring kolumnerna som användaren tryckte på
  if (target.matches(".add1")) {
    users[playerIndex].score++;
  } else if (target.matches(".remove1")) {
    users[playerIndex].score--;
  } else if (target.matches(".add5")) {
    users[playerIndex].score += 5;
  } else if (target.matches(".remove5")) {
    users[playerIndex].score -= 5;
  }

  // Väljer score-kolumnen från raden
  const playerScore = playerRow.querySelector('.playerScore');

  // Uppdaterar text i score-kolumnen
  playerScore.innerText = users[playerIndex].score;
})

document.body.appendChild(headLine);
document.body.appendChild(table);
var matchHistory = [];

document.addEventListener('DOMContentLoaded', function () {
  // hämta info
  matchHistory = getMatchHistory();

  // ref till html
  var nameSelector = document.getElementById('nameSelector');


  // loop för skapa spelar namn i dropdown menyn
  var uniquePlayerNames = {};
  for (var i = 0; i < matchHistory.length; i++) {
    var currentMatch = matchHistory[i];
    if (currentMatch.playerX) uniquePlayerNames[currentMatch.playerX] = true;
    if (currentMatch.playerO) uniquePlayerNames[currentMatch.playerO] = true;
  }

  // option för unika namn - tas bort?
  for (var playerName in uniquePlayerNames) {
    var option = document.createElement('option');
    option.value = playerName;
    option.text = playerName;
    nameSelector.appendChild(option);
  }
});

function getMatchHistory() {
  var matchHistoryString = localStorage.getItem('matchHistory');
  return JSON.parse(matchHistoryString) || [];
}

function showPlayerHistory() {
  // namn hämtat till dropdown
  var selectedPlayerName = nameSelector.value;

  // hämtar ref till resultatContainer från html
  var resultContainer = document.getElementById('resultContainer');

  // visa matchhistorik för valt namn i resultContainer
  var playerHistory = findPlayerHistory(selectedPlayerName);

  if (playerHistory.length > 0) {
    resultContainer.innerHTML = 'Match history for' + selectedPlayerName + ':<br>' + playerHistory.join('<br>');
  } else {
    resultContainer.innerHTML = 'No history found for ' + selectedPlayerName;
  }
}

// söka historik per namn
function findPlayerHistory(playerName) {
  var playerHistory = [];

  for (var i = 0; i < matchHistory.length; i++) {
    var currentMatch = matchHistory[i];
    if (currentMatch.playerX === playerName || currentMatch.playerO === playerName) {
      var historyString = `Player: ${currentMatch.playerX} vs ${currentMatch.playerO}, Winner: ${currentMatch.winner}, Moves made: ${currentMatch.moveCount}, Timestamp: ${currentMatch.timestamp}`;
      playerHistory.push(historyString);
    }
  }

  return playerHistory;
}

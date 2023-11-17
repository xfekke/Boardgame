var matchHistory = [];

document.addEventListener('DOMContentLoaded', function () {
  matchHistory = getMatchHistory();

  var nameSelector = document.getElementById('nameSelector');

  var uniquePlayerNames = {};
  for (var i = 0; i < matchHistory.length; i++) {
    var currentMatch = matchHistory[i];
    if (currentMatch.playerX) uniquePlayerNames[currentMatch.playerX] = true;
    if (currentMatch.playerO) uniquePlayerNames[currentMatch.playerO] = true;
  }

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

  var selectedPlayerName = nameSelector.value;

  var resultContainer = document.getElementById('resultContainer');

  var playerHistory = findPlayerHistory(selectedPlayerName);

  if (playerHistory.length > 0) {
    resultContainer.innerHTML = 'Match history for ' + selectedPlayerName + ':<br>' + '<hr>' + playerHistory.join('<br>' + '<hr>');
  } else {
    resultContainer.innerHTML = 'No history found for ' + selectedPlayerName;
  }
}

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

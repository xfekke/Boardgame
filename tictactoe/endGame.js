document.addEventListener('DOMContentLoaded', function () {
  displayPlayerResults();
});

function displayPlayerResults() {
  // Hämta data från local storage
  let existingData = localStorage.getItem('users');
  if (!existingData) {
    console.error('No player data found.');
    return;
  }

  existingData = JSON.parse(existingData);

  // Sortera spelarna efter poäng i fallande ordning
  let sortedPlayers = Object.values(existingData).sort((a, b) => b.score - a.score);

  // Välj den plats i DOM där du vill visa resultatet
  let playersResultsContainer = document.getElementById('playersResults');

  // Loopa igenom de första 10 resultaten och skapa HTML för att visa namn och poäng
  for (let i = 0; i < Math.min(10, sortedPlayers.length); i++) {
    let player = sortedPlayers[i];
    let playerDiv = document.createElement('div');
    playerDiv.innerHTML = `<p>Name: ${player.name}</p><p>Score: ${player.score}</p>`;
    playersResultsContainer.appendChild(playerDiv);
  }
}

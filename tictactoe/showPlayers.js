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

  // Hämta det element där du vill visa spelarinformationen
  const playerListContainer = document.getElementById('playerListContainer');

  // Loopa genom användarobjekten och skapa HTML-element för varje spelare
  for (const playerName in existingData) {
    if (existingData.hasOwnProperty(playerName)) {
      const player = existingData[playerName];

      const playerElement = document.createElement('div');
      playerElement.textContent = `Player: ${player.name}, Score: ${player.score}`;

      // Lägg till det skapade elementet i container
      playerListContainer.appendChild(playerElement);
    }
  }
}



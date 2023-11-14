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

  // Sortera spelarna efter poäng i fallande ordning, hantera undefined-värden
  let sortedPlayers = Object.values(existingData)
    .filter(player => player.score !== undefined) // Filtrera bort spelare med undefined score
    .sort((a, b) => (b.score || 0) - (a.score || 0)); // Sortera baserat på poäng, hantera undefined-värden

  // Visa endast de första 10 spelarna
  sortedPlayers = sortedPlayers.slice(0, 10);

  // Välj den plats i DOM där du vill visa resultatet
  let playersResultsTable = document.getElementById('playersResults');

  // Loopa igenom resultaten och skapa tabellrader
  sortedPlayers.forEach(player => {
    let row = playersResultsTable.insertRow();
    let nameCell = row.insertCell(0);
    let scoreCell = row.insertCell(1);
    nameCell.textContent = player.name;
    scoreCell.textContent = player.score;

    nameCell.style.paddingRight = '20vh';
    nameCell.style.marginBottom = '20vh';

    nameCell.textContent = player.name;
    scoreCell.textContent = player.score;
  });
}


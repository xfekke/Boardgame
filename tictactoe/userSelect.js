// HA INTE ADD PLAYER HÄR

function loadUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}


function updateDropdowns() {
  const playerXSelect = document.getElementById("playerX");
  const playerOSelect = document.getElementById("playerO");

  playerXSelect.innerHTML = "";
  playerOSelect.innerHTML = "";

  const defaultOption = new Option("Select a player", "");

  [playerXSelect, playerOSelect].forEach(select => {
    select.add(defaultOption);
    loadUsers().forEach(user => {
      select.add(new Option(user, user));
    });
  });
}

function startGame() {
  alert("Game started! Add your logic to navigate to the game page.");
}

window.onload = function () {
  updateDropdowns();
};
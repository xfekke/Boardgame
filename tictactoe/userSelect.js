let alertMessage = false;

function loadUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}





// function addUser() {
//   const usernameInput = document.getElementById("username");
//   const username = usernameInput.value.trim();

//   if (username) {
//     const users = loadUsers();
//     users.push(username);
//     saveUsers(users);
//     updateDropdowns();
//     usernameInput.value = "";
//   }
// }

function addUser() {
  event.preventDefault();

  let playerName = document.getElementById('userName').value;


  //så inputs ej är tomma och alerts bara visas 1 gång
  if (!playerName) {
    if (!alertMessage) {
      alert('You have to enter both names!');
    }
    return;
  }

  if (playerName.length > 10 || playerName.length < 2) {
    if (!alertMessage) {
      alert("Name has to be between 2-10 characters!");
    }
    return;
  }

  // läs/hämta localstorage info
  let existingData = localStorage.getItem('users');

  if (!existingData) {
    existingData = {};
  } else {
    existingData = JSON.parse(existingData);
  }

  if (!existingData[playerName]) {
    existingData[playerName] = { name: playerName, score: 0 };
  }



  // spara till localstorage
  localStorage.setItem('users', JSON.stringify(existingData));

  console.log('Data saved successfully:', existingData);

  localStorage.setItem('playerXName', playerName);
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
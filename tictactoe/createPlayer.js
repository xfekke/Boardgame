let alertMessage = false;

function savePlayerBtn() {
  event.preventDefault();

  let playerXName = document.getElementById('userNameX').value;
  let playerOName = document.getElementById('userNameO').value;

  //så inputs ej är tomma och alerts bara visas 1 gång
  if (!playerXName || !playerOName) {
    if (!alertMessage) {
      alert('You have to enter both names!');
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

  if (!existingData[playerXName]) {
    existingData[playerXName] = { name: playerXName, score: 0 };
  }

  if (!existingData[playerOName]) {
    existingData[playerOName] = { name: playerOName, score: 0 };
  }

  // spara till localstorage
  localStorage.setItem('users', JSON.stringify(existingData));

  console.log('Data saved successfully:', existingData);

  localStorage.setItem('playerXName', playerXName);
  localStorage.setItem('playerOName', playerOName);

  window.location.href = './tictactoe.html';
}

document.getElementById('jsonbtn').addEventListener('click', savePlayerBtn);

savePlayerBtn();


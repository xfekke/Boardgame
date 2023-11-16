let alertMessage = false;

function savePlayerBtn() {
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
      alert("Name has to be between 2 and 10 characters!");
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

  localStorage.setItem('playerName', playerName);


  window.location.href = './main.html';
}

document.getElementById('jsonbtn').addEventListener('click', savePlayerBtn);

savePlayerBtn();


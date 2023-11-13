function savePlayerBtn() {
  let playerXName = document.getElementById('userNameX').value;
  let playerOName = document.getElementById('userNameO').value;

  // läs/hämta localstorage info
  let existingData = localStorage.getItem('users');

  if (!existingData) {
    existingData = {};
  } else {
    existingData = JSON.parse(existingData);
  }

  // uppdatera
  existingData.playerXName = playerXName;
  existingData.playerOName = playerOName;

  // spara till localstorage
  localStorage.setItem('users', JSON.stringify(existingData));

  console.log('Data saved successfully:', existingData);
}

savePlayerBtn();


var storedData = JSON.parse(localStorage.getItem('users')) || [];

// Referens till select-taggen
var selectElement = document.getElementById('nameSelect');

// Loopa igenom varje objekt i localStorage och lägg till en option för varje namn
storedData.forEach(function (item) {
  var option = document.createElement('option');
  option.value = item.name; // Här använder vi "name"-värdet
  option.text = item.name;
  selectElement.appendChild(option);
});

function playGameBtn() {
  window.location.href = './tictactoe.html';
}

document.getElementById('jsonbtn').addEventListener('click', playGameBtn);

playGameBtn();
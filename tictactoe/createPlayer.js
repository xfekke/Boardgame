import fs from "fs";

function savePlayerBtn() {
  let playerXName = document.getElementById('userNameX').value 
  let playerOName = document.getElementById('userNameO').value

  localStorage.setItem('users', JSON.stringify('myStorage'));
}

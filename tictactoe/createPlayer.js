const fs = require('fs');

var userName = document.getElementById("userName");
var jsonBtn = document.getElementById("jsonbtn");
var jsonText = document.getElementById("jsontext");

jsonBtn.addEventListener("click", function () {
  // username objekt
  var data = {
    "userName": userName.value,
  };

  // läs json
  fs.readFile('users.json', 'utf8', (err, jsonString) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }

    // konvertera, gör tom array om json är tom
    const existingData = jsonString ? JSON.parse(jsonString) : [];

    // lägger till namn i array
    existingData.push(data);

    // sparar namn
    fs.writeFile('users.json', JSON.stringify(existingData), 'utf8', (err) => {
      if (err) {
        console.log("Error writing file:", err);
        return;
      }

      // Uppdatera användargränssnittet med JSON-data
      jsonText.innerHTML = JSON.stringify(data);
      console.log("User registered and data saved to users.json");
    });
  });
});

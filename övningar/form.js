// I formuläret ska man skriva in sitt namn, efternamn och när man är född.
// Javascript ska ta emot informationen från formuläret och spara det i en JSON-fil vid namn users.json
// Se till att:

// Användaren måste svara på samtliga frågor.
// Användaren ska inte skriva in sin födelsedag i en input-text, hitta en bättre typ


  
function logSubmit(event) {
    log.textContent = `Form Submitted!`;
    event.preventDefault();
  }
  
  const form = document.getElementById("form");
  const log = document.getElementById("log");
  form.addEventListener("submit", logSubmit);


  console.log(form);
  console.log(log);
 
  

const djurArray = ['Hund', 'Katt', 'Kanin', 'Häst', 'Giraff'];

const form = document.createElement('form');
form.setAttribute('id', 'djurForm');

const select = document.createElement('select');
select.setAttribute('id', 'djurSelect');
select.setAttribute('name', 'djur');

djurArray.forEach(djur => {
  const option = document.createElement('option');
  option.value = djur.toLowerCase();
  option.textContent = djur;
  select.appendChild(option);
});

const submitBtn = document.createElement('input');
submitBtn.setAttribute('type', 'submit');
submitBtn.value = 'Bekräfta val';

form.appendChild(select);
form.appendChild(submitBtn);

document.body.appendChild(form);

form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.dir(select)
  console.log(select.selectedIndex);
  const valtDjur = select.options[select.selectedIndex].value;
  alert('Du har valt: ' + valtDjur);
});


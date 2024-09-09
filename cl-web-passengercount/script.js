let counter = 0;
const countDisplay = document.getElementById('counter');
const incBtn = document.getElementById('inc-btn');
const saveBtn = document.getElementById('save-btn');
const prevEnt = document.getElementById('prev-entr');

const displayCount = () => {
  countDisplay.textContent = counter;
}

const incrementCount = () => {
  counter++;
  displayCount();
}

const saveCount = () => {
  prevEnt.textContent += `${counter} - `;
  counter = 0;
  displayCount();
}

incBtn.addEventListener('click', incrementCount);
saveBtn.addEventListener('click', saveCount);

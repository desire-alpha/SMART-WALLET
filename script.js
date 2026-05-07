const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

function toggleTheme() {
  body.classList.toggle('dark-mode');
  themeButtons.forEach(button => {
    button.textContent = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  });
}

themeButtons.forEach(button => button.addEventListener('click', toggleTheme));

const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const totalDisplay = document.getElementById('totalDisplay');
let totalExpenses = 0;

if (expenseForm) {
  expenseForm.addEventListener('submit', event => {
    event.preventDefault();
    const itemName = document.getElementById('itemName').value.trim();
    const itemCategory = document.getElementById('itemCategory').value;
    const itemAmount = parseFloat(document.getElementById('itemAmount').value);

    if (!itemName || isNaN(itemAmount) || itemAmount <= 0) {
      return;
    }

    totalExpenses += itemAmount;
    const li = document.createElement('li');
    li.innerHTML = `<span>${itemName} • ${itemCategory}</span><strong>$${itemAmount.toFixed(2)}</strong>`;
    expenseList.appendChild(li);
    totalDisplay.textContent = `$${totalExpenses.toFixed(2)}`;
    expenseForm.reset();
  });
}

const goalForm = document.getElementById('goalForm');
const goalPreview = document.getElementById('goalPreview');

if (goalForm) {
  goalForm.addEventListener('submit', event => {
    event.preventDefault();
    const goalName = document.getElementById('goalName').value.trim();
    const goalAmount = parseFloat(document.getElementById('goalAmount').value);
    const goalCurrent = parseFloat(document.getElementById('goalCurrent').value);

    if (!goalName || isNaN(goalAmount) || isNaN(goalCurrent) || goalAmount <= 0 || goalCurrent < 0) {
      return;
    }

    const progress = Math.min((goalCurrent / goalAmount) * 100, 100);
    goalPreview.innerHTML = `
      <h2>${goalName}</h2>
      <p>Target: $${goalAmount.toFixed(2)} · Saved: $${goalCurrent.toFixed(2)}</p>
      <div class="goal-progress">
        <div class="progress-bar" style="width: ${progress}%"></div>
      </div>
      <p>${progress.toFixed(0)}% complete</p>
      <p>${progress >= 100 ? 'Congratulations! This goal is complete.' : 'Keep going — your milestone is within reach.'}</p>
    `;
    goalForm.reset();
  });
}

const form = document.getElementById('quoteForm');
const printBtn = document.getElementById('printBtn');

const toCLP = (value) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(Number(value || 0));

const toHumanDate = (value) => {
  if (!value) return '';
  const [y, m, d] = value.split('-');
  return `${d}/${m}/${y}`;
};

const writeList = (selector, content) => {
  const target = document.querySelector(`[data-list="${selector}"]`);
  target.innerHTML = '';
  content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const li = document.createElement('li');
      li.textContent = line;
      target.appendChild(li);
    });
};

const syncPreview = () => {
  document.querySelector('[data-field="quoteNumber"]').textContent = form.quoteNumber.value;
  document.querySelector('[data-field="quoteDate"]').textContent = toHumanDate(form.quoteDate.value);
  document.querySelector('[data-field="clientName"]').textContent = form.clientName.value;
  document.querySelector('[data-field="clientPhone"]').textContent = form.clientPhone.value;
  document.querySelector('[data-field="totalPrice"]').textContent = toCLP(form.totalPrice.value);

  writeList('systemDetails', form.systemDetails.value);
  writeList('conditions', form.conditions.value);
  writeList('bankData', form.bankData.value);
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  syncPreview();
});

printBtn.addEventListener('click', () => {
  syncPreview();
  window.print();
});

const today = new Date();
const localIso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
form.quoteDate.value = localIso;
syncPreview();

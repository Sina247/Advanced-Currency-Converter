async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const base = document.getElementById('baseCurrency').value.toUpperCase() || 'USD';
  const target = document.getElementById('targetCurrency').value.toUpperCase() || 'EUR';
  const resultEl = document.getElementById('result');
  const errorEl = document.getElementById('error');

  resultEl.textContent = '';
  errorEl.textContent = '';

  if (!amount || amount <= 0) {
    errorEl.textContent = 'Please enter a valid amount.';
    return;
  }

  if (!base.match(/^[A-Z]{3}$/) || !target.match(/^[A-Z]{3}$/)) {
    errorEl.textContent = 'Currency codes must be 3-letter ISO codes.';
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
    if (!res.ok) throw new Error('Could not fetch rates.');
    const data = await res.json();
    const rate = data.rates[target];
    if (!rate) throw new Error(`Rate for ${target} not found.`);
    const converted = (amount * rate).toFixed(4);
    resultEl.textContent = `${amount} ${base} = ${converted} ${target}`;
  }

  catch (err) {
    errorEl.textContent = err.message;
  }
}

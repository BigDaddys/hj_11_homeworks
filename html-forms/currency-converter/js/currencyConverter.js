const XHR = new XMLHttpRequest();
const loader = document.getElementById('loader');
const content = document.getElementById('content');
const result = document.getElementById('result');
const source = document.getElementById('source');
const fromCurrency = document.getElementById('from');
const toCurrency = document.getElementById('to');

XHR.addEventListener('load', initConverter);

fromCurrency.addEventListener('change', () => {
  countCurrency(fromCurrency, toCurrency);
});

toCurrency.addEventListener('change', () => {
  countCurrency(fromCurrency, toCurrency);
});

source.addEventListener('input', () => {
  countCurrency(fromCurrency, toCurrency);
});

XHR.open('GET', 'https://neto-api.herokuapp.com/currency');
XHR.send();

loader.classList.remove('hidden');

function initConverter(event) {
  if (event.target.status === 200) {
    const response = JSON.parse(event.target.responseText);

    content.classList.remove('hidden');
    loader.classList.add('hidden');

    renderData(response);
  }
}

function renderData(data) {
  for (let item of data) {
    const optionTmpl = `<option value="${item.value}" label="${item.code}">${item.title}</option>`;

    fromCurrency.innerHTML += optionTmpl;
    toCurrency.innerHTML += optionTmpl;

    countCurrency(fromCurrency, toCurrency);
  }
}

function countCurrency(fromCurr, toCurr) {
  const countFromCurrency = source.value * fromCurr.value;
  const textFromCurrency = fromCurr.options[fromCurr.selectedIndex].innerHTML;
  const textToCurrency = toCurr.options[toCurr.selectedIndex].innerHTML;

  result.value = `${source.value} ${textFromCurrency} => ${(countFromCurrency / toCurr.value).toFixed(2)} ${textToCurrency}`;
}
const urlParams = new URLSearchParams(window.location.search);
const predictedPrice = urlParams.get('predicted_price');

let ppElem = document.getElementById('predicted-price');
ppElem.innerHTML = '<h3>Стоимость квартиры по введённым параметрам = <b>' + predictedPrice + '</b> ₽</h3>';

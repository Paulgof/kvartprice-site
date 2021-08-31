const api_url = 'https://kvartprice.info:8888/api';

async function getStatistics() {
    let response = await fetch(api_url + '/statistics');
    if (response.ok) {
        let json = await response.json();

        let statTotal = document.getElementById('statistics-total');
        let statMeanPricePerSquare = document.getElementById('statistics-mean-price');
        let statTopDistrict = document.getElementById('statistics-top-district');
        statTotal.innerHTML = '<b>' + json['total_offers'] + '</b>' +
            '<div class="statistic-description">выборка квартир</div>';
        statMeanPricePerSquare.innerHTML = '<b>' + json['mean_price'] + '</b>' +
            ' ₽<div class="statistic-description">средняя цена за кв. м.</div>';
        statTopDistrict.innerHTML = 'в <b>' + json['top_offers_district']['area'] + '</b>' +
            '<div class="statistic-description">больше всего объявлений</div>';


    } else {
        alert('getStatistics error: ' + response.status);
    }
}

async function getFormOptions() {
    let response = await fetch(api_url + '/form/options');
    if (response.ok) {
        let json = await response.json();
        console.log(json);

        for (let key in json) {
            console.log(key);
            let formSelect = null;
            if (key == 'misrodistrict') {
                formSelect = document.getElementsByName('microdistrict')[0];
            } else {
                formSelect = document.getElementsByName(key)[0];
            }
            console.log(formSelect)
            let selectHtml = '';
            for (let elem in json[key]) {
                selectHtml += '<option value="' + json[key][elem] + '"> ' + json[key][elem] + '</option>'
            }
            formSelect.innerHTML = selectHtml;
        }
    } else {
        alert('getFormOptions error: ' + response.status);
    }
}

async function loadContent() {
    await getStatistics();
    await getFormOptions();
}

loadContent();

/**
 * Campo de pesquisa onde vai ser pego as info da city
 */
document.querySelector('.busca').addEventListener('submit', async (e) => {

    e.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {

        clearInfo();
        showWarning('Carregando...!');

        let apiKey = '90507e6c7079e035fcbdc1829e22b13a'

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${ encodeURI(input) }&appid=${ apiKey }&units=metric&lang=pt_br`;
        
        let results = await fetch(url);
        let json    = await results.json();
        
        if (json.cod === 200) {

            showInfo({
                name      : json.name,
                country   : json.sys.country,
                temp      : json.main.temp,
                tempIcon  : json.weather[0].icon,
                windSpeed : json.wind.speed,
                windAgle  : json.wind.deg
            });

        } else {

            clearInfo();
            showWarning('Não encontramos essa localização');
        }

    } else {
        clearInfo();
    }

});

/**
 * Apresenta o conteudo da cidade
 * @param {*} json 
 */
function showInfo(json) {

    showWarning('');

    let src = `http://openweathermap.org/img/wn/${ json.tempIcon }@2x.png`;

    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML    = `${ json.name }, ${ json.country }`;
    document.querySelector('.tempInfo').innerHTML  = `${ json.temp } <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${ json.windSpeed } <span>Km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `${ src }`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${ json.windAgle - 90 }deg)`;

}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

/**
 * mostra o aviso na tela
 * @param {*} msg 
 */
function showWarning(msg) {

    document.querySelector('.aviso').innerHTML = msg;
}

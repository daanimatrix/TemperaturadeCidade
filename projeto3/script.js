document.querySelector('.busca').addEventListener('submit',async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    // console.log(input);
      

    if(input != ""){
        showwarning('carregando...');/*d06cdb298fafc83c520d5ab677fc477e  / d0aaa32647807c477a62b7c0b42dbb4e*/

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br `;

        let results = await fetch(url);
        let json = await results.json();

        console.log(json);

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp : json.main.temp,
                tempIcon : json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            clearInfo();
            showwarning('Não encontramos esta localização');
        }
    }
});

function showInfo(json){
    showwarning('');
    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

}

function clearInfo(){
    document.querySelector('.resultado').style.display = `none`;
}

function showwarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}
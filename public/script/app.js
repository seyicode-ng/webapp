const api = {
    key: "1277fe04313d5857789bbf5dbedd9b98",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}
const enterbox = document.querySelector('#enter-box');
enterbox.addEventListener('keypress', getWeather);
enterbox.addEventListener('focus', clear);
let query = '';

function getWeather(evt) {
    if (evt.keyCode == 13) {
        getResults(enterbox.value);
    } 
}
function clear(evt){
    enterbox.value = "";
}

function getResults (query) {
    let errorText = document.querySelector('#error');
    errorText.innerText = "";

    this.query = query.toLowerCase();
    let endpoint = `${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`;
    
    fetch(endpoint)
    .then(result => {
        return result.json();
    }).then(displayResults)
    .catch(error=>{
        if (error == 'TypeError: Failed to fetch') {
            let savedData = localStorage.getItem(this.query);
      
            if(savedData){
              displayResults(JSON.parse(savedData));
              errorText.innerText = "You are offline!";
            }
            else {
                errorText.innerText = `You are offline! ${query} was not saved in memory`;
            }
        }
    });
}

function displayResults (weather) {

    let savedData = JSON.stringify(weather);

    if (weather.coord)
        localStorage.setItem(this.query, savedData);

    let state = document.querySelector('.location .state');
    state.innerText = `${weather.name}, ${weather.sys.country}`;

    let now =  new Date();
    let date = document.querySelector('.location .date');
    date.innerText = now.toDateString();

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}&#176;c`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let highlow = document.querySelector('.high-low');
    highlow.innerHTML = `${Math.round(weather.main.temp_min)}&#176;c / ${Math.round(weather.main.temp_max)}&#176;c`
}

function init(){
    getResults("New York");
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceworker.js')
        .then((reg) => {
          console.log('Service worker registered.', reg);
        })
        .catch(()=>{
            console.log("Error registering service worker")
        });
  });
}
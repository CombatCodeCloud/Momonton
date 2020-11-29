const weather = document.querySelector(".js-weather");

const API_KEY = "695dcce9da6ed1d0a08b1d9d016f07bf";
const COORDS = 'coords';

function getWeather(lt, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lt}&lon=${lng}&appid=${API_KEY}&units=imperial`
    ).then(function (response) {
        return response.json();
    })
        .then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const coordsObj =
    {
        lat,
        long
    };
    saveCoords(coordsObj);
    getWeather(lat, long)
}

function handleGeoError(position) {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    }
    else {
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.lat, parseCoords.long);
    }
}


function init() {
    loadCoords();
}

init();

function formatDate(timestamp) {
    let date = new Date(timestamp);
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];
    return `${day} ${formatHours(timestamp)}`;
  }

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (hours <= 12) {
        return `${hours}:${minutes} AM`;
    }
    if (hours > 12) {
        return `${hours-12}:${minutes} PM`;
    }
    if (hours == 0) {
        return `${hours+12}:${minutes} AM`;
    }
}

function displayTemperature(response) {
    fahrenheitTemperature = response.data.main.temp;
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.name;
    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML=response.data.weather[0].description;
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.main.humidity;
    let windElement=document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);
    let dateElement=document.querySelector("#date");
    dateElement.innerHTML= formatDate(response.data.dt * 1000);
    let iconElement=document.querySelector("#icon");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);
    if (response.data.weather[0].icon == "01d") {
        iconElement.setAttribute("src","images/clear sky day.png");
    }
    if (response.data.weather[0].icon == "01n") {
        iconElement.setAttribute("src","images/clear sky night.png");
    }
    if (response.data.weather[0].icon == "02d") {
        iconElement.setAttribute("src","images/few clouds day.png");
    }
    if (response.data.weather[0].icon == "02n") {
        iconElement.setAttribute("src","images/few clouds night.png");
       }
    if (response.data.weather[0].icon == "03d") {
        iconElement.setAttribute("src","images/clouds.png");
       }
    if (response.data.weather[0].icon == "03n") {
        iconElement.setAttribute("src","images/clouds.png");
       }
    if (response.data.weather[0].icon == "04d") {
        iconElement.setAttribute("src","images/double clouds.png");
       }
    if (response.data.weather[0].icon == "04n") {
        iconElement.setAttribute("src","images/double clouds.png");
    }
    if (response.data.weather[0].icon == "09d") {
        iconElement.setAttribute("src","images/heavy rain.png");
       }
    if (response.data.weather[0].icon == "09n") {
        iconElement.setAttribute("src","images/heavy rain.png");
       }
    if (response.data.weather[0].icon == "10d") {
        iconElement.setAttribute("src","images/rain day.png");
       }
    if (response.data.weather[0].icon == "10n") {
        iconElement.setAttribute("src","images/rain night.png");
       }
    if (response.data.weather[0].icon == "11d") {
        iconElement.setAttribute("src","images/thunderstorms.png");
       }
    if (response.data.weather[0].icon == "11n") {
        iconElement.setAttribute("src","images/thunderstorms.png");
       }
    if (response.data.weather[0].icon == "13d") {
        iconElement.setAttribute("src","images/snow.png");
       }
    if (response.data.weather[0].icon == "13n") {
        iconElement.setAttribute("src","images/snow.png");
       }
    if (response.data.weather[0].icon == "50d") {
        iconElement.setAttribute("src","images/clouds.png");
       }
    if (response.data.weather[0].icon == "50n") {
        iconElement.setAttribute("src","images/clouds.png");
       }
}


function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    var dict = new Map();
dict.set("01d", "images/clear sky day.png");
dict.set("01n", "images/clear sky night.png");
dict.set("02d", "images/few clouds day.png");
dict.set("02n", "images/few clouds night.png");
dict.set("03d", "images/clouds.png");
dict.set("03n", "images/clouds.png");
dict.set("04d", "images/double clouds.png");
dict.set("04n", "images/double clouds.png");
dict.set("09d", "images/heavy rain.png");
dict.set("09n", "images/heavy rain.png");
dict.set("10d", "images/rain day.png");
dict.set("10n", "images/rain night.png");
dict.set("11d", "images/thunderstorms.png");
dict.set("11n", "images/thunderstorms.png");
dict.set("13d", "images/snow.png");
dict.set("13n", "images/snow.png");
dict.set("50d", "images/clouds.png");
dict.set("50n", "images/clouds.png");
  
    for (let index = 0; index < 6; index++) {
      forecast = response.data.list[index];
      forecastElement.innerHTML += `
      <div class="col-2">
        <h3>
          ${formatHours(forecast.dt * 1000)}
        </h3>
        <img
          src="${dict.get(
            forecast.weather[0].icon)
          }";
        />
        <div class="weather-forecast-temperature">
          <strong>
            ${Math.round(forecast.main.temp_max)}°
          </strong>
          ${Math.round(forecast.main.temp_min)}°
        </div>
      </div>
    `;
    }
  }

function search(city){
let apiKey = "19e93f29b7b85bee7efc4d2a5126ad21";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayTemperature);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayForecast);
}


function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value)
}

function displayCelciusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    //remove the active class from the fahrenheit link time
    fahrenheitLink.classList.remove("active")
    celciusLink.classList.add("active")
    let celciusTemperature = (fahrenheitTemperature-32) * 5/9;
    temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    fahrenheitLink.classList.add("active")
    celciusLink.classList.remove("active")
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let musicButton = document.querySelector("#fancyButton");
musicButton.addEventListener("click", playSong, {once:true});

function playSong() {
    var audio = new Audio("audio/táEscrito.mp3");
    audio.play();
}

search("Cleveland")
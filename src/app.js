/** functions */
//get current date
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

  //format hours
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

//display the data from OpenWeatherMap API on HTML
function displayTemperature(response) {
    fahrenheitTemperature = response.data.main.temp;
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.name +", "+response.data.sys.country;
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

    //exchange the icons used by OpenWeatherMap for mine (in images folder) for main image of current temp
    if (response.data.weather[0].icon == "01d") {
        iconElement.setAttribute("src","images/clear sky day.png");
    } else if (response.data.weather[0].icon == "01n") {
        iconElement.setAttribute("src","images/clear sky night.png");
    } else if (response.data.weather[0].icon == "02d") {
        iconElement.setAttribute("src","images/few clouds day.png");
    } else if (response.data.weather[0].icon == "02n") {
        iconElement.setAttribute("src","images/few clouds night.png");
    } else if (response.data.weather[0].icon == "03d" || response.data.weather[0].icon == "03n") {
        iconElement.setAttribute("src","images/clouds.png");
    } else if (response.data.weather[0].icon == "04d" || response.data.weather[0].icon == "04n") {
        iconElement.setAttribute("src","images/double clouds.png");
    } else if (response.data.weather[0].icon == "09d" || response.data.weather[0].icon == "09n") {
        iconElement.setAttribute("src","images/heavy rain.png");
    } else if (response.data.weather[0].icon == "10d") {
        iconElement.setAttribute("src","images/rain day.png");
    } else if (response.data.weather[0].icon == "10n") {
        iconElement.setAttribute("src","images/rain night.png");
    } else if (response.data.weather[0].icon == "11d" || response.data.weather[0].icon == "11n") {
        iconElement.setAttribute("src","images/thunderstorms.png");
    } else if (response.data.weather[0].icon == "13d" || response.data.weather[0].icon == "13n") {
        iconElement.setAttribute("src","images/snow.png");
    } else if (response.data.weather[0].icon == "50d" || response.data.weather[0].icon == "50n") {
        iconElement.setAttribute("src","images/clouds.png");
       }
}

//format weather icons for 3hr forecast
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
      <span class="forecastImg">
      <img
        src="${dict.get(
          forecast.weather[0].icon)
        }";
      />
      </span>
      <div class="weather-forecast-temperature">
        <strong id="forecastTempMax">
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        <span id="forecastTempMin">
        ${Math.round(forecast.main.temp_min)}°
        </span>
      </div>
    </div>
  `;
  }
}


// error handler
function errorHandler(error) {
    let status = error.response.status;
  
    if (status == 404) {
      alert("Please enter a valid city name🤗")
  }
}

//weather main
function search(city){
let apiKey = "19e93f29b7b85bee7efc4d2a5126ad21";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayTemperature);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayForecast).catch(errorHandler);
}

//handle the info submit in the button for enter a city
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value)
}

//temp celcius
function displayCelciusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    //remove the active class from the fahrenheit link time
    fahrenheitLink.classList.remove("active")
    celciusLink.classList.add("active")
    let celciusTemperature = (fahrenheitTemperature-32) * 5/9;
    temperatureElement.innerHTML = Math.round(celciusTemperature);

    let forecastTempMaxElement = document.querySelectorAll("#forecastTempMax");
    forecastTempMaxElement.innerHTML = Math.round((forecastTempMaxElement-32)*5/9);
    let forecastTempMinElement = document.querySelectorAll("#forecastTempMin");
    forecastTempMinElement.innerHTML = Math.round((forecastTempMaxElement-32)*5/9);


}

//temp fahrenheit
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    fahrenheitLink.classList.add("active")
    celciusLink.classList.remove("active")
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

    let forecastTempMaxElement = document.querySelectorAll("#forecastTempMax");
    forecastTempMaxElement.innerHTML = Math.round(fahrenheitTemperature);
    let forecastTempMinElement = document.querySelectorAll("#forecastTempMin");
    forecastTempMinElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

//handling all the form/button clicks

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let musicButton = document.querySelector("#fancyButton");
musicButton.addEventListener("click", playSong);

//adding audio to button
musicButton.addEventListener("click", playSong);
let isPlaying = false;
var audio = new Audio("audio/taEscrito.mp3");
//adding audio to button
function playSong() {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
  } else {
    audio.pause();
    isPlaying = false;
  }
}

//homepage
search("Cleveland")
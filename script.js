const inputValue = document.querySelector('.input-val');
const searchBtn = document.getElementById('searchButton');
const not_found = document.querySelector('.not-found');
const display = document.querySelector('.display');

function weatherStatusImage(state) {
    if (state == "Rain") return "gif/rain.gif"
    else if (state == "Clouds") return "gif/cloudy.gif"
    else if (state == "Mist") return "gif/mist.gif"
    else if (state == "Snow") return "gif/snow.gif"
    else if (state == "Clear") return "gif/clear.gif"
    else if (state == "Smoke") return "gif/mist.gif"
    else if (state == "Haze") return "gif/mist.gif"
    else if (state == "Fog") return "gif/mist.gif"
    else return "gif/clear.gif"
}

async function weatherCheck(city) {
    if (city == "") return;

    const API_KEY = "61efc05ba330715acf081c9329ac3ca4";
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=24&appid=${API_KEY}`;

    try {
        const response = await fetch(URL);
        const weatherData = await response.json();

        if (response.ok) {
            console.log(weatherData);

            not_found.style.display = "none";
            display.style.display = "flex";
            display.innerHTML = "";

            for (let index = 0; index < weatherData.list.length; index += 8) {
                const main = weatherData.list[index].main;
                const weather = weatherData.list[index].weather[0];

                const wind_speed = weatherData.list[index].wind.speed;
                const visibility = weatherData.list[index].visibility / 1000;
                const image = weatherStatusImage(weather.main);
                const state = weather.description;
                const humidity = main.humidity;
                const temp = Math.floor(main.temp - 273.150);
                const date = new Date(weatherData.list[index].dt_txt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                });

                display.innerHTML += `
                    <div class="weather">
                         <p class="forecast-date">${date}</p>
                        <img src="${image}" alt="Weather Status" class="weather-status">
                        <div class="weather-details">
                            <p class="weather-data">${temp} <sup>°C</sup></p>
                            <p class="weather-data2">${state}</p>
                        </div>
                        <div class="weather-description">
                            <div class="humidity">
                                <img src="gif/humidity-unscreen.gif" alt="Humidity">
                                <div class="text">
                                    <span id="humidity">${humidity}%</span>
                                    <p>Humidity</p>
                                </div>
                            </div>
                            <div class="visibility">
                                <img src="gif/vision-unscreen.gif" alt="visibility">
                                <div class="text1">
                                    <span id="visibility">${visibility} km</span>
                                    <p>Visibility</p>
                                </div>
                            </div>
                            <div class="wind">
                                <img src="gif/wind-unscreen.gif" alt="Wind Speed">
                                <div class="text3">
                                    <span class="special" id="wind-speed">${wind_speed} km/h</span>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        } else {
            if (weatherData.cod === `404`){
                not_found.style.display = "flex";
                display.style.display = "none";
            }
            console.error(`Error: ${weatherData.message}`);
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

searchBtn.addEventListener('click', () => weatherCheck(inputValue.value));

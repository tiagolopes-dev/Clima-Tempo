//import { countries } from "./countries";

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "71abbfa661ffcc11f31c820c6c39467d";
  const city = document.querySelector(".search-box input").value;
  const body = document.querySelector("body");

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      const countryFlag = document.querySelector(".country-flag");

      if (body.classList.length > 0) {
        body.className = "";
      }

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";

          body.classList.add("clear");
          break;

        case "Rain":
          image.src = "images/rain.png";

          body.classList.add("rain");
          break;

        case "Snow":
          image.src = "images/snow.png";

          body.classList.add("snow");
          break;

        case "Clouds":
          image.src = "images/cloud.png";

          body.classList.add("cloud");
          break;

        case "Haze":
          image.src = "images/mist.png";

          body.classList.add("mist");
          break;

        case "Mist":
          image.src = "images/mist.png";

          body.classList.add("mist");
          break;

        default:
          image.src = "";

          body.classList.add("empty");
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});

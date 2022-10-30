import { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_KEY;

interface IWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

const Weather = () => {
  const [data, setData] = useState<IWeather>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  }, []);

  function onGeoOk(position: any) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setData(data.weather[0]);
          console.log(data.weather[0]);
        } else {
          console.log(data);
        }

        // const weather = document.querySelector("#weather");
        // let weatherIcon = data.weather[0].main;
        // if (weatherIcon == "Clear") {
        //   weather.innerHTML = `<h1>${data.name}</h1><span>&nbsp<i class="fa-solid fa-sun fa-2x"></i> &nbsp</span>  <span>${data.main.temp}°C</span>`;
        // } else if (weatherIcon == "Rain") {
        //   weather.innerHTML = `<h1>${data.name}</h1><span>&nbsp<i class="fa-solid fa-cloud-rain"></i> &nbsp</span>  <span>${data.main.temp}°C</span>`;
        // } else if (weatherIcon == "Snow") {
        //   weather.innerHTML = `<h1>${data.name}</h1><span>&nbsp<i class="fa-solid fa-snowflake"></i> &nbsp</span>  <span>${data.main.temp}°C</span>`;
        // } else {
        //   weather.innerHTML = `<h1>${data.name}</h1> ${weatherIcon} <p> ${data.main.temp}°C</p>`;
        // }
        // console.log(data.weather[0].main);
      });
  }

  function onGeoError() {
    alert("Can't find you. No weather for you.");
  }
  return <span>{data?.main ? data.main : "Weather.."}</span>;
};

export default Weather;

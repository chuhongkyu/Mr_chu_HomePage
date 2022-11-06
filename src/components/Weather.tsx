import { useState, useEffect } from "react";
import styled from "styled-components";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const API = process.env.REACT_APP_API_KEY;

interface IWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`


const WeatherIcon = styled.img`
  width: 20px;
  height: 20px;
  @media ${(props) => props.theme.device.mobile} {
    width: 15px;
    height: 15px;
  }
`

const weather_icon = ["/weather/clear.svg","/weather/clouds.svg","/weather/rain.svg","/weather/snow.svg","/weather/thunderstorm.svg"]

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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function onGeoError() {
    alert("Can't find you. No weather for you.");
  }
  return <Wrapper>{data?.main ? <WeatherIcon src={env.PUBLIC_URL + `/assets/weather/${data.main.toLowerCase()}.svg`} alt="weather" /> : "Weather.."}</Wrapper>;
};

export default Weather;

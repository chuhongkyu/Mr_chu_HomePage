import { useState, useEffect } from "react";
import styled from "styled-components";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const API = process.env.REACT_APP_API_KEY;

// interface IWeather {
//   description: string;
//   icon: string;
//   id: number;
//   main: string;
// }

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;
`


const WeatherIcon = styled.img`
  width: 100%;
  height: 100%;
  @media ${(props) => props.theme.device.mobile} {
  }
`

const Weather = () => {
  // const [data, setData] = useState<IWeather>();
  const [icon, setIcon] = useState<string>();

  const makeIcon = (type:string ) =>{
    switch(type){
      case "Clear":
        setIcon(type.toLowerCase())
        break;
      
      case "Clouds":
        setIcon(type.toLowerCase())
        break;
      
      case "Rain":
        setIcon(type.toLowerCase())
        break;

      case "Snow":
        setIcon(type.toLowerCase())
        break;

      case "Mist":
        setIcon(type.toLowerCase())
        break;

      case "Drizzle":
        setIcon(type.toLowerCase())
        break;

      case "Thunderstorm":
        setIcon(type.toLowerCase())
        break;

      default:
        setIcon("weather")
        break;
    }
  }

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
          // setData(data.weather[0]);
          makeIcon(data.weather[0].main);
          // console.log(data.weather[0]);
        } else {
          // console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function onGeoError() {
    alert("Can't find you. No weather for you.");
  }
  return <Wrapper>{icon ? <WeatherIcon src={env.PUBLIC_URL + `/assets/weather/${icon}.svg`} alt="weather" /> : "Weather.."}</Wrapper>;
};

export default Weather;

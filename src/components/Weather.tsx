import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const API = import.meta.env.VITE_API_KEY;
interface ILocation {
  coords : {
    latitude: number;
    longitude: number;
  }
}

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
  const [icon, setIcon] = useState<string>();

  const makeIcon = useCallback((type: string) => {
    switch (type) {
      case "Clear":
      case "Clouds":
      case "Rain":
      case "Snow":
      case "Mist":
      case "Drizzle":
      case "Thunderstorm":
        setIcon(type.toLowerCase());
        break;

      default:
        setIcon("weather");
        break;
    }
  }, []);

  const onGeoOk = useCallback((position:ILocation) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          makeIcon(data.weather[0].main);
        } else {
          // console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [makeIcon]);

  const onGeoError = useCallback(() => {
    alert("Can't find you. No weather for you.");
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);
    // console.log(navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError))
  }, [onGeoOk, onGeoError]);
  
  return <Wrapper>{icon ? <WeatherIcon src={`/assets/weather/${icon}.svg`} alt="weather" /> : "Weather.."}</Wrapper>;
};

export default Weather;

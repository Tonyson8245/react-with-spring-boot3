import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [weather, setWeather] = useState({
    temp: "",
    desc: "",
    icon: "",
  });

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=Metric&APIkey=480ebe29647c49b43545232a3d859952"
    )
      .then((response) => response.json())
      .then((result) => {
        setWeather({
          temp: result.main.temp,
          desc: result.weather[0].description,
          icon: result.weather[0].icon,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (weather.icon)
    return (
      <>
        <p>Temperature : {weather.temp}°C</p>
        <p>Description : {weather.desc}</p>
        <img
          src={`http://openweathermap.org/img/w/${weather.icon}.png`}
          alt="weather icon"
        />
      </>
    );
  else {
    return <div>Loading...</div>;
  }
}

export default App;

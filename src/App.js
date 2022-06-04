import axios from "axios";
import { useState } from "react";
import InputField from "./components/InputField";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState("");
  const [userLocation, setuserLocation] = useState("");

  const fetchData = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${process.env.REACT_APP_API_KEY}`
      );
      const data = await res.data;
      setWeatherData(data);
    } catch (err) {
      console.log(err);
      alert("Please enter a valid location");
    }
  };

  const getCurrentDate = () => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const date = `${year}-${month}-${day}`;
    return date;
  };

  return (
    <div className="App">
      <div className="weather">
        <InputField
          text={(e) => setuserLocation(e.target.value)}
          submit={fetchData}
          func={fetchData}
        />
        <div className="weather_display">
          {weatherData && (
            <div className="weather_location">
              <h3>
                {weatherData.name} {weatherData.sys.country}
              </h3>
              <h4 className="weather_degrees">{weatherData.main.temp} °C</h4>

              <div className="weather_description">
                <div>
                  <h3>Date: {getCurrentDate()}</h3>
                  <div className="weather_description_head">
                    <span className="weather_icon">
                      <img
                        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                        alt=""
                      />
                    </span>
                    <h3>{weatherData.weather[0].description}</h3>
                  </div>
                </div>
                <div
                  style={{
                    borderLeft: "2px solid #909090",
                    height: "100px",
                  }}
                />
                <div>
                  <h3>Humidity: {weatherData.main.humidity}%</h3>
                  <h3>Wind speed: {weatherData.wind.speed} m/s</h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

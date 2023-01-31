
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loader from './components/Loader';
import WeatherCard from './components/WeatherCard';

const API_KEY ="012a6235dce2778a34e23aaa1a635152"

function App() { 

  const [coords,setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temps, setTemps] = useState();
  const [isCelsius  , setIsCelsius  ] = useState(true);

  const success = (e) => {
    console.log(e)
    const newCoords = {
      lat:e.coords.latitude,
      lon:e.coords.longitude
    }
    setCoords(newCoords)
  }

  const changeUnitTemp = () => setIsCelsius(!isCelsius)
  
  useEffect (() => {
    navigator.geolocation.getCurrentPosition(success)
  
  }, [])
  
  useEffect(() => {
    if (coords) {
      //empoi
      const URL=`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => {
          setWeather(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(2);
          const fahrenheit = (celsius * (9/5) + 32).toFixed(2);
          const newTemps = {
            celsius,
            fahrenheit
          }
          setTemps(newTemps)
        })
        .catch(err => console.log(err))
    }
    
  }, [coords])

  return (
    <div className="App">
      {
        weather ? (
          <WeatherCard  
            weather={weather} 
            temps={temps} 
            isCelsius={isCelsius} 
            changeUnitTemp={changeUnitTemp} 
          />
        ) : <Loader />
      }
      
    </div>
  )
}

export default App

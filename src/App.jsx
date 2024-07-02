import hotBg from './assets/hot.jpg';
import coldBg from './assets/cold.jpg'
import Descriptions from './components/Descriptions';
import { useEffect, useRef, useState } from 'react';
import { getFormattedWeatherData } from './weatherService';


function App() {

  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('Gurgaon')
  const [units, setUnits] = useState('metric')
  const [bg, setBg] = useState(hotBg)

  const inputRef = useRef(null)

  useEffect(() => {
   const fetchWeatherData = async () => {
    const data = await getFormattedWeatherData(city, units)
    // console.log(data);
    setWeather(data);

    // dynamic bg
    const threshold = units === 'metric' ? 20 : 60;
    if(data.temp <= threshold) setBg(coldBg)
      else setBg(hotBg)
   }
   fetchWeatherData()
  },[units, city])

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    // console.log(button.innerText);
    const currentUnit = button.innerText.slice(1)
    // console.log(currentUnit);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? 'metric' : 'imperial')
  }

  const enterKeyPressed = (e) => {
    if(e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur()  // for lose focus from input box
      inputRef.current.value = ''; // for clear input field
    }
  }
 
  return (
  <div className="app" style={{backgroundImage: `url(${bg}`}}>
  <div className="overlay">
    {
      weather && (
        <div className="container">
        <div className="section section__inputs">
          <input ref={inputRef} onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter Your City..." />
          <button onClick={(e) => handleUnitsClick(e)}>°F</button>
        </div>
  
        <div className="section section_temprature">
          <div className="icon">
            <h3>{`${weather.name}, ${weather.country}`}</h3>
            <img src={weather.iconUrl} alt="weatherIcon" />
            <h3>{weather.description}</h3>
          </div>
  
          <div className='temprature'>
            <h1>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"}`}</h1>
          </div>
        </div>
      {/* bottom description */}
        <Descriptions weather={weather} units={units} />
  
      </div>
      )
    }
   
  </div>
  </div>
  )
}

export default App

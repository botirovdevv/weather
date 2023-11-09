import { useState } from 'react'
import './assets/css/app.css'

const api = {
  key: 'd0f8cbe7b9d02a9c16cae97b713967fb',
  baseUrl: 'https://api.openweathermap.org/data/2.5/'
}
function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = (e) => {
    if(e.key === 'Enter'){
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) =>{ 
        setWeather(result)
        setQuery("")
        console.log(result)
      })
    }
  }

  const dateBuilder = m => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]

    let day = days[m.getDay()]
    let date = m.getDate()
    let month = months[m.getMonth()]
    let year = m.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className={
      (typeof weather.main != 'undefined') ? ((weather.main.temp < -1) ? 'app cold' : 'app') : 'app'
    }>
      <main className='main'>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="search" onChange={e => setQuery(e.target.value)} value={query} onKeyDown={search}/>
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°c</div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        </div>
        ): ("")}
        
      </main>
    </div>
  )
  }
export default App

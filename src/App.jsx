import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [climate, setClimate] = useState({})
  
  const [isCelsius, setIsCelsius]= useState(true)
  const K = Math.round(climate.main?.temp)
  let C=  K - 273
  let F = C*1.8+32
  
  useEffect(()=>{

    const success = pos => {
      
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9a2591b8be2e3fd21b802b068af7c0ae`)
    .then(res => setClimate(res.data))
    }
    navigator.geolocation.getCurrentPosition(success)
  },[])

  console.log(climate);
  return (
    <div className="App" style={{width:'250px',height:'50 %', background:'rgba(255, 255, 255, 0.204)', borderRadius:'3%', position:'center'}}>
      <h2>Wheather App </h2>
      <p>
       <b>Country:</b>
       {climate.sys?.country} </p>
       
       <p>
       <b>City:</b>
       {climate.name}
      </p>

      <p><b style={{opacity:'0,0'}}>Temperature: </b>
      {isCelsius ? C : F}
      {isCelsius?'°C': '°F'}
      </p>
      <p> <img style={{width:'60px', height:'60px'}} src={`http://openweathermap.org/img/wn/${climate?.weather?.[0].icon}@2x.png`} alt="" /></p>

      <button style={{background:'#BBBBBB'}} onClick={() => setIsCelsius(!isCelsius)}>{isCelsius ? 'Change to Fahrenheit' : 'Change to Celsius'}</button>


      
    </div>
  )
}

export default App

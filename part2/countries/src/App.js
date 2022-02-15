import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_WEATHER_API_KEY;
let celcius, icon, wind;

const Search = ({ onChange }) => {
  return (
    <div>
    find countries <input onChange={onChange}/>
    </div>
  )
}

const Button = ({ onClick, country }) => {
  return (
    <div>
      <button onClick={onClick} id={country}>show</button>
    </div>
  )
}

const Countries = ({ countries, onClick }) => {
  // If there are more than 10 countries, show a message
  if(countries.length>10){
    return (
      <div>
        <ul>
          <li>Too many matches, specify another filter</li>
        </ul>
        </div>
    )
  }
  // If there is only one country, show it
  else if (countries.length===1){

    // query weather API
    const getWeather = (capital, api_key) => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
        .then(response => {
          console.log(response);
          celcius = Math.round(parseFloat(response.data.main.temp)-273.15);
          icon = response.data.weather[0].icon;
          wind = response.data.wind.speed;
          console.log('icon',icon);
        })
      };

    getWeather(countries[0].capital, api_key);

    const languages = Object.values(countries[0].languages);
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <p>capital {countries[0].capital}</p>
        <p>area {countries[0].area}</p>
        <h2>languages</h2>
        <ul>
          {languages.map(language =><li key={language}>{language}</li>)}
        </ul>
          <img src={countries[0].flags.png} alt="flag"/>
          <h2>weather in {countries[0].capital}</h2>
          <p>temperature {celcius} celcius</p>
          <img src={`https://openweathermap.org/img/w/${icon}.png`}></img>
          <p>wind {wind} m/s</p>
      </div>
    )
  }
  // If there are between 1 and 10 countries, show them as a list
  else {
  return (
    <div>
    <ul>
      {countries.map(country =>
        <li key={country.name.common}>
          {country.name.common}
          <Button onClick={onClick} country={country.name.common}>show</Button>
        </li>)}
    </ul>
    </div>
  )
}
}

const App = () => {

const [countries, setCountries] = useState([])
const [countriesToShow, setCountriesToShow] = useState(countries)

const filterCountries = (e) => {
  const searchStr = e.target.value.toLowerCase();
  setCountriesToShow(countries.filter(country => country.name.common.toLowerCase().includes(searchStr)));
  // console.log('countriesToShow',countriesToShow.map(country => country.name.common));
}

const showButton = (country) => {
  let targetCountry = country.target.id;
  setCountriesToShow(countries.filter(country => country.name.common === targetCountry));
}


useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      // console.log(response.data);
      setCountries(response.data)
    })
   }, [])

return (
  <>
    <Search onChange={filterCountries}/>
    <Countries countries={countriesToShow} onClick={showButton}/>
  </>
);
}

export default App;

const Weather = (props) => {
    
    if (props.input !== null) {
      const {main, weather, wind} = props.input
      const tempC = (main.temp -273.15).toFixed(2)
      const tempF = ((tempC * 9/5) + 32).toFixed(2) 
      const iconCode = weather[0].icon
      const windInfo = (wind.speed > 0) ? `${wind.speed} m/s` : "none"
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
      return (
        <div className="weather-div">
          <img className="weather-icon" src={iconUrl}/>
          <div className="weather-description">
            <p>{weather[0].description}</p>
            <p>temp: {tempC}°C / {tempF}°F </p>
            <p>wind: {windInfo}</p>
            
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <p> Weather data loading...</p>
        </div>
      )
    }
    
    
}

const InfoComponent = (props) => {
    const {data, conditions} = props
    //console.log(data)
    String.prototype.toProperCase = function () {
      return this.replace(/\w\S*/g, 
          function(txt){
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
    };
    const {altSpellings, 
      name,
      capital,
      area,
      coatOfArms,
      continents,
      demonyms, 
      flags,
      independant,
      landlocked,
      languages,
      maps,
      population,
      timezones,
      unMember,
      subregion,
      cca2} = data
      //console.log(name.common, cca2, capital)
      //onClick(name.common, cca2, capital[0])
  return (
    <div className="results">
      <table>
      <thead>
        <tr>
          <th colSpan="2"><h2>{name.common.toProperCase()}</h2></th>
        </tr>
      </thead>
      <tbody>
        <tr className="">
          <td colSpan="2 center">
            <img className="country-flag" src={flags.svg} alt="Country Flag"/>
            <img className="coat-of-arms" src={coatOfArms.svg} alt="Coat of Arms"/>
          </td>
        </tr>
        <tr>
          <td colSpan="2"><strong>Country Info</strong></td>
        </tr>
        <tr>
          <td>Sub Region</td>
          <td>{subregion}</td>
        </tr>
        <tr>
          <td>Capital(s)</td>
          <td>{capital.map((cap, idx) => <span key={idx}>{cap} </span>)}</td>
        </tr>
        <tr>
          <td>Area</td>
          <td>{area}</td>
        </tr>
        <tr>
          <td>Landlocked</td>
          <td>{landlocked ? "True" : "False"}</td>
        </tr>
        <tr>
          <td>Population</td>
          <td>{population}</td>
        </tr>
        <tr>
          <td>UN Member</td>
          <td>{unMember ? "True" : "False"}</td>
        </tr>
        <tr>
          <td colSpan="2"><strong>Weather In {capital[0]}</strong></td>
        </tr>
        <tr>
          <td colSpan="2"><Weather input={conditions}/></td>
        </tr>
      </tbody>
      {/* You can add a tfoot section here if needed */}
      </table>
    </div>
    )
  }

  export default InfoComponent;
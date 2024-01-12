const Weather = (props) => {
    const iconUrl = {}
    return (
      <div className="weather-div">
        <img className="weather-icon" src={iconUrl}/>
        <div className="weather-description">
          <p>temp: {null}</p>
          <p>wind: {null}</p>
          <p>conditions: {null}</p>
        </div>
      </div>
    )
}

const InfoTable = (props) => {
    const {data} = props
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
          <td colSpan="2"><Weather/></td>
        </tr>
      </tbody>
      {/* You can add a tfoot section here if needed */}
      </table>
    </div>
    )
  }

  export default InfoTable;
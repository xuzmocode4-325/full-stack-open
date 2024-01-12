const Country = (props) => {
    //console.log(props)
    const {names, code, capitals, onClick} = props
    const name = names.common
    const capital = capitals[0]
    return (
      <div className="country-list-item">
        <button onClick={() => onClick(name, code, capital)} className="fill-div">
          {names.common}
        </button>
      </div>
    )
}

const Weather = (props) => {
  console.log(props)
  return (
    <div>

    </div>
  )
}

const Display = (props) => {
    //console.log(props) 
    const {countries, list, onClick} = props
    if (countries.length === 0 ) {
      return (
        <div className="results">
            <p>Loading...</p>
        </div>
        )

    }
    else if (countries.length > 0 && list.length === 0) {
        return (
        <div className="results">
            <p>No results match your query.</p>
        </div>
        )
    }
    else if (list.length >= 250) {
      return (
      <div className="results">
          <p>Enter a query to start your search.</p>
      </div>
      )
    }
    else if (list.length > 10 && list.length !== 0) {
      return (
        <div className="results">
            <h3>Matches</h3>
            <p>{list.length} potential matches</p>
        </div>
      )
    } else if (list.length === 1) {
        //console.log(list[0])
        String.prototype.toProperCase = function () {
            return this.replace(/\w\S*/g, 
                function(txt){
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
        };
        //console.log(list[0]) 
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
            cca2} = list[0]
            //console.log(name.common, cca2, capital)
            onClick(name.common, cca2, capital[0])
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
  </tbody>
  {/* You can add a tfoot section here if needed */}
</table>
        </div>
      )
    } else {
      return(
        <div className="results">
            {list.map(c => 
              <Country
                key={c.id} 
                code={c.cca2}
                names={c.name}
                capitals={c.capital}
                onClick={onClick}
            />)}
        </div>
      )
    }
  }

export default Display; 
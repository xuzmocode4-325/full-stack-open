const Country = (props) => {
    //console.log(props)
    const {names, onClick} = props
    return (
      <div className="country-list-item">
        <button onClick={() => onClick(names.common)} className="fill-div">
          {names.common}
        </button>
      </div>
    )
}

const Display = (props) => {
    //console.log(props) 
    const {list, onClick} = props
    while (list.length === 0) {
        return (
        <div className="results">
            <p>Loading...</p>
        </div>
        )
    }
    while (list.length === 250) {
      return (
      <div className="results">
          <p>Enter a query to start your search.</p>
      </div>
      )
  }
    if (list.length > 10 && list.length !== 0) {
      return (
        <div className="results">
            <h3>Matches</h3>
            <p>{list.length} potential matches</p>
        </div>
      )
    } else if (list.length === 1) {
        String.prototype.toProperCase = function () {
            return this.replace(/\w\S*/g, 
                function(txt){
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
        };
        console.log(list[0]) 
        const {altSpellings, 
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
            subregion} = list[0]
      return (
        <div className="results">
            <table>
                <th><h2>{list[0].name.common.toProperCase()}</h2></th>
              <tr className="center">
                <div className="img-div">
                  <img className="country-flag" src={flags.svg}/>
                  <img className="coat-of-arms" src={coatOfArms.svg}/>
                </div>
              </tr>
              <tr><strong>Country Data</strong></tr>
              <tr>
                <td>Sub Region</td>
                <td>{subregion}</td>
              </tr>
              <tr>
                <td>Capital</td>
                <td>{capital}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>{area}</td>
              </tr>
              <tr>
                <td>Landlocked</td>
                <td>{landlocked? "True" : "False"}</td>
              </tr>
              <tr>
                <td>Population</td>
                <td>{population}</td>
              </tr>
              <tr>
                <td>UN Member</td>
                <td>{unMember? "True" : "False"}</td>
              </tr>
              <tr>
                
              </tr>
            </table>
        </div>
      )
    } else {
      return(
        <div className="results">
            {list.map(c => 
              <Country
                key={c.id} 
                names={c.name}
                onClick={onClick}
            />)}
        </div>
      )
    }
  }

export default Display; 
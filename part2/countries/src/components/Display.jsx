const Country = (props) => {
    //console.log(props)
    const {names} = props
    return (
      <div className="country-list-item">
        {names.common}
      </div>
    )
}

const Display = (props) => {
    //console.log(props) 
    const {list} = props
    while (list === 0) {
        return (
        <>
            <h3>Matches</h3>
            <p>Loading...</p>
        </>
        )
    }
    if (list.length > 10 && list.length !== 0) {
      return (
        <>
            <h3>Matches</h3>
            <p>{list.length} potential matches</p>
        </>
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
        <div>
            <h2>Matches</h2>
            <h3>{list[0].name.common.toProperCase()}</h3>
            <img className="country-flag" src={flags.svg}/>
            <p>sub region: {subregion}</p>
            <p>capital: {capital} </p>  
            <p>area: {area}</p>
            <p>landlocked: {landlocked? "True" : "False"}</p>
            <p>population: {population}</p>
            <p>unMember: {unMember? "True" : "False"}</p>
            <img className="coat-of-arms" src={coatOfArms.svg}/>
            
        </div>
      )
    } else {
      return(
        <>
            {list.map(c => 
              <Country
                key={c.id} 
                names={c.name} 
            />)}
        </>
      )
    }
  }

export default Display; 
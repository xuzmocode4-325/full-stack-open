import InfoComponent from "./InfoComponent"

const Country = (props) => {
    const {names, capitals, onClick} = props
    const name = names.common
    console.log("capitals", capitals)
    return (
      <div className="country-list-item">
        <button onClick={() => onClick(name, capitals)} className="fill-div">
          {names.common}
        </button>
      </div>
    )
}

const Display = (props) => {
    const {countries, list, weather, onClick} = props
    if (countries.length === 0) {
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
      const {name, capital} = list[0]
      console.log(capital)
      onClick(name.common, capital)

      return(
        <InfoComponent data={list[0]} conditions={weather}/>
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
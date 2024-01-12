import InfoTable from "./InfoTable"

const Country = (props) => {
    //console.log(props)
    const {names, capitals, onClick} = props
    const name = names.common
    const capital = capitals[0]
    return (
      <div className="country-list-item">
        <button onClick={() => onClick(name, capital)} className="fill-div">
          {names.common}
        </button>
      </div>
    )
}

const Display = (props) => {
    const {countries, list, onClick} = props
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
      onClick(name.common, capital[0])
      return(
        <InfoTable data={list[0]}/>
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
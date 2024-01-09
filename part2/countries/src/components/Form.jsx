// component for search input intake and processing
const Form = (props) => {
    //console.log(props)
    const {text, onSubmit, handleSearch, value} = props
    return (
      <div className="form">
        <h3>Search A Country</h3>
        <form name="country-search" onSubmit={onSubmit}>
          <input name="search"
            value={value}
            type="text"
            onChange={handleSearch}/>
            <button type="submit" className="search-btn">
              {text}
            </button>
        </form>
      </div>
    )
  }

  export default Form; 

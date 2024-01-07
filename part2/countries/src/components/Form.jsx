// component for search input intake and processing
const Form = (props) => {
    //console.log(props)
    const {text, onSubmit, handleSearch, value} = props
    return (
      <>
        <form name="country-search" onSubmit={onSubmit}>
          <input name="search"
            value={value}
            type="text"
            onChange={handleSearch}/>
            <button type="submit">
              {text}
          </button>
        </form>
      </>
    )
  }

  export default Form; 

const Notification = ({ message }) => {
  const {content, type} = message
  if (content === null & type === null) {
      return null
  } else if (content !== null){
      if(type === 0) {
          return (
              <div className='notification error'>
                {content}
              </div>
          )
      } else if (type === 1) {
          return (
              <div className='notification update'>
                  {content}
              </div>
          )
      }
  } 
}

// component for search input intake and processing
const Form = (props) => {
    //console.log(props)
    const {text, onSubmit, handleSearch, value, message} = props
    return (
      <div className="form">
        <h4>Enter A Country Name</h4>
        <form name="country-search" onSubmit={onSubmit}>
          <input name="search"
            value={value}
            type="text"
            onChange={handleSearch}/>
            <button type="submit" className="search-btn">
              {text}
            </button>
        </form>
        <Notification message={message}/>
      </div>
    )
  }

  export default Form; 

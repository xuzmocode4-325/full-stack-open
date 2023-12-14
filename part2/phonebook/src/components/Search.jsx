const Search = (props) => {
    //console.log('from search', props)
    const {value, onChange} = props
    return (
      <div>
          search: 
          <input 
            value={value}
            onChange={onChange}
          />
        </div>
    )
}

export default Search;
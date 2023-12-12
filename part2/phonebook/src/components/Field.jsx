const Field = (props) => {
    console.log('from field', props)
    const {input, value, onChange} = props
    return (
      <div>
            {input}
            <input 
              value={value}
              onChange={onChange}
            />
      </div>
    )
} 

export default Field;
const Field = (props) => {
    console.log(props)
    return (
      <div>
            {props.input}
            <input 
              value={props.value}
              onChange={props.onChange}
            />
      </div>
    )
} 

export default Field;
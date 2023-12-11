import Field from "./Field"

const Form = (props) => {
    console.log(props)
    return (
      <div>
        <h3>Add New</h3>
        <form  onSubmit={props.onSubmit}> 
          <Field 
            input='name' 
            value={props.newName} 
            onChange={handleName}/>
          <Field 
            input='number' 
            value={props.newNumber} 
            onChange={handleNumber}/>
          <div>
            <button type="submit">Add Contact</button>
          </div>
        </form>
      </div>
    )
  }
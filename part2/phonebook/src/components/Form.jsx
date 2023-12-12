import Field from "./Field"

const Form = (props) => {
    console.log('from form', props)
    const {newName, newNumber, onSubmit, handleName, handleNumber} = props
    return (
      <div>
        <h3>Add New</h3>
        <form  onSubmit={onSubmit}> 
          <Field 
            input='name' 
            value={newName} 
            onChange={handleName}/>
          <Field 
            input='number' 
            value={newNumber} 
            onChange={handleNumber}/>
          <div>
            <button type="submit">Add Contact</button>
          </div>
        </form>
      </div>
    )
  }

  export default Form;
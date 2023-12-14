const Contact = (props) => {
  const {person, onClick} = props
  //console.log(props)
  return (
    <div>
        {person.name} {person.number} 
        <button onClick={onClick}>
          delete
        </button>
    </div>
  )
}

const Display = (props) => {
    const {persons, handleDelete} = props
    //console.log(props)
    return (
      <div>
        <h3>Contacts</h3>
          {persons.map(person => 
            <Contact 
              key={person.id} 
              person={person} 
              onClick={() => handleDelete(person.id)}
          />)}
      </div>
    )
}

export default Display; 
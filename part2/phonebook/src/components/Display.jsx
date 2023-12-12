const Contact = (props) => {
  console.log('from contact', props)
  const {person} = props
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Display = (props) => {
    console.log('from display', props)
    const {persons} = props
    return (
      <div>
        <h3>Contacts</h3>
          {persons.map(person => 
            <Contact key={person.id} person={person}
          />)}
      </div>
      
    )
}

export default Display; 
import Contact from "./Contact";

const Display = ({persons}) => {
    console.log(persons)
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
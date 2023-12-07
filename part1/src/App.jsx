const Hello = (props) => {
  const {name, age} = props

  const bornYear = () => new Date().getFullYear()- age;
  
  console.log(props)
  
  return (
    <div>
      <p>Hello {name} you are {age} years old.</p>
      <p>You were probably born in {bornYear()}</p>
    </div>
  )
}


const App = () => {
  const peeps = [
    {name: 'Katlego', age:31},
    {name: 'Lerato', age:22 },
    {name: 'Tshepiso',  age: 34},
    {name: 'Thabiso', age: 25},
    {name: 'Kagiso ',  age: 36},
    {name: 'Lethabo', age: 24}
  ]
  
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={peeps[0].name} age={peeps[0].age} />
      <Hello name={peeps[1].name} age={peeps[1].age}/>
      <Hello name={peeps[2].name} age={peeps[2].age}/>
      <Hello name={peeps[3].name} age={peeps[3].age}/>
      <Hello name={peeps[4].name} age={peeps[4].age}/>
      <Hello name={peeps[5].name} age={peeps[5].age}/>
    </div>
  )
}

export default App
const Header = (props) => {
  return (
    <div>
        <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.names[0]} exercises={props.exercises[0]}/>
      <Part part={props.names[1]} exercises={props.exercises[1]}/>
      <Part part={props.names[2]} exercises={props.exercises[2]}/>
    </div>
  )
}

const Total = (props) => {
  return (
  <div>
    <p>Number of exercises {props.sum}</p>
  </div>
  )
}

const App = () => {
  const course = 'Half Stack Application Development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (

    <div>
      <Header course={course}/>
      <Content names={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/> 
      <Total sum={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
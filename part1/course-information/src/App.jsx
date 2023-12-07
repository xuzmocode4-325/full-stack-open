const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>{props.part} {props.ex}</p>
  )
}

const Content = (props) => {
  const parts=props.parts
  const ex= props.exercises
  console.log("parts:", parts)
  console.log("exercises:", ex)
  return(
    <div>
      <Part part={parts[0]} ex={ex[0]} />
      <Part part={parts[1]} ex={ex[1]}/>
      <Part part={parts[2]} ex={ex[2]}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack Application Development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using Props to Pass Data'
  const exercises2 = 7
const part3 = 'State of a Component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content parts={[part1, part2, part3]} exercises={[exercises1,exercises2,exercises3]}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App  

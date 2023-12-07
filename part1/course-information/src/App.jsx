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
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content 
        parts={[part1.name, part2.name, part3.name]} 
        exercises={[part1.exercises, part2.exercises, part3.exercises]}/>
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App  

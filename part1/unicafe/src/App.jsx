const Header = (props) => {
  return (
    <div>
        <h1>{props.course.name}</h1>
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
  const input = props.course.parts
  return (
    <div>
      <Part part={input[0]['name']} exercises={input[0]['exercises']}/>
      <Part part={input[1]['name']} exercises={input[1]['exercises']}/>
      <Part part={input[2]['name']} exercises={input[2]['exercises']}/>
    </div>
  )
}

const Total = (props) => {
  const sum = props.course.parts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue['exercises']
  }, 0);
  return (
  <div>
    <p>Number of exercises {sum}</p>
  </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using Props to Pass Data',
        exercises: 7
      },
      {
        name: 'State of a Component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/> 
      <Total course={course}/>
    </div>
  )
}

export default App
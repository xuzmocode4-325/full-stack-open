const Header = (props) => {
  //console.log(props)
  return (
    <h1>{props.title}</h1>
  )
}

const Part = (props) => {
  //console.log(props)
  return (
    <p>{props.part}: {props.ex}</p>
  )
}

const Content = (props) => {
  const partName= props.parts.map(x => x.name) 
  const exNum= props.parts.map(y => y.exercises)
  console.log("parts:", partName)
  console.log("exercises:", exNum)
  return(
    <div>
      <Part part={partName[0]} ex={exNum[0]} />
      <Part part={partName[1]} ex={exNum[1]}/>
      <Part part={partName[2]} ex={exNum[2]}/>
    </div>
  )
}

const Total = (props) => {
  //console.log(props.parts)
  const Add = (accumulator, a) => {
    return accumulator + a;
  }
  const sum = props.parts.map(y => y.exercises).reduce(Add, 0)
  console.log("sum:", sum)
  return (
    <p>Number of Exercises: {sum}</p>
  )
}

const CourseInfo = (props) => {
  console.log(props)
  return (
    <div>
      <Header title={props.name}/>
      <Content parts={props.parts}/>
      <Total parts={props.parts}/>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack Application Development'
  const parts = [
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

  return (
    <CourseInfo name={course} parts={parts}/>
  )
}

export default App  

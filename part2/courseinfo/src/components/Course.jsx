const Course = ({course}) => {
    console.log(course)
    const name = course.name
    const parts = course.parts
    const Add = (accumulator, a) =>  accumulator + a;
    const sum = parts.map(y => y.exercises).reduce(Add, 0);
  
    return (
      <div>
        <SubHeader course={name} />
        <Content parts={parts} />
        <Total sum={sum} />
      </div>
    )
  }
  
  
  const SubHeader = ({ course }) => <h2>{course}</h2>
  
  const Total = ({ sum }) => <p>Number of exercises {sum}</p>
  
  const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>
  
  const Content = ({ parts }) => {
    console.log(parts)
    return (
    <div>
      {parts.map(part => 
        <Part key={part.id}
          part={part} 
        />)}
    </div>
    )
  }

  export default Course
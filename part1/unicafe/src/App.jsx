import { useState } from 'react'

const Heading = (props) => {
  console.log(props)
  return (
    <h1>{props.title}</h1>  
  )
} 
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Buttons = ({good, neutral, bad}) => {
  return (
    <div>
      <Button onClick={good} text='good'/>
      <Button onClick={neutral} text='neutral'/>
      <Button onClick={bad} text='bad'/>
    </div>
  )    
}
const Statistics = ({data}) => {
  console.log(data.good, data.neutral, data.bad)
  return (
    <div>
      <h3>Statistics</h3>
      <p>Good: {data.good} </p>
      <p>Neutral: {data.neutral}</p>
      <p>Bad: {data.bad}</p>
    </div>
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0, neutral:0, bad:0
  })

  const handleGood = () => {
    console.log('good')
    setFeedback({...feedback, good: feedback.good + 1})
  }
  const handleNeutral = () => {
    console.log('neutral')
    setFeedback({...feedback, neutral: feedback.neutral + 1})
  }
  const handleBad = () => {
    console.log('bad')
    setFeedback({...feedback, bad: feedback.bad + 1})
  }

  return (
    <div>
     <Heading title='Give Us Feedback'/>
     <Buttons good={handleGood} neutral={handleNeutral} bad={handleBad}/>
     <Statistics data={feedback}/>
    </div>
  )
    
    
}

export default App

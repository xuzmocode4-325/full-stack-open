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

const StatsTable = ({data, log}) => {
  const length = log.length

  const reduction = log.reduce(
    (x, y) => x + y, 
    0,
  );
  const logGood = log.filter((element) => element === 1);
  const numGood = logGood.reduce(
    (x, y) => x + y, 
    0,
  ); 
  
  const average = reduction / length 
  const percent = numGood / length * 100 

  console.log('length', length)
  console.log('average', average)
  console.log('percent', percent)

  return (  
    <div>
      <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{data.good}</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>{data.neutral}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{data.bad}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>Percent Good  </td>
            <td>{percent}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}

const Statistics = ({data, log}) => {
  console.log(data.good, data.neutral, data.bad)
  if (data.good === 0 & data.neutral === 0 & data.bad === 0) {
    return (
      <div>
        <h3>Statistics</h3>
        <p>No feedback given</p>
      </div>
     
    )
  }
  
  return (
    <div>
      <h3>Statistics</h3>
        <StatsTable data={data} log={log}/>
    </div>
  )
}

const App = () => {

  const [log, setLog] = useState([])
  const [feedback, setFeedback] = useState({
    good: 0, neutral:0, bad:0
  })

  const handleGood = () => {
    setLog(log.concat(1))
    console.log('good')
    setFeedback({...feedback, good: feedback.good + 1})
  }
  const handleNeutral = () => {
    setLog(log.concat(0))
    console.log('neutral')
    setFeedback({...feedback, neutral: feedback.neutral + 1})
  }
  const handleBad = () => {
    setLog(log.concat(-1))
    console.log('bad')
    setFeedback({...feedback, bad: feedback.bad + 1})
  }

  return (
    <div>
     <Heading title='Give Us Feedback'/>
     <Buttons good={handleGood} neutral={handleNeutral} bad={handleBad}/>
     <Statistics data={feedback}  log={log}/>
    </div>
  )
    
    
}

export default App

import { useState } from "react";

const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear()- age;
  console.log(name, age)
  return (
    <div>
      <p>
        Hello {name} you are {age} years old.
        You were probably born in {bornYear()}
      </p>
    </div>
  )
}

const WrapHello = ({data, counter}) => {
  const peeps = data
  console.log(peeps)
  return (
  <div>
    <Hello name={peeps[0].name} age={peeps[0].age +counter}/>
    <Hello name={peeps[1].name} age={peeps[1].age +counter}/>
    <Hello name={peeps[2].name} age={peeps[2].age +counter}/>
    <Hello name={peeps[3].name} age={peeps[3].age +counter}/>
    <Hello name={peeps[4].name} age={peeps[4].age +counter}/>
    <Hello name={peeps[5].name} age={peeps[5].age +counter}/>
  </div>
  )
}

const Display = ({counter}) => <div>{counter}</div>
const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>


const CounterButtons = ({add,zero,minus}) => {
  return (
    <div>
      <Button onClick={add} text='plus'/>
      <Button onClick={zero} text='zero'/>
      <Button onClick={minus} text='minus'/>
   </div>
  )
}

const PositionButtons = ({left, center, right}) => {
  return (
    <div>
      <Button onClick={left} text='left'/>
      <Button onClick={center} text='center'/>
      <Button onClick={right} text='right'/>
    </div>
  )
}

const History = ({allClicks, total}) => {
  console.log(total)
  console.log(allClicks.length)
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      <p>button press history: {allClicks.join(' ')}</p>
      <p>total clicks: {total}</p>
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

  const [total, setTotal] = useState(0)
  const [allClicks, setAll] = useState([])
  const [counter, setCounter] = useState(0) 
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const addOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)
  const minusOne = () => setCounter(counter -1)



  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setClicks({...clicks, left: clicks.left+2, right: clicks.right -1})
    const updatedLength = allClicks.length +1
    setTotal(updatedLength)

  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setClicks({...clicks, right: clicks.right +2, left: clicks.left -1})
    const updatedLength = allClicks.length +1
    setTotal(updatedLength)
  }

  const handleCenterClick = () => {{
    setAll(allClicks.concat('O'))
    const newClicks = { 
      left: 0, 
      right: 0, 
    }
    setClicks(newClicks)
    const updatedLength = allClicks.length +1
    setTotal(updatedLength)
  }}

  return (
    <div>
      <h1>Greetings</h1>
      <Display counter={counter}/>
      <WrapHello data={peeps} counter={counter} />
      <CounterButtons add={addOne} zero={setToZero} minus={minusOne}/> 
      <p>
        {clicks.left} {clicks.right}
      </p> 
      <PositionButtons 
        left={handleLeftClick} 
        center={handleCenterClick}
        right={handleRightClick}/>
      <History allClicks={allClicks} total={total}/>
    </div>
  )
}

export default App
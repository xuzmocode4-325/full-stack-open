import { useState } from 'react'

const Heading = (props) => {
  console.log(props)
  return (
    <h1>{props.title}</h1>
  )
}

const Display = ({input, popular}) => {
  console.log(input, popular)
  const text = input.text
  const selected = input.selected
  const votes = input.votes 
  if (popular) {
    const mostVoted = votes.indexOf(Math.max(...votes));
    console.log('most popular', mostVoted)
    return (
      <div>
        <p>{text[mostVoted]}</p>
        <p>This anecdote has {votes[mostVoted]} vote(s).</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>{text[selected]}</p>
        <p>This anecdote has {votes[selected]} vote(s).</p>
      </div>
    )
  }
  
}

const Button = ({onClick, text}) => {
return (
  <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleNewAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length));
  const handleNewVote = (current) => () => {
    console.log('current value', votes[current])
    const newVotes = [...votes]
    console.log('new votes array', newVotes)
    newVotes[current] += 1
    console.log('updated vote value', newVotes[current])
    console.log('updated votes array', newVotes) 
    setVotes(newVotes)
  }

  const displayInput = {
    'text': anecdotes,
    'selected': selected,
    'votes': votes,
  }

  return (
    <div>
      <Heading title='Anecdote of The Day'/>
      <Display  input={displayInput} popular={false}/>
      <Button onClick={handleNewVote(selected)} text='Vote'/>
      <Button onClick={handleNewAnecdote} text='New Anecdote'/>
      <Heading title='Most Popular Anecdote'/>
      <Display  input={displayInput} popular={true}/>
    </div>
  )
}

export default App
import React, { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const DisplayAnecdote = ({ anecdote, voteCount }) => {
  return (
    <>
    <div>{anecdote}</div>
    <div>has {voteCount} votes</div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)

  const nextAnecdote = () => {
    let num
    // make sure we don't select the same anecdote twice in a row
    do {
      num = Math.floor(Math.random() * anecdotes.length);
    } while (num === selected)

    setSelected(num)
  }

  const [votes,setVotes] = useState(Array(anecdotes.length).fill(0))
  const copy = [...votes]

  const voteForAnecdote = () => {
    copy[selected] += 1
    setVotes(copy)
  }

  const voteCount = Math.max.apply(null, votes)
  const bestAnecdote = anecdotes[votes.indexOf(voteCount)]

  return (
    <div>
      <Header text='Anecdote of the day'/>
      <DisplayAnecdote anecdote={anecdotes[selected]} voteCount={copy[selected]}/>
      <Button text='vote' onClick={voteForAnecdote}/>
      <Button text='next anecdote' onClick={nextAnecdote}/>
      <Header text='Anecdote with the most votes'/>
      <DisplayAnecdote anecdote={bestAnecdote} voteCount={voteCount}/>
    </div>
  )
}

export default App

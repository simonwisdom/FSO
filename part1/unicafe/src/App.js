import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ text, counter }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{counter}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if(all === 0) {
    return(
      <div>No feedback given</div>
    )
  }

  return (
  <>
  <table>
    <tbody>
  <StatisticLine text='good' counter={good}/>
  <StatisticLine text='neutral' counter={neutral}/>
  <StatisticLine text='bad' counter={bad}/>
  <StatisticLine text='all' counter={all}/>
  <StatisticLine text='average' counter={average}/>
  <StatisticLine text='positive' counter={positive}/>
    </tbody>
  </table>
  </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const average = (good - bad) / all
  const positive = 100 * good / all + '%'

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <Header text='give feedback'/>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <Header text='statistics'/>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
      {/* <Display text='good' counter={good}/>
      <Display text='neutral' counter={neutral}/>
      <Display text='bad' counter={bad}/>
      <Display text='all' counter={all}/>
      <Display text='average' counter={average}/>
      <Display text='positive' counter={positive}/> */}
    </div>
  )
}

export default App

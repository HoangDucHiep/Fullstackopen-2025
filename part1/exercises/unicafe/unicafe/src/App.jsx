import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateFeedBack = (current, update) => {
    return () => update(current + 1);
  }

  return (
    <div>
      <h1> give feedback</h1>
      <Button onClick={updateFeedBack(good, setGood)}>good</Button>
      <Button onClick={updateFeedBack(neutral, setNeutral)}>neutral</Button>
      <Button onClick={updateFeedBack(bad, setBad)}>bad</Button>
      
      <h1>statistics</h1>
      <StaticItem options={'good'} feedback={good}></StaticItem>
      <StaticItem options={'neutral'} feedback={neutral}></StaticItem>
      <StaticItem options={'bad'} feedback={bad}></StaticItem>
    </div>
  )
}


const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

const StaticItem = ({ options, feedback }) => {
  return (
    <p>{options} { feedback }</p>
  )
}

export default App
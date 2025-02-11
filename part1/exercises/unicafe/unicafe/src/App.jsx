import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updatevalue = (current, update) => {
    return () => {
      const newValue = current + 1;
      update(newValue);
    }
  }

  return (
    <div>
      <h1> give value</h1>
      <Button onClick={updatevalue(good, setGood)}>good</Button>
      <Button onClick={updatevalue(neutral, setNeutral)}>neutral</Button>
      <Button onClick={updatevalue(bad, setBad)}>bad</Button>

      <Statistics statistics={[good, neutral, bad]}></Statistics>
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

const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}:</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({ statistics }) => {
  let good = statistics[0];
  let neutral = statistics[1];
  let bad = statistics[2];

  let all = good + bad + neutral;
  let average = (good - bad) / all;
  let positive = good / all * 100;

  return (all !== 0 ? (
    <>
      <h1>StatisticLine</h1>
      <table>
        <StatisticLine text={'good'} value={good}></StatisticLine>
        <StatisticLine text={'neutral'} value={neutral}></StatisticLine>
        <StatisticLine text={'bad'} value={bad}></StatisticLine>
        <StatisticLine text={'all'} value={all}></StatisticLine>
        <StatisticLine text={'average'} value={average}></StatisticLine>
        <StatisticLine text={'positive'} value={positive + '%'}></StatisticLine>
      </table>
    </>
  ) : (
    <p>No value given</p>
  ));
}

export default App
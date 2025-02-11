import { useState } from "react"


const App = () => {
  /* const [counter, setCounter] = useState(0);
  
  const increaseOne = () => setCounter(counter + 1);
  const decreaseOne = () => setCounter(counter - 1);
  const resetToZero = () => setCounter(0);

  return (
    <>
      <Button onClick={increaseOne}>Increase</Button>
      <Button onClick={decreaseOne}>Increase</Button>
      <Button onClick={resetToZero}>Reset</Button>
      <Display>{counter}</Display>
    </>
  ) */

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updated = left + 1;
    setLeft(updated)
    setTotal(updated + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updated = right + 1;
    setRight(updated)
    setTotal(updated + left)
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>
      <p>total {total}</p>
    </div>
  )
}


const Display = (props) => {
  return (
    <div>{props.children}</div>
  );
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.children}
    </button>
  );
}




export default App
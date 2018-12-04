// Stopwatch: useReducer (a la setState)
import React, {useReducer, useEffect, useRef} from 'react'

const buttonStyles = {
  border: '1px solid #ccc',
  background: '#fff',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 200,
}

// 🐨 simplify this reducer to accept two state objects
// and return a new one that performs a shallow merge.
// 💰 here's how to perform a shallow merge:
// const obj1 = {a: 'b', c: 'd'}
// const obj2 = {c: 'e', f: 'g'}
// console.log({...obj1, ...obj2}) // {a: 'b', c: 'e', f: 'g'}
// 💰 when done correctly, this function should be no longer than 3 lines.
// and could be done in one line if you make it an arrow function.
const reducer = (prevState, nextState) => ({...prevState, ...nextState})

function Stopwatch() {
  // 🐨 2. rename `dispatch` to `setState`
  const [{running, lapse}, setState] = useReducer(reducer, {
    running: false,
    lapse: 0,
  })
  const timerRef = useRef(null)

  useEffect(() => () => clearInterval(timerRef.current), [])

  function handleRunClick() {
    if (running) {
      clearInterval(timerRef.current)
    } else {
      const startTime = Date.now() - lapse
      timerRef.current = setInterval(() => {
        // 🐨 3. call `setState` instead
        setState({lapse: Date.now() - startTime})
      }, 0)
    }
    // 🐨 4. call `setState` instead
    setState({running: !running})
  }

  function handleClearClick() {
    clearInterval(timerRef.current)
    // 🐨 5. call `setState` instead
    setState({lapse: 0, running: false})
  }

  return (
    <div style={{textAlign: 'center'}}>
      <label
        style={{
          fontSize: '5em',
          display: 'block',
        }}
      >
        {lapse}
        ms
      </label>
      <button onClick={handleRunClick} style={buttonStyles}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={handleClearClick} style={buttonStyles}>
        Clear
      </button>
    </div>
  )
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return <Stopwatch />
}
Usage.title = 'Stopwatch: useReducer (a la setState)'

export default Usage

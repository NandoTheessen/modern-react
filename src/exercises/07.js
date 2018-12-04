// Stopwatch: useReducer (a la redux)
// 🐨 1. swap useState with useReducer
import React, {useReducer, useEffect, useRef} from 'react'

const buttonStyles = {
  border: '1px solid #ccc',
  background: '#fff',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 200,
}

// 🐨 2. create a function called reducer
function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_RUNNING':
      return {
        ...state,
        running: !state.running,
      }
    case 'CLEAR':
      return {
        ...state,
        running: false,
        lapse: 0,
      }
    case 'LAPSE':
      return {
        ...state,
        lapse: action.now - action.startTime,
        running: true,
      }
    default:
      break
  }
}

function Stopwatch() {
  const [state, dispatch] = useReducer(reducer, {lapse: 0, running: false})
  const timerRef = useRef(null)

  useEffect(() => () => clearInterval(timerRef.current), [])

  function handleRunClick() {
    if (state.running) {
      clearInterval(timerRef.current)
    } else {
      const startTime = Date.now() - state.lapse
      timerRef.current = setInterval(() => {
        // 🐨 4. swap this with a call to dispatch
        dispatch({type: 'LAPSE', now: Date.now(), startTime: startTime})
      }, 0)
    }
    dispatch({type: 'CHANGE_RUNNING'})
  }

  function handleClearClick() {
    clearInterval(timerRef.current)
    dispatch({type: 'CLEAR'})
  }

  return (
    <div style={{textAlign: 'center'}}>
      <label
        style={{
          fontSize: '5em',
          display: 'block',
        }}
      >
        {state.lapse}
        ms
      </label>
      <button onClick={handleRunClick} style={buttonStyles}>
        {state.running ? 'Stop' : 'Start'}
      </button>
      <button onClick={handleClearClick} style={buttonStyles}>
        Clear
      </button>
    </div>
  )
}

function Usage() {
  return <Stopwatch />
}
Usage.title = 'Stopwatch: useReducer (a la redux)'

export default Usage

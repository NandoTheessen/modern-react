// Counter: useState
// 🐨 you'll need to add {useState} to this import statement
import React, {useState} from 'react'

// 💰 the `useState` hook allows you to use state
// from within function components in react:
// const [name, setName] = useState('Angela')

function Counter() {
  const [count, setCount] = useState(0);
  const incrementCount = () => setCount(count +1);
  // 🐨 you'll call useState here to get count and setCount
  // 🐨 render the count here and add an onClick handler that increments the count
  return <button onClick={incrementCount}>{count}</button>
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return <Counter />
}
Usage.title = 'Counter: useState'

export default Usage

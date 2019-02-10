import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <p>{counter}</p>
      <br />
      <button
        type="button"
        onClick={() => setCounter(currentState => ({ counter: currentState.counter + 1 }))}
      >
        increase counter
      </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

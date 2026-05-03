import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header></header>

      <main>
          <h1>Self Learning App</h1>

          <button onClick={() => setCount(count + 1)}>CLICK</button>
          <p>Count: {count}</p>
      </main>

      <footer></footer>
    </>
  )
}

export default App

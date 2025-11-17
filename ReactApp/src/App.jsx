import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import ThemeButton from './components/ThemeButton'

import "./index.css";
import "./styles/theme.css";
import Counter from './components/Counter'
import { Parent } from './components/ParentComponent'

function App() {
  const [count, setCount] = useState(0)


  function maxSubArrayLen(nums, k) {
    let map = new Map(); // prefix sum -> index
    map.set(0, -1); // base case
    let sum = 0;
    let maxLen = 0;

    for (let i = 0; i < nums.length; i++) {
      sum += nums[i];

      if (map.has(sum - k)) {
        console.log('Inside true', maxLen, i, map.get(sum - k))
        maxLen = Math.max(maxLen, i - map.get(sum - k));
      }

      if (!map.has(sum)) {
        map.set(sum, i);
      }
    }

    return maxLen;
  }

  // Example usage:
  console.log(maxSubArrayLen([1, -1, 5, -2, 3], 3)); // Output: 4


  return (
    <>

      <ThemeProvider>
        <ThemeButton />


        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>


        <h1>Redux Counter Example</h1>
        <Counter />

        <Parent/>

      </ThemeProvider>
    </>
  )
}

export default App

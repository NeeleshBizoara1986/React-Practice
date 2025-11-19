Question 4: Explain the concept of React hooks. Can you provide an example of how you've used multiple hooks together in a complex component?

Ans: React provides several fundamental Hooks to manage state, side effects, and performance within function components. Here is a short explanation of the most common and essential ones:
useState: Manages local, component-level state. It lets you add state variables to function components and provides a function to update those variables, triggering a re-render when the state changes.

<b>useEffect:</b> Handles side effects in function components, such as data fetching, subscriptions, or manually changing the DOM. It runs after every render by default, but you can control when it runs using a dependency array.

<b>useContext:</b> Consumes values from a React Context without wrapping components in a Context.Consumer. It makes sharing data like themes or user information across the component tree simpler.

<b>useReducer:</b> A more powerful alternative to useState for managing complex state logic that involves multiple sub-values or when the next state depends on the previous one. It works well with useContext for global state management.

<b>What is useReducer?</b>
useReducer is a React hook that provides a more powerful alternative to useState for managing complex state logic. It works similarly to Redux but is built into React.

<b>Why use useReducer instead of useState?</b>

<ul>
<li>When <b>state has multiple sub-values</b> (e.g., an object with nested properties).</li>
<li>When <b>next state depends on previous state</b> (e.g., increment/decrement logic).</li>
<li>When you want <b>predictable state transitions</b> using a reducer function.</li>
<li>Works well with <b>useContext</b> for global state management (like a mini Redux).</li>
</ul>

<b>Syntax</b>
```const [state, dispatch] = useReducer(reducer, initialState);```

<ul>
<li>state → Current state.</li>
<li>dispatch(action) → Function to trigger state changes.</li>
<li>reducer(state, action) → Pure function that returns new state.</li>
</ul>

<b> Example: Complex State Management </b>
Imagine a form with multiple fields and actions:
```
import React, { useReducer } from 'react';

const initialState = { name: '', age: '', email: '' };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function UserForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <input
        placeholder="Name"
        value={state.name}
        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
      />
      <input
        placeholder="Age"
        value={state.age}
        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'age', value: e.target.value })}
      />
      <input
        placeholder="Email"
        value={state.email}
        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
      />
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
```

<b> Key Benefits</b>
<ul>
<li>Centralized state logic → Easier to maintain.</li>
<li>Predictable updates → Reducer function defines all transitions.</li>
<li>Scales well for complex state and global state when combined with useContext.</li>
</ul>

<b>Why useReducer Scales Well for Complex State</b>

<b>Centralized Logic:</b> All state transitions are handled in one reducer function, making it easier to manage multiple related state values.
<b>Predictable Updates:</b> Each action type defines a clear state change, reducing bugs.
<b>Better for Multiple Sub-values:</b> Instead of multiple useState calls, you manage one state object with structured updates.


<b>✅ Why Combine useReducer with useContext for Global State</b>
<ul>
<li>```useReducer``` alone manages <b>local state.</b></li>
<li>```useContext``` provides a way to <b>share that state globally</b> without prop drilling.</li>
<li>Together, they create a <b>lightweight state management solution</b> similar to Redux but without external libraries.</li>
</ul>


<b>✅ Architecture Flow</b>
<ol>
<li><b>Context Provider</b> wraps the app.</li>
<li>Inside the provider, ```useReducer``` manages state.</li>
<li>The ```dispatch``` and ```state``` are passed via ```Context```.</li>
<li>Any component can consume global state and dispatch actions.</li>
</ol>


<b>✅ Example: Global State with useReducer + useContext</b>
<a herf="react-global-state-guide.md">react-global-state-guide</a>

<b>✅ Why This Scales</b>
<ul>
<li><b>Complex State:</b> Multiple properties (user, theme, etc.) handled in one reducer.</li>
<li><b>Global Access:</b> Any component can read/update state without prop drilling.</li>
<li><b>Lightweight Alternative to Redux:</b>  No external library, less boilerplate.</li>
</ul>


<b>useMemo:</b> Optimizes performance by memoizing the result of a expensive function or calculation. It only re-computes the value when one of its dependencies changes, preventing unnecessary calculations on every re-render.

<b>useRef:</b> Provides a mutable reference that persists across re-renders. It is primarily used to access DOM elements directly (e.g., to focus an input), but can also be used to store any mutable value that does not cause a re-render when updated.
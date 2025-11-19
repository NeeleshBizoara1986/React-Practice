# Global State Management in React using useReducer + useContext

## ✅ Introduction
React provides powerful hooks like `useReducer` and `useContext` to manage complex and global state without external libraries like Redux.

---

## ✅ Why useReducer + useContext?
- `useReducer` handles **complex state logic** and predictable state transitions.
- `useContext` allows **sharing state globally** without prop drilling.
- Together, they create a **lightweight alternative to Redux**.

---

## ✅ File Structure
```
src/
│
├── context/
│   ├── AppContext.js       // Create Context, Reducer, Provider
│
├── hooks/
│   ├── useAppContext.js    // Custom hook for consuming context
│
├── components/
│   ├── Profile.js          // Example component using global state
│   ├── ThemeSwitcher.js    // Another component using global state
│
├── App.js                  // Wrap app with Provider
└── index.js                // Entry point
```

---

## ✅ Step-by-Step Implementation

### **1. Create Context and Provider (`context/AppContext.js`)**
```jsx
import React, { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = { user: null, theme: 'light' };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
```

### **2. Custom Hook (`hooks/useAppContext.js`)**
```jsx
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useAppContext = () => useContext(AppContext);
```

### **3. Component Usage (`components/Profile.js`)**
```jsx
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';

function Profile() {
  const { state, dispatch } = useAppContext();

  return (
    <div>
      <p>User: {state.user || 'Guest'}</p>
      <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>Switch Theme</button>
      <button onClick={() => dispatch({ type: 'SET_USER', payload: 'Neelesh' })}>Set User</button>
    </div>
  );
}

export default Profile;
```

### **4. App.js Setup**
```jsx
import React from 'react';
import { AppProvider } from './context/AppContext';
import Profile from './components/Profile';

function App() {
  return (
    <AppProvider>
      <Profile />
    </AppProvider>
  );
}

export default App;
```

---

## ✅ Data Flow
**Component → dispatch(action) → reducer → new state → Context Provider → Components re-render**

---

## ✅ Comparison Table
| Feature        | useState        | useReducer       | Redux                |
|---------------|-----------------|-----------------|----------------------|
| **Complexity** | Low            | Medium          | High                |
| **State Scope**| Local          | Local / Global* | Global              |
| **Boilerplate**| Minimal        | Moderate        | High                |
| **Best For**   | Simple state   | Complex logic   | Large-scale apps    |
| **Dependencies**| Built-in React| Built-in React  | External library    |

\*Global with `useContext`.

---

## ✅ Pros and Cons
### **Pros:**
- Lightweight alternative to Redux.
- Predictable state transitions.
- No external dependencies.

### **Cons:**
- Not as feature-rich as Redux (e.g., DevTools, middleware).
- Can become complex for very large apps.

---

## ✅ Interview Tips
- Emphasize why hooks exist: Simplify logic, avoid class components.
- Mention rules of hooks:
  - Call hooks only at the top level.
  - Call hooks only inside React functions.
- Explain when to choose `useReducer` over `useState` or Redux:
  - Complex state logic → `useReducer`.
  - Global state → `useReducer` + `useContext`.
  - Large-scale app → Redux.

---

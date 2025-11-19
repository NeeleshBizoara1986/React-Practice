# React Memoization Techniques – Complete Guide

## ✅ Introduction to Memoization in React
Memoization is an optimization technique that stores the result of expensive computations or stabilizes references to avoid unnecessary re-renders.

**Why is it needed?**
- React re-renders components when state or props change.
- Functions and computed values are recreated on every render.
- Memoization helps prevent unnecessary recalculations and re-renders.

---

## ✅ React.memo
**What it does:**
- A Higher-Order Component (HOC) that memoizes a **component**.
- Prevents re-render if props haven’t changed.

**When to use:**
- For pure functional components that render the same output for the same props.

**Pitfalls:**
- Shallow comparison only → If props are objects, internal changes won’t trigger re-render unless reference changes.
- Overuse adds complexity without real benefit.

**Example:**
```jsx
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.value}</div>;
});
```

---

## ✅ useMemo
**What it does:**
- Memoizes **computed values** to avoid recalculating on every render.

**When to use:**
- For expensive calculations or derived data.

**Pitfalls:**
- Premature optimization → Don’t use for trivial computations.
- Wrong dependency array → Stale or incorrect values.
- Memory overhead.

**Example:**
```jsx
const expensiveValue = useMemo(() => computeExpensiveValue(data), [data]);
```

### ✅ Meaning of Derived Data
Derived data = data computed from existing state or props (not stored separately).

**Example:**
```jsx
import React, { useState, useMemo } from 'react';

function FilteredList() {
  const [query, setQuery] = useState('');
  const [items] = useState(['Apple', 'Banana', 'Orange', 'Mango']);

  // Derived data: filtered list based on query
  const filteredItems = useMemo(() => {
    console.log('Filtering...');
    return items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
  }, [items, query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filteredItems.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
```

---

## ✅ useCallback
**What it does:**
- Memoizes **function references** so they don’t change on every render.

**When to use:**
- When passing callbacks to memoized child components.
- Prevents unnecessary re-renders due to new function references.

**Pitfalls:**
- Overuse adds complexity.
- Incorrect dependencies → Stale closures.
- Doesn’t prevent function execution, only stabilizes reference.

**Example: Passing callbacks to memoized child**
```jsx
import React, { useState, useCallback } from 'react';

const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click Me</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </div>
  );
}
```
**Result:** Child does NOT re-render when count changes because handleClick reference is stable.

---

## ✅ Comparison Table
| Technique      | Memoizes       | Best For                     | Pitfall |
|---------------|---------------|-----------------------------|---------|
| React.memo    | Component     | Prevent re-render if props unchanged | Shallow comparison |
| useMemo       | Value         | Expensive computations      | Wrong dependencies |
| useCallback   | Function      | Stable function references  | Stale closures |

---

## ✅ Other Memoization Techniques
- **memoize-one / lodash.memoize** → For pure functions outside React.
- **Virtualization (react-window)** → For large lists instead of memoizing everything.

---

## ✅ Interview Tips
- **When to use:**
  - `React.memo` → Component re-renders unnecessarily due to parent updates.
  - `useMemo` → Expensive calculations or derived data.
  - `useCallback` → Passing callbacks to memoized child components.
- **Don’t overuse:** Memoization adds complexity and memory overhead.
- **Always mention dependency arrays:** Common source of bugs.

---

import { useState } from "react";
import "./App.css";
import { flushSync } from "react-dom";
import Counter from "./Counter";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    flushSync(() => {
      setCount((count) => count + 1);
    });
  };
  return (
    <>
      <p>Counters: {count}</p>
      <button onClick={increment}>Increment</button>

      <Counter />
    </>
  );
}

export default App;

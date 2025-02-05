import { useState } from "react";
import "./App.css";
import { flushSync } from "react-dom";

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
    </>
  );
}

export default App;

import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Counter value is now " + count);
    return () => {
      console.log("Clean up function");
    };
  }, [count]);

  return (
    <>
      <p>Counters: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}

export default Counter;

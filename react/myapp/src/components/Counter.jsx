import { useState, useEffect } from "react";
import useTitle from "../hooks/useTitle";

function Counter() {
  const [count, setCount] = useState(0);
  useTitle(`You clicked ${count} times`);

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

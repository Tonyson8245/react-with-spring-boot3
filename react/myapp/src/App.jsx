import { useRef } from "react";
import "./App.css";

function App() {
  const inputRef = useRef(null);

  return (
    <>
      <input ref={inputRef} type />
      <button onClick={() => inputRef.current.focus()}>Focus input</button>
    </>
  );
}
export default App;

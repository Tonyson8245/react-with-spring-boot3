import "./App.css";
import AuthContext from "./context/AuthContext";
import MyComponent from "./components/MyComponent";

function App() {
  const userName = "john";
  return (
    <>
      <AuthContext.Provider value={userName}>
        <MyComponent />
      </AuthContext.Provider>
    </>
  );
}
export default App;

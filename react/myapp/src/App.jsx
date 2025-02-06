import "./App.css";
import AuthContext from "./context/AuthContext";
import MyList from "./components/MyList";

function App() {
  const userName = "john";
  return (
    <>
      <AuthContext.Provider value={userName}>
        <MyList />
      </AuthContext.Provider>
    </>
  );
}
export default App;

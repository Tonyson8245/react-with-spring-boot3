import "./App.css";
import AuthContext from "./context/AuthContext";
import MyTable from "./components/MyTable";

function App() {
  const userName = "john";
  return (
    <>
      <AuthContext.Provider value={userName}>
        <MyTable />
      </AuthContext.Provider>
    </>
  );
}
export default App;

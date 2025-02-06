import React from "react";
import AuthContext from "../context/AuthContext";
function MyComponent() {
  const authContext = React.useContext(AuthContext);

  return <>Welcome {authContext}</>;
}
export default MyComponent;

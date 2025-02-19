import { useState } from "react";
import axios from "axios";
import { Button, TextField, Stack } from "@mui/material";
import Carlist from "./Carlist";

type User = {
  username: string;
  password: string;
};

function Login() {
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const [isAuthenticated, setAuth] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    axios
      .post(import.meta.env.VITE_API_URL + "/login", user, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const jwtToken = res.headers.authorization;
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          setAuth(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isAuthenticated) {
    return <Carlist />;
  } else
    return (
      <>
        <Stack spacing={2} alignItems={"center"} mt={2}>
          <TextField
            label="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button variant="outlined" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Stack>
      </>
    );
}

export default Login;

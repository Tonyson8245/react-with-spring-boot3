import { useState } from "react";
import axios from "axios";
import { Button, TextField, Stack, Snackbar } from "@mui/material";
import Carlist from "./Carlist";

type User = {
  username: string;
  password: string;
};

function Login() {
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false);

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
      .catch(() => {
        setOpen(true);
      });
  };

  const handleLogout = () => {
    setAuth(false);
    sessionStorage.removeItem("jwt");
  };

  if (isAuthenticated) {
    return <Carlist logOut={handleLogout} />;
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
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message="Login failed : Check your username and password"
          />
        </Stack>
      </>
    );
}

export default Login;

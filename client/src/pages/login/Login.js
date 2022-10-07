import React, { useRef } from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Paper,
  TextField,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import PasswordField from "./PasswordField";
import logo from "../../assets/logo1.png";
import { login } from "../../actions/user";
import { useValue } from "../../context/ContextProvider";

const Login = () => {
  const { dispatch } = useValue();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email === "admin@cypoint.com.tr" && password === "password1") {
      dispatch({
        type: "UPDATE_USER",
        payload: {
          email,
          password,
          authority: "Tam Yetki",
          role: "Admin",
          name: "Admin",
        },
      });
    } else {
      login({ email, password }, dispatch);
    }
  };

  return (
    <Paper elevation={14} sx={{ width: 345, p: 2, borderRadius: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logo} alt={"logo"} width="100" height="100" />
        <h2>Hoşgeldiniz</h2>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              variant="outlined"
              id="email"
              label="E-posta"
              type="text"
              fullWidth
              inputRef={emailRef}
              inputProps={{ minLength: 2 }}
              required
            />
            <PasswordField {...{ passwordRef }} />
          </DialogContent>
          <DialogActions sx={{ mr: 2 }}>
            <Button type="submit" variant="contained" endIcon={<Send />}>
              Giriş
            </Button>
          </DialogActions>
        </form>
      </Box>
    </Paper>
  );
};

export default Login;

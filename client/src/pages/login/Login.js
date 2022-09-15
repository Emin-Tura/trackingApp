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
import logo from "../../assets/logo.png";
import { login } from "../../actions/user";
import { useValue } from "../../context/ContextProvider";

const Login = () => {
  const { dispatch } = useValue();

  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    login({ name, password }, dispatch);
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
              id="name"
              label="Kullanıcı Adı"
              type="text"
              fullWidth
              inputRef={nameRef}
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

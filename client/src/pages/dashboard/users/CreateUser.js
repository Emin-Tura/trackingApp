import { Close, Send, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
} from "@mui/material";
import React, { forwardRef, useRef } from "react";
import { createUser } from "../../../actions/user";
import { useValue } from "../../../context/ContextProvider";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

const CreateUser = () => {
  const {
    state: { profile, openLogin, currentUser },
    dispatch,
  } = useValue();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    createUser(
      currentUser,
      { name, email, password, file: profile.file },
      dispatch
    );
    window.location.reload();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { ...profile, file, photoURL },
      });
    }
  };

  return (
    <Dialog
      open={openLogin}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        Çalışan Oluştur
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            variant="standard"
            id="name"
            label="İsim"
            type="text"
            fullWidth
            inputRef={nameRef}
            inputProps={{ minLength: 2 }}
            required
          />

          <TextField
            margin="dense"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />

          <TextField
            margin="dense"
            variant="standard"
            id={"password"}
            label={"Parola"}
            type={showPassword ? "text" : "password"}
            fullWidth
            inputRef={passwordRef}
            inputProps={{ minLength: 5 }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClick}
                    onMouseDown={handleMouseDown}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogContent>
          <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <Avatar
              src={profile.photoURL}
              sx={{ width: 75, height: 75, cursor: "pointer" }}
            />
          </label>
        </DialogContent>
        <DialogActions sx={{ px: "19px", pb: 3 }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Kaydet
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateUser;

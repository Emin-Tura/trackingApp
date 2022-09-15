import { Close, Send } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useRef } from "react";
import { createUser } from "../../../actions/user";
import { useValue } from "../../../context/ContextProvider";

const CreateUser = () => {
  const {
    state: { profile, openLogin, currentUser },
    dispatch,
  } = useValue();
  const nameRef = useRef();
  const emailRef = useRef();

  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    createUser(currentUser, { name, email, file: profile.file }, dispatch);
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
    <Dialog open={openLogin} onClose={handleClose}>
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

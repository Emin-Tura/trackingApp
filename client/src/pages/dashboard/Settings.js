import { Close, Send } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  TextField,
} from "@mui/material";
import React, { forwardRef, useRef } from "react";
import { updatePassword } from "../../actions/user";
import { useValue } from "../../context/ContextProvider";
import PasswordField from "../login/PasswordField";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Settings = () => {
  const {
    state: { openSettings, currentUser },
    dispatch,
  } = useValue();

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const handleClose = () => {
    dispatch({ type: "CLOSE_SETTINGS" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword)
      return dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "Parolalar eşleşmiyor!",
        },
      });

    const { id } = currentUser;

    updatePassword({ password }, id, dispatch);
  };

  return (
    <Dialog
      open={openSettings}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        Parola Değiştir
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
            margin="dense"
            variant="standard"
            id="name"
            label="İsim"
            type="text"
            fullWidth
            defaultValue={currentUser.name}
            disabled={true}
          />
          <TextField
            margin="dense"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            defaultValue={currentUser.email}
            disabled={true}
          />

          <PasswordField
            autoFocus
            {...{ passwordRef }}
            variant={"standard"}
            label="Yeni Parola"
          />

          <PasswordField
            passwordRef={confirmPasswordRef}
            id="confirmPassword"
            label="Yeni Parola Tekrar"
            variant={"standard"}
          />
        </DialogContent>
        <DialogActions sx={{ px: "19px", pb: 3 }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Güncelle
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Settings;

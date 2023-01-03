import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import React, { forwardRef } from "react";
import { useValue } from "../../../context/ContextProvider";
import { Stack } from "@mui/system";
import ChipSelectTeam from "./ChipSelectTeam";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

const SendCalendarMail = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };

  return (
    <Dialog
      open={openLogin}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ "& .MuiDialog-paper": { width: "75%", maxWidth: "500px" } }}
    >
      <Stack
        sx={{
          alignItems: "center",
          "& .MuiTextField-root": { width: "100%", maxWidth: 500, m: 1 },
        }}
      >
        <DialogTitle>
          Mail Gönder
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
      </Stack>

      <DialogContent
        sx={{
          alignSelf: "center",
        }}
      >
        <ChipSelectTeam />
      </DialogContent>
      <DialogActions sx={{ px: "19px", pb: 3 }}>
        <Button type="submit" variant="contained" endIcon={<Send />}>
          Güncelle
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendCalendarMail;

import { Close, DownloadDone } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useValue } from "../../../context/ContextProvider";
import InfoField from "../../../components/InfoField";
import { createDocument } from "../../../actions/document";

const AddDocument = () => {
  const {
    state: {
      openLogin,
      details: { title },
      file,
    },
    dispatch,
  } = useValue();

  const [error, setError] = useState(false);
  const document = new FormData();
  document.append("title", title);
  document.append("file", file);

  const handleSubmit = () => {
    createDocument(document, dispatch);
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({ type: "RESET_DETAIL" });
  };

  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({ type: "RESET_DETAIL" });
  };

  const handleChange = (e) => {
    if (
      e.target.files[0].name.includes("(") ||
      e.target.files[0].name.includes(")") ||
      e.target.files[0].name.includes("[") ||
      e.target.files[0].name.includes("]")
    ) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "Dosya Adı Geçersiz! Lütfen Özel Karakter Kullamayınız!",
        },
      });
      setError(true);
    } else {
      setError(false);
      dispatch({ type: "UPDATE_FILES", payload: e.target.files[0] });
    }
  };

  return (
    <Dialog open={openLogin} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          height: 400,
        }}
      >
        <Stack
          sx={{
            alignItems: "center",
            "& .MuiTextField-root": { width: "100%", maxWidth: 500, m: 1 },
          }}
        >
          <DialogTitle>
            Doküman Oluştur
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
          <DialogContent dividers sx={{ maxWidth: 500 }}>
            <Box>
              <InfoField
                mainProps={{
                  name: "title",
                  label: "Doküman Adı",
                  value: title,
                }}
                minLength={2}
                required
              />
            </Box>
            <TextField
              type={"file"}
              variant="outlined"
              onChange={handleChange}
            />
          </DialogContent>

          <Button
            variant="contained"
            endIcon={<DownloadDone />}
            sx={{ my: 2 }}
            onClick={handleSubmit}
            disabled={!title || file.length === 0 || error}
          >
            Oluştur
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default AddDocument;

import { Close, DownloadDone } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useValue } from "../../../context/ContextProvider";
import InfoField from "../../../components/InfoField";
import { createDocument } from "../../../actions/document";

const AddProduct = () => {
  const {
    state: {
      openLogin,
      details: { title, description },
      file,
    },
    dispatch,
  } = useValue();

  const handleSubmit = () => {
    const document = {
      title,
      description,
      file,
    };
    createDocument(document, dispatch);
    dispatch({ type: "CLOSE_LOGIN" });
  };

  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({ type: "RESET_DETAIL" });
  };

  return (
    <Dialog open={openLogin} onClose={handleClose}>
      <Box
        sx={{
          width: 600,
          height: 600,
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
              onClick={() => dispatch({ type: "CLOSE_LOGIN" })}
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

              <InfoField
                mainProps={{
                  name: "description",
                  label: "Doküman Özellikleri",
                  value: description,
                }}
                minLength={2}
                optionalProps={{ multiline: true, rows: 4 }}
              />
            </Box>
          </DialogContent>

          <Button
            variant="contained"
            endIcon={<DownloadDone />}
            sx={{ my: 2 }}
            onClick={handleSubmit}
          >
            Oluştur
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default AddProduct;

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
import { createProduct } from "../../../actions/product";
import { useValue } from "../../../context/ContextProvider";
import AddImages from "./addImages/AddImages";
import InfoField from "../../../components/InfoField";

const AddProduct = () => {
  const {
    state: {
      openLogin,
      details: { title, description },
      images,
    },
    dispatch,
  } = useValue();

  const handleSubmit = () => {
    const product = {
      title,
      description,
      images,
    };
    createProduct(product, dispatch);
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
            Ürün Oluştur
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
                mainProps={{ name: "title", label: "Ürün Adı", value: title }}
                minLength={5}
              />

              <InfoField
                mainProps={{
                  name: "description",
                  label: "Ürün Özellikleri",
                  value: description,
                }}
                minLength={10}
                optionalProps={{ multiline: true, rows: 4 }}
              />
              <AddImages />
            </Box>
          </DialogContent>

          <Button
            variant="contained"
            endIcon={<DownloadDone />}
            sx={{ my: 2 }}
            disabled={
              !(title.length > 4 && description.length > 9 && images.length > 0)
            }
            onClick={handleSubmit}
          >
            Kaydet
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default AddProduct;

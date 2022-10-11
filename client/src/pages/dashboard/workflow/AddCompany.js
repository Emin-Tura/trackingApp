import { Close, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React, { useRef, useState } from "react";
import { useValue } from "../../../context/ContextProvider";
import { MuiTelInput } from "mui-tel-input";
import { createCompany } from "../../../actions/company";
import { DesktopDatePicker } from "@mui/x-date-pickers";
const AddCompany = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();

  const [phone, setPhone] = useState("");
  const [day, setDay] = React.useState(Date.now());
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const relatedNameRef = useRef();
  const descriptionRef = useRef();
  const productRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;
    const relatedName = relatedNameRef.current.value;
    const description = descriptionRef.current.value;
    const product = productRef.current.value;

    createCompany(
      { name, email, phone, address, relatedName, description, product, day },
      dispatch
    );
    dispatch({ type: "CLOSE_LOGIN" });
  };

  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({ type: "RESET_DETAIL" });
    setDay(Date.now());
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
            Süreç Ekle
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
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiTextField-root": { width: "100%" },
              }}
            >
              <TextField
                autoFocus
                margin="dense"
                variant="outlined"
                id="name"
                label="Firma İsmi"
                type="text"
                fullWidth
                inputRef={nameRef}
                inputProps={{ minLength: 2 }}
                required
                sx={{ mr: 2 }}
              />
              <TextField
                margin="dense"
                variant="outlined"
                id="relatedName"
                label="Görüşülen Kişi veya Birim"
                type="text"
                fullWidth
                inputRef={relatedNameRef}
                inputProps={{ minLength: 2 }}
              />
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                "& .MuiTextField-root": { width: "100%" },
              }}
            >
              <TextField
                margin="dense"
                variant="outlined"
                id="email"
                label="Email"
                type="email"
                inputRef={emailRef}
                sx={{ mr: 2 }}
                required
              />
              <MuiTelInput
                margin="dense"
                variant="outlined"
                value={phone}
                onChange={(newPhone) => setPhone(newPhone)}
                preferredCountries={["TR", "US"]}
                id="phone"
                label="Telefon"
                type="phone"
                inputRef={phoneRef}
                forceCallingCode
              />
            </Stack>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                "& .MuiTextField-root": { width: "100%" },
              }}
            >
              <TextField
                margin="dense"
                variant="outlined"
                id="product"
                label="Ürün İsmi"
                type="product"
                inputRef={productRef}
                sx={{ mr: 2 }}
                required
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Görüşme Tarihi"
                  inputFormat="DD/MM/YYYY"
                  value={day}
                  onChange={(e) => setDay(e)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
            <TextField
              margin="dense"
              variant="outlined"
              id="address"
              label="Adres Bilgileri"
              type="address"
              fullWidth
              multiline
              rows={3}
              inputProps={{ minLength: 5 }}
              inputRef={addressRef}
            />
            <TextField
              margin="dense"
              variant="outlined"
              id="description"
              label="Ek Bilgi"
              type="text"
              inputRef={descriptionRef}
              multiline
              fullWidth
              rows={2}
              minLength={5}
            />
          </DialogContent>
          <DialogActions sx={{ px: "19px", pb: 3 }}>
            <Button type="submit" variant="contained" endIcon={<Send />}>
              Kaydet
            </Button>
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  );
};

export default AddCompany;

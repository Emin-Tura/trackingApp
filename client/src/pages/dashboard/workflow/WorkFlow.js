import { Close } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  Dialog,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { forwardRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/lazy";
import "swiper/css/zoom";

import { useValue } from "../../../context/ContextProvider";
import moment from "moment";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WorkFlow = () => {
  const {
    state: { company },
    dispatch,
  } = useValue();

  const handleClose = () => {
    dispatch({ type: "UPDATE_COMPANY", payload: null });
  };
  return (
    <Dialog
      open={Boolean(company)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Box
        sx={{
          width: 500,
        }}
      >
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h5" component="h3" sx={{ flex: 1, ml: 2 }}>
              {company?.name?.toUpperCase()}
            </Typography>
            <IconButton color="inherit" onClick={handleClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container>
          <Stack sx={{ p: 3 }} spacing={2}>
            <Box>
              <Typography variant="h6" component="span">
                {"Görüşülen Ürün: "}
              </Typography>
              <Typography component="span" sx={{ color: "#5bc0be" }}>
                {company?.product}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="span">
                {"Görüşülen Kişi: "}
              </Typography>
              <Typography component="span" sx={{ color: "#5bc0be" }}>
                {company?.relatedName}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" component="span">
                {"Görüşme Tarihi: "}
              </Typography>
              <Typography component="span" sx={{ color: "#5bc0be" }}>
                {moment(company?.day).format("DD/MM/YYYY")}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="span">
                {"Email: "}
              </Typography>
              <Typography component="span" sx={{ color: "#5bc0be" }}>
                {company?.email}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" component="span">
                {"Telefon Numarası: "}
              </Typography>
              <Typography component="span" sx={{ color: "#5bc0be" }}>
                {company?.phone}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" component="span">
                {"Adres: "}
              </Typography>
              <Typography component="span" sx={{ color: "#5bc0be" }}>
                {company?.address}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="span">
                {"Ek Bilgi: "}
              </Typography>
              <Typography component="span" sx={{ color: "#5bc0be" }}>
                {company?.description}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="span">
                {"Süreç: "}
              </Typography>
              <Typography component="span" sx={{ color: "#5bc0be" }}>
                {company?.completed ? "Tamamlandı" : "Devam Ediyor"}
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Dialog>
  );
};

export default WorkFlow;

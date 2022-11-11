import { Add } from "@mui/icons-material";
import { Alert, Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { getDocument } from "../../../actions/document";
import { useValue } from "../../../context/ContextProvider";
import AddDocument from "./AddDocument";
import DocumentList from "./DocumentList";

const Documents = ({ setSelectedLink, link }) => {
  const {
    dispatch,
    state: { currentUser, docs },
  } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    if (docs.length === 0) getDocument(dispatch);
  }, [dispatch, docs.length, link, setSelectedLink]);
  return (
    <Box>
      <Typography sx={{ textAlign: "center", mb: 3, width: "50%" }}>
        <Alert severity="info">
          Bazı dokümanların yüklenmesinde hata var ilerleyen süreçlerde
          çözülecek...
        </Alert>
      </Typography>
      {currentUser.authority !== "Yetki Yok" && (
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={() => dispatch({ type: "OPEN_LOGIN" })}
        >
          Doküman Ekle
        </Button>
      )}
      <DocumentList />
      <AddDocument />
    </Box>
  );
};

export default Documents;

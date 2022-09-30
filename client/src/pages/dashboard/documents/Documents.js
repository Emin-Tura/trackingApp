import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { getDocument } from "../../../actions/document";
import { useValue } from "../../../context/ContextProvider";
import AddDocument from "./AddDocument";
import DocumentList from "./DocumentList";

const Documents = ({ setSelectedLink, link }) => {
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
  useEffect(() => {
    setSelectedLink(link);
    getDocument(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
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

import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { getCompanies } from "../../../actions/company";
import { getProducts } from "../../../actions/product";
import { useValue } from "../../../context/ContextProvider";
import AddCompany from "./AddCompany";
import WorkFlow from "./WorkFlow";
import WorkFlowList from "./WorkFlowList";

const WorkFlows = ({ setSelectedLink, link }) => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    getProducts(dispatch);
    getCompanies(dispatch);
  }, [dispatch, link, setSelectedLink]);

  return (
    <Box>
      {currentUser.authority !== "Yetki Yok" && (
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={() => dispatch({ type: "OPEN_LOGIN" })}
        >
          Süreç Oluştur
        </Button>
      )}
      <AddCompany />
      <WorkFlowList />
      <WorkFlow />
    </Box>
  );
};

export default WorkFlows;

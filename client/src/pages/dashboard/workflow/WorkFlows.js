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
    state: { currentUser, products, companies },
    dispatch,
  } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    if (products.length === 0) getProducts(dispatch);
    if (companies.length === 0) getCompanies(dispatch);
  }, [companies.length, dispatch, link, products.length, setSelectedLink]);

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

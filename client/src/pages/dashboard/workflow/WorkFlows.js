import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { getCompanies } from "../../../actions/company";
import { useValue } from "../../../context/ContextProvider";
import AddWorkFlow from "./AddWorkFlow";
import WorkFlow from "./WorkFlow";
import WorkFlowList from "./WorkFlowList";

const WorkFlows = ({ setSelectedLink, link }) => {
  const {
    state: { currentUser, render },
    dispatch,
  } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    getCompanies(dispatch);
  }, [render, dispatch, link, setSelectedLink]);

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
      <AddWorkFlow />
      <WorkFlowList />
      <WorkFlow />
    </Box>
  );
};

export default WorkFlows;

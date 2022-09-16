import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useValue } from "../../../context/ContextProvider";
import AddProduct from "./AddProduct";

const Products = ({ setSelectedLink, link }) => {
  const { dispatch } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
      <Button
        variant="contained"
        endIcon={<Add />}
        onClick={() => dispatch({ type: "OPEN_LOGIN" })}
      >
        Ürün Oluştur
      </Button>
      <AddProduct />
    </Box>
  );
};

export default Products;

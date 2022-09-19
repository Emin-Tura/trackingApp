import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useValue } from "../../../context/ContextProvider";
import AddProduct from "./AddProduct";
import ProductsList from "./ProductsList";
import { getProducts } from "../../../actions/product";

const Products = ({ setSelectedLink, link }) => {
  const { dispatch } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    getProducts(dispatch);
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
      <ProductsList />
      <AddProduct />
    </Box>
  );
};

export default Products;

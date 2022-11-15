import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useValue } from "../../../context/ContextProvider";
import AddProduct from "./AddProduct";
import ProductsList from "./ProductsList";
import { getProducts } from "../../../actions/product";
import Product from "./Product";

const Products = ({ setSelectedLink, link }) => {
  const {
    dispatch,
    state: { currentUser, render },
  } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    getProducts(dispatch);
  }, [dispatch, link, render, setSelectedLink]);

  return (
    <Box>
      {currentUser.authority !== "Yetki Yok" && (
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={() => dispatch({ type: "OPEN_LOGIN" })}
        >
          Ürün Oluştur
        </Button>
      )}
      <ProductsList />
      <AddProduct />
      <Product />
    </Box>
  );
};

export default Products;

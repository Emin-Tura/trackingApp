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
    state: { currentUser, products },
  } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    if (products.length === 0) getProducts(dispatch);
  }, [dispatch, link, products.length, setSelectedLink]);

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

import { Clear } from "@mui/icons-material";
import {
  Box,
  Card,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React from "react";
import { deleteProduct } from "../../../actions/product";
import { useValue } from "../../../context/ContextProvider";

const ProductsList = () => {
  const {
    state: { currentUser, products },
    dispatch,
  } = useValue();

  const handleDelete = (params) => {
    let text = "Ürünü Silmek İstediğinize Emin Misiniz?";
    if (window.confirm(text)) {
      deleteProduct(currentUser, params, dispatch);
    }
  };

  return (
    <Box>
      <ImageList
        gap={12}
        sx={{
          my: 4,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(300px, 1fr)) !important",
        }}
      >
        {products.map((product, index) => (
          <Card key={index}>
            <ImageListItem sx={{ height: "300px !important" }}>
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
                title={product.title}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    onClick={() => handleDelete(product)}
                  >
                    <Clear />
                  </IconButton>
                }
              />
              <img
                src={product.images[0]}
                alt={product.title}
                loading="lazy"
                style={{ cursor: "pointer" }}
              />
              <ImageListItemBar title={product.description} />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Box>
  );
};

export default ProductsList;

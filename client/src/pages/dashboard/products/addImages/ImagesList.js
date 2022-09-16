import React from "react";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { useValue } from "../../../../context/ContextProvider";
import { Cancel } from "@mui/icons-material";
import deleteFile from "../../../../firebase/deleteFile";

const ImagesList = () => {
  const {
    state: { images, currentUser },
    dispatch,
  } = useValue();

  const handleDelete = async (image) => {
    dispatch({ type: "DELETE_IMAGE", payload: image });
    const imageName = image?.split(`${currentUser?.id}%2F`)[1]?.split("?")[0];
    try {
      await deleteFile(`products/${currentUser?.id}/${imageName}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageList
      cols={3}
      rowHeight={100}
      sx={{
        "&.MuiImageList-root": {
          gridTemplateColumns:
            "repeat(auto-fill, minmax(100px, 1fr)) !important",
        },
      }}
    >
      {images.map((image, index) => (
        <ImageListItem key={index} cols={1} rows={1}>
          <img src={image} alt="tooms" loading="lazy" />
          <ImageListItemBar
            position="top"
            sx={{
              background:
                "lienar-gradient(to bottom,rgba(0,0,0,0.7)0%,rgba(0,0,0,0.3)70%,rgba(0,0,0,0)100%)",
            }}
            actionIcon={
              <IconButton
                sx={{ color: "white" }}
                onClick={() => handleDelete(image)}
              >
                <Cancel />
              </IconButton>
            }
          ></ImageListItemBar>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagesList;

import { ImageList } from "@mui/material";
import React from "react";
import ProgressItem from "./ProgressItem";

const ProgressList = ({ files }) => {
  return (
    <ImageList
      rowHeight={100}
      sx={{
        "&.MuiImageList-root": {
          gridTemplateColumns:
            "repeat(auto-fill, minmax(100px, 1fr)) !important",
        },
      }}
    >
      {files.map((file, index) => (
        <ProgressItem file={file} key={index} />
      ))}
    </ImageList>
  );
};

export default ProgressList;

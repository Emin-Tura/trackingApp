import React, { useCallback } from "react";
import { Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import ProgressList from "./progressList/ProgressList";
import ImagesList from "./ImagesList";

const AddImages = () => {
  const [files, setFiles] = React.useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <>
      <Paper
        sx={{
          cursor: "pointer",
          border: "1px dashed #ccc",
          "&:hover": { border: "1px solid #ccc" },
          width: 450,
          ml: 1,
        }}
      >
        <div style={{ padding: "12px" }} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ color: "green", fontSize: "12px" }}>
              Drop the files here...
            </p>
          ) : (
            <p style={{ fontSize: "12px" }}>
              Dosyaları buraya sürükleyip bırakın veya dosyaları seçmek için
              tıklayın
            </p>
          )}
          <em style={{ fontSize: "12px" }}>
            (*.jpeg,*.png,*.jpg uzantılı resimler kabul edilecektir.)
          </em>
        </div>
        <ProgressList {...{ files }} />
        <ImagesList />
      </Paper>
    </>
  );
};

export default AddImages;

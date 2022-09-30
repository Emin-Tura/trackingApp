import { Clear, Download } from "@mui/icons-material";
import {
  Box,
  Card,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React from "react";
import { deleteDocument, downloadDocument } from "../../../actions/document";
import { useValue } from "../../../context/ContextProvider";

const DocumentList = () => {
  const {
    state: { currentUser, docs },
    dispatch,
  } = useValue();

  const handleDelete = (params) => {
    if (currentUser.authority === "Tam Yetki") {
      let text = "Dokümanı Silmek İstediğinize Emin Misiniz?";
      if (window.confirm(text)) {
        deleteDocument(currentUser, params, dispatch);
      }
    } else {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "info",
          message: "Bu işlem için yetkiniz yok!",
        },
      });
    }
  };
  const handleDownload = (params) => {
    if (currentUser.authority === "Yetki Yok") {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "info",
          message: "Bu işlem için yetkiniz yok!",
        },
      });
    }
    downloadDocument(currentUser, params, dispatch);
  };

  return (
    <Box>
      <ImageList
        gap={12}
        sx={{
          my: 4,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(200px,150px)) !important",
        }}
      >
        {docs.map((file, index) => (
          <Card key={index}>
            <ImageListItem>
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
                title={file.title}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    onClick={() => handleDelete(file)}
                  >
                    <Clear />
                  </IconButton>
                }
              />
              <img
                src={require(`../../../assets/icon/${
                  (file.file.split(".")[1] === "pdf" && "pdf.png") ||
                  (file.file.split(".")[1] === ("docx" || "doc") &&
                    "docx.png") ||
                  (file.file.split(".")[1] === ("xlsx" || "xls") &&
                    "xlsx.png") ||
                  (file.file.split(".")[1] === ("pptx" || "ppt") &&
                    "pptx.png") ||
                  (file.file.split(".")[1] ===
                    ("txt" || "odt" || "ott" || "rtf" || "uot" || "dic") &&
                    "txt.png") ||
                  (file.file.split(".")[1] ===
                    ("zip" || "rar" || "tar" || "7z") &&
                    "zip-file.png") ||
                  (file.file.split(".")[1] === ("png" || "jpeg" || "psd") &&
                    "jpg-png.png") ||
                  (file.file.split(".")[1] === ("mp4" || "mkv") && "mp4.png") ||
                  (file.file.split(".")[1] === "mp3" && "mp3.png")
                }`)}
                alt="img"
                style={{
                  width: "100px",
                  height: "200px",
                  objectFit: "contain",
                  margin: "auto",
                }}
              />
              <ImageListItemBar
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    onClick={() => handleDownload(file)}
                  >
                    <Download />
                  </IconButton>
                }
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Box>
  );
};

export default DocumentList;

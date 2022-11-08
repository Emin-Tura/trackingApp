import { Clear, Download, Info } from "@mui/icons-material";
import {
  Box,
  Card,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
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
    downloadDocument(params, dispatch);
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
                  (file.file.split(".").slice(-1)[0] === "pdf" && "pdf.png") ||
                  (file.file.split(".").slice(-1)[0] === "PDF" && "pdf.png") ||
                  (file.file.split(".").slice(-1)[0] === "docx" &&
                    "docx.png") ||
                  (file.file.split(".").slice(-1)[0] === "DOCX" &&
                    "docx.png") ||
                  (file.file.split(".").slice(-1)[0] === "doc" && "doc.png") ||
                  (file.file.split(".").slice(-1)[0] === "DOC" && "doc.png") ||
                  (file.file.split(".").slice(-1)[0] === "xlsx" &&
                    "xlsx.png") ||
                  (file.file.split(".").slice(-1)[0] === "XLSX" &&
                    "xlsx.png") ||
                  (file.file.split(".").slice(-1)[0] === "xls" && "xls.png") ||
                  (file.file.split(".").slice(-1)[0] === "XLS" && "xls.png") ||
                  (file.file.split(".").slice(-1)[0] === "pptx" &&
                    "pptx.png") ||
                  (file.file.split(".").slice(-1)[0] === "PPTX" &&
                    "pptx.png") ||
                  (file.file.split(".").slice(-1)[0] === "ppt" && "ppt.png") ||
                  (file.file.split(".").slice(-1)[0] === "PPT" && "ppt.png") ||
                  (file.file.split(".").slice(-1)[0] === "txt" && "txt.png") ||
                  (file.file.split(".").slice(-1)[0] === "TXT" && "txt.png") ||
                  (file.file.split(".").slice(-1)[0] === "odt" && "txt.png") ||
                  (file.file.split(".").slice(-1)[0] === "ODT" && "txt.png") ||
                  (file.file.split(".").slice(-1)[0] === "ott" && "txt.png") ||
                  (file.file.split(".").slice(-1)[0] === "OTT" && "txt.png") ||
                  (file.file.split(".").slice(-1)[0] === "rtf" && "txt.png") ||
                  (file.file.split(".").slice(-1)[0] === "RTF" && "txt.png") ||
                  (file.file.split(".").slice(-1)[0] === "uot" && "txt.png") ||
                  (file.file.split(".").slice(-1)[0] === "UOT" && "txt.png") ||
                  (file.file.split(".").slice(-1)[0] === "dic" && "txt.png") ||
                  (file.file.split(".").slice(-1)[0] === "DIC" && "txt.png") ||
                  (file.file.split(".").slice(-1)[0] === "zip" &&
                    "zip-file.png") ||
                  (file.file.split(".").slice(-1)[0] === "ZIP" &&
                    "zip-file.png") ||
                  (file.file.split(".").slice(-1)[0] === "rar" &&
                    "zip-file.png") ||
                  (file.file.split(".").slice(-1)[0] === "RAR" &&
                    "zip-file.png") ||
                  (file.file.split(".").slice(-1)[0] === "tar" &&
                    "zip-file.png") ||
                  (file.file.split(".").slice(-1)[0] === "TAR" &&
                    "zip-file.png") ||
                  (file.file.split(".").slice(-1)[0] === "7z" &&
                    "zip-file.png") ||
                  (file.file.split(".").slice(-1)[0] === "7Z" &&
                    "zip-file.png") ||
                  (file.file.split(".").slice(-1)[0] === "png" &&
                    "jpg-png.png") ||
                  (file.file.split(".").slice(-1)[0] === "PNG" &&
                    "jpg-png.png") ||
                  (file.file.split(".").slice(-1)[0] === "jpeg" &&
                    "jpg-png.png") ||
                  (file.file.split(".").slice(-1)[0] === "JPEG" &&
                    "jpg-png.png") ||
                  (file.file.split(".").slice(-1)[0] === "psd" &&
                    "jpg-png.png") ||
                  (file.file.split(".").slice(-1)[0] === "PSD" &&
                    "jpg-png.png") ||
                  (file.file.split(".").slice(-1)[0] === "jpg" &&
                    "jpg-png.png") ||
                  (file.file.split(".").slice(-1)[0] === "JPG" &&
                    "jpg-png.png") ||
                  (file.file.split(".").slice(-1)[0] === "mp4" && "mp4.png") ||
                  (file.file.split(".").slice(-1)[0] === "MP4" && "mp4.png") ||
                  (file.file.split(".").slice(-1)[0] === "mkv" && "mp4.png") ||
                  (file.file.split(".").slice(-1)[0] === "MKV" && "mp4.png") ||
                  (file.file.split(".").slice(-1)[0] === "mp3" && "mp3.png") ||
                  (file.file.split(".").slice(-1)[0] === "MP3" && "mp3.png") ||
                  (file.file.split(".").slice(-1)[0] === "html" &&
                    "html.png") ||
                  (file.file.split(".").slice(-1)[0] === "HTML" &&
                    "html.png") ||
                  (file.file.split(".").slice(-1)[0] === "crt" &&
                    "certificate.png") ||
                  (file.file.split(".").slice(-1)[0] === "CRT" &&
                    "certificate.png")
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
                subtitle={
                  <Tooltip
                    title={`${file.title} dokümanı, ${file.user} tarafından yüklenmiştir.`}
                    sx={{
                      color: "rgba(255, 255, 255, 0.54)",
                    }}
                  >
                    <Info
                      sx={{
                        color: "#696969",
                      }}
                    />
                  </Tooltip>
                }
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    onClick={() => handleDownload(file)}
                    id="input"
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

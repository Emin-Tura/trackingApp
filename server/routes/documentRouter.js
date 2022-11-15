import { Router } from "express";
import {
  createDocument,
  deleteDocument,
  downloadDocument,
  getDocument,
} from "../controllers/document.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

// const fileFilter = (req, file, callback) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     callback(null, true);
//   } else {
//     callback(null, false);
//   }
// };

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
  // fileFilter: fileFilter,
});

const documentRouter = Router();
documentRouter.post("/", upload.single("file"), createDocument);
documentRouter.get("/", getDocument);
documentRouter.get("/:download", downloadDocument);
documentRouter.delete("/:documentId", deleteDocument);

export default documentRouter;

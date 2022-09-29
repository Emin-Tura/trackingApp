import { Router } from "express";
import { createDocument, getDocument } from "../controllers/document.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

var uniqueId = uuidv4();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, uniqueId + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const documentRouter = Router();
documentRouter.post("/", upload.single("file"), createDocument);
documentRouter.get("/", getDocument);
export default documentRouter;

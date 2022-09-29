import tryCatch from "./utils/tryCatch.js";
import Document from "../models/Document.js";

export const createDocument = tryCatch(async (req, res) => {
  console.log(req);
  const { filename } = req.file;
  const newDocument = new Document({ ...req.body, file: filename });
  await newDocument.save();
  res.status(201).json({ success: true, result: newDocument });
});
export const getDocument = tryCatch(async (req, res) => {
  const document = await Document.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: document });
});

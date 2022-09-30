import tryCatch from "./utils/tryCatch.js";
import Document from "../models/Document.js";
import https from "https";

export const createDocument = tryCatch(async (req, res) => {
  const { filename } = req.file;
  const newDocument = new Document({ ...req.body, file: filename });
  await newDocument.save();
  res.status(201).json({ success: true, result: newDocument });
});
export const getDocument = tryCatch(async (req, res) => {
  const document = await Document.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: document });
});
export const deleteDocument = tryCatch(async (req, res) => {
  const { _id } = await Document.findByIdAndDelete(req.params.documentId);
  res.status(200).json({ success: true, result: { _id } });
});

export const downloadDocument = tryCatch(async (req, res) => {
  const { _id } = await Document.findById(req.params.documentId);
  if (!_id)
    return res
      .status(404)
      .json({ success: false, message: "File does not exist." });
  https.get(_id.secure_url, (fileStream) => fileStream.pipe(res));
  res.status(200).json({ success: true, result: { _id } });
});

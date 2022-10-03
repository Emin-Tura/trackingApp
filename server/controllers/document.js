import tryCatch from "./utils/tryCatch.js";
import Document from "../models/Document.js";

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
  const document = await Document.find({
    $or: [{ file: { $regex: req.params.download } }],
  });
  res.download(`../client/public/uploads/${document[0].file}`);
});

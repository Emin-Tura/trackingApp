import tryCatch from "./utils/tryCatch.js";
import Document from "../models/Document.js";
import fs from "fs";

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
  fs.unlink(`./public/uploads/${req.body.file}`, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).json({ success: true, result: { _id } });
});

export const downloadDocument = tryCatch(async (req, res) => {
  const document = await Document.find({
    $or: [{ file: { $regex: req.params.download } }],
  });
  res.download(`./public/uploads/${document[0].file}`);
});

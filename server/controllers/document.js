import tryCatch from "./utils/tryCatch.js";
import Document from "../models/Document.js";

export const createDocument = tryCatch(async (req, res) => {
  const newDocument = new Document({ ...req.body });
  await newDocument.save();
  res.status(201).json({ success: true, result: newDocument });
});

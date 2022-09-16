import tryCatch from "./utils/tryCatch.js";
import Product from "../models/Product.js";

export const createProduct = tryCatch(async (req, res) => {
  const newProduct = new Product({ ...req.body });
  await newProduct.save();
  res.status(201).json({ success: true, result: newProduct });
});

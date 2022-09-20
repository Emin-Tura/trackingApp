import tryCatch from "./utils/tryCatch.js";
import Product from "../models/Product.js";

export const createProduct = tryCatch(async (req, res) => {
  const newProduct = new Product({ ...req.body });
  await newProduct.save();
  res.status(201).json({ success: true, result: newProduct });
});

export const getProducts = tryCatch(async (req, res) => {
  const product = await Product.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: product });
});

export const deleteProduct = tryCatch(async (req, res) => {
  const { _id } = await Product.findByIdAndDelete(req.params.productId);
  res.status(200).json({ success: true, result: { _id } });
});

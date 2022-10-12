import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 5 },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
    images: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema);

export default Product;

import mongoose from "mongoose";

const documentSchema = mongoose.Schema(
  {
    title: { type: String, minLength: 2 },
    description: {
      type: String,
      minLength: 2,
      maxLength: 1000,
    },
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("documents", documentSchema);

export default Document;

import mongoose from "mongoose";

const documentSchema = mongoose.Schema(
  {
    title: { type: String, minLength: 2 },
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("documents", documentSchema);

export default Document;

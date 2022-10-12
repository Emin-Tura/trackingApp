import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 2 },
    address: {
      type: String,
    },
    email: { type: String, required: true },
    phone: { type: String },
    relatedName: { type: String },
    description: { type: String },
    product: { type: String, minLength: 2 },
    completed: { type: Boolean, default: false },
    completedEmail: { type: String },
    completedName: { type: String },
    day: { type: Date },
  },
  { timestamps: true }
);

const Company = mongoose.model("companies", companySchema);

export default Company;

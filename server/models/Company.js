import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 2 },
    address: {
      type: String,
      minLength: 5,
    },
    email: { type: String, required: true },
    phone: { type: String },
    relatedName: { type: String, minLength: 2 },
    description: { type: String, minLength: 5 },
    product: { type: String },
    completed: { type: Boolean, default: false },
    completedEmail: { type: String },
    day: { type: Date },
  },
  { timestamps: true }
);

const Company = mongoose.model("companies", companySchema);

export default Company;

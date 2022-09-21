import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, min: 2, max: 50, required: true },
    email: {
      type: String,
      min: 5,
      max: 50,
      unique: true,
      trim: true,
    },
    password: { type: String },
    photoURL: { data: Buffer, type: String },
    role: {
      type: String,
      default: "IT / Bilişim",
      enum: [
        "Yönetim",
        "IT / Bilişim",
        "İnsan Kaynakları",
        "Stajyer",
        "Satış",
        "Muhasebe",
      ],
    },
    active: { type: Boolean, default: true },
    authority: {
      type: String,
      default: "Yetki Yok",
      enum: ["Tam Yetki", "Kısıtlı Yetki", "Yetki Yok"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
export default User;

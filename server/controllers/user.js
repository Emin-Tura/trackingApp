import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import tryCatch from "./utils/tryCatch.js";

export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();

  const existedUser = await User.findOne({ email: emailLowerCase });
  if (!existedUser)
    return res.status(404).json({
      success: false,
      message: "Giriş Bilgileri Hatalı veya Böyle Bir Kullanıcı Yok",
    });
  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword)
    return res.status(400).json({
      success: false,
      message: "Giriş Bilgileri Hatalı veya Böyle Bir Kullanıcı Yok",
    });

  const { _id: id, email: tempEmail, photoURL, role, active } = existedUser;
  if (!active)
    return res.status(400).json({
      success: false,
      message: "Bu hesap askıya alındı! Yöneticiyle iletişime geçmeyi deneyin",
    });
  const token = jwt.sign({ id, email, photoURL }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({
    success: true,
    result: { id, email: emailLowerCase, photoURL, token, role, active },
  });
});

export const getUsers = tryCatch(async (req, res) => {
  const users = await User.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: users });
});

export const updateStatus = tryCatch(async (req, res) => {
  const { role, active } = req.body;
  await User.findByIdAndUpdate(req.params.userId, { role, active });
  res.status(200).json({ success: true, result: { _id: req.params.userId } });
});

export const createUser = tryCatch(async (req, res) => {
  const { name, email, photoURL } = req.body;

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (existedUser)
    return res
      .status(400)
      .json({ success: false, message: "Kullanıcı Zaten Var!" });
  const user = await User.create({
    name,
    email: emailLowerCase,
    photoURL,
  });
  const { _id: id, photoURL: tempPhotoURL, role, active } = user;
  const token = jwt.sign({ id, name, tempPhotoURL }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({
    success: true,
    result: { id, name, email: user.email, tempPhotoURL, token, role, active },
  });
});

export const deleteUser = tryCatch(async (req, res) => {
  const { _id } = await User.findByIdAndDelete(req.params.userId);
  res.status(200).json({ success: true, result: { _id } });
});

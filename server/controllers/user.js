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

  const {
    _id: id,
    name,
    email: tempEmail,
    photoURL,
    role,
    authority,
    active,
  } = existedUser;
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
    result: {
      name,
      id,
      email: emailLowerCase,
      photoURL,
      token,
      role,
      authority,
      active,
    },
  });
});

export const getUsers = tryCatch(async (req, res) => {
  const users = await User.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: users });
});

export const updateStatus = tryCatch(async (req, res) => {
  const { name, role, authority, active } = req.body;
  await User.findByIdAndUpdate(req.params.userId, {
    name,
    role,
    authority,
    active,
  });
  res.status(200).json({ success: true, result: { _id: req.params.userId } });
});

export const createUser = tryCatch(async (req, res) => {
  const { name, email, password, photoURL } = req.body;

  if (password.length < 5)
    return res.status(400).json({
      success: false,
      message: "Şifre 5 karakter veya daha fazla olmalıdır",
    });

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (existedUser)
    return res
      .status(400)
      .json({ success: false, message: "Kullanıcı Zaten Var!" });

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email: emailLowerCase,
    password: hashedPassword,
    photoURL,
  });
  const { _id: id, photoURL: tempPhotoURL, role, authority, active } = user;
  const token = jwt.sign({ id, name, tempPhotoURL }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({
    success: true,
    result: {
      id,
      name,
      email: user.email,
      password: hashedPassword,
      tempPhotoURL,
      token,
      role,
      authority,
      active,
    },
  });
});

export const deleteUser = tryCatch(async (req, res) => {
  const { _id } = await User.findByIdAndDelete(req.params.userId);
  res.status(200).json({ success: true, result: { _id } });
});

export const updatePassword = tryCatch(async (req, res) => {
  const { password, oldPassword, email } = req.body;
  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  const correctPassword = await bcrypt.compare(
    oldPassword,
    existedUser.password
  );
  if (!correctPassword)
    return res.status(400).json({
      success: false,
      message: "Girilen Şifre Yanlış",
    });
  const hashedPassword = await bcrypt.hash(password, 12);
  const { _id } = await User.findByIdAndUpdate(req.params.userId, {
    password: hashedPassword,
  });
  res.status(200).json({ success: true, result: { _id } });
});

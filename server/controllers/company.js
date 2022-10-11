import tryCatch from "./utils/tryCatch.js";
import Company from "../models/Company.js";

export const createCompany = tryCatch(async (req, res) => {
  const newCompany = new Company({ ...req.body });
  await newCompany.save();
  res.status(201).json({ success: true, result: newCompany });
});

export const getCompanies = tryCatch(async (req, res) => {
  const companies = await Company.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: companies });
});

export const deleteCompany = tryCatch(async (req, res) => {
  const { _id } = await Company.findByIdAndDelete(req.params.companyId);
  res.status(200).json({ success: true, result: { _id } });
});

export const updateCompany = tryCatch(async (req, res) => {
  const { completed, completedEmail } = req.body;
  await Company.findByIdAndUpdate(req.params.companyId, {
    completed,
    completedEmail,
  });
  res
    .status(200)
    .json({ success: true, result: { _id: req.params.companyId } });
});

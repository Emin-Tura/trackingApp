import { Router } from "express";

import {
  createCompany,
  deleteCompany,
  getCompanies,
  updateCompany,
} from "../controllers/company.js";

const companyRouter = Router();
companyRouter.post("/", createCompany);
companyRouter.get("/", getCompanies);
companyRouter.delete("/:companyId", deleteCompany);
companyRouter.patch("/updateCompany/:companyId", updateCompany);

export default companyRouter;

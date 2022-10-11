import express, { application } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import cors from "cors";
import mongoose from "mongoose";
import productRouter from "./routes/productRouter.js";
import taskRouter from "./routes/taskRouter.js";
import documentRouter from "./routes/documentRouter.js";
import eventRouter from "./routes/eventRouter.js";
import companyRouter from "./routes/companyRouter.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Origin", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "X-Requested-With,Content-Type,Authorization"
  );
  next();
});

app.use(express.json());

app.use(cors());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/task", taskRouter);
app.use("/document", documentRouter);
app.use("/event", eventRouter);
app.use("/company", companyRouter);

app.get("/", (req, res) => res.json({ message: "Welcome to our API" }));
app.use("/", (req, res) =>
  res.status(404).json({ succes: false, message: "Not Found" })
);

const startServer = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017", {
      dbName: "cypoint",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();

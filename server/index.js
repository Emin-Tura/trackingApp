import express, { application } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import cors from "cors";
import productRouter from "./routes/productRouter.js";
import taskRouter from "./routes/taskRouter.js";
import documentRouter from "./routes/documentRouter.js";
import eventRouter from "./routes/eventRouter.js";
import companyRouter from "./routes/companyRouter.js";
import mailRouter from "./routes/mailRouter.js";
import startServer from "./database/db.js";
dotenv.config();

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception..... 💣 🔥 stopping the server....");
  console.log(error.name, error.message);

  process.exit(1);
});

const PORT = process.env.PORT || 5000;
const app = express();
startServer();

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
app.use("/sendMail", mailRouter);
app.use("/document", documentRouter);
app.use("/event", eventRouter);
app.use("/company", companyRouter);

app.get("/", (req, res) => res.json({ message: "Welcome to our API" }));
app.use("/", (req, res) =>
  res.status(404).json({ succes: false, message: "Not Found" })
);

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Unhandled Rejection
process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection..... 💣 🔥 stopping the server....");
  console.log(error.name, error.message);
  server.close(() => {
    // exit code 1 means that there is an issue that caused the program to exit
    process.exit(1);
  });
});

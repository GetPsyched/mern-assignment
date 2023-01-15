import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/student.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/students", studentRoutes);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => app.listen(port, () => console.log("Database connected!")))
  .catch((err) => console.log(err.message));

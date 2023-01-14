import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/student.js";

dotenv.config();

const app = express();
app.use("/students", studentRoutes);

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => app.listen(PORT, () => console.log("Database connected!")))
  .catch((err) => console.log(err.message));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import verifyJWT from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";
import credentials from "./middleware/credentials.js";
import corsOptions from "./config/corsOptions.js";

import loginRoutes from "./routes/auth.js";
import logoutRoutes from "./routes/logout.js";
import refreshRoutes from "./routes/refresh.js";
import registerRoutes from "./routes/register.js";
import studentRoutes from "./routes/student.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Public routes
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/refresh", refreshRoutes);
app.use("/logout", logoutRoutes);

// Private routes
app.use(verifyJWT);
app.use("/students", studentRoutes);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => app.listen(port, () => console.log("Database connected!")))
  .catch((err) => console.log(err.message));

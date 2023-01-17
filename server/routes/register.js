import express from "express";
import handleNewTeacher from "../controllers/register.js";

const router = express.Router();

router.post("/", handleNewTeacher);

export default router;

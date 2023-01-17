import express from "express";
import {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/student.js";

const router = express.Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.delete("/:id", deleteStudent);
router.patch("/", updateStudent);

export default router;

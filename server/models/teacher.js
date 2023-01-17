import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
});

const teacher = mongoose.model("teacher", teacherSchema);

export default teacher;

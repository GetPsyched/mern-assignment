import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  generalRegistrationNumber: Number,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    enum: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman"],
    required: true,
  },
  grade: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    required: true,
  },
  section: {
    type: String,
    enum: ["A", "B", "C", "D", "E", "F"],
    required: true,
  },
});

const student = mongoose.model("student", studentSchema);

export default student;

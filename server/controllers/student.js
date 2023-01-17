import StudentModel from "../models/student.js";

export const getStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  const student = req.body;
  const newStudent = new StudentModel(student);

  try {
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const id = req.params.id;

  try {
    await StudentModel.findByIdAndRemove(id).exec();
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
};

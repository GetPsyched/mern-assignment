import TeacherModel from "../models/teacher.js";
import bcrypt from "bcrypt";

const handleNewTeacher = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const duplicate = await TeacherModel.findOne({ username: user });
  if (duplicate) {
    res.status(409).json({ message: "User with username already exists" });
  } else {
    try {
      // Encrypt the password
      const hashedPwd = await bcrypt.hash(pwd, 10);
      const newTeacher = new TeacherModel({
        username: user,
        password: hashedPwd,
      });
      try {
        await newTeacher.save();
        res.status(201).json(newTeacher);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default handleNewTeacher;

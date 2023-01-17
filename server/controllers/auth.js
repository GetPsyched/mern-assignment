import TeacherModel from "../models/teacher.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const teacher = await TeacherModel.findOne({ username: user });
  if (!teacher) {
    return res.sendStatus(401);
  }

  const match = await bcrypt.compare(pwd, teacher.password);
  if (match) {
    const accessToken = jwt.sign(
      { username: teacher.username },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { username: teacher.username },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );
    await TeacherModel.findOneAndUpdate(
      { username: teacher.username },
      { refreshToken: refreshToken }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

export default handleLogin;

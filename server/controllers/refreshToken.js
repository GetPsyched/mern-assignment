import TeacherModel from "../models/teacher.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;

  const teacher = await TeacherModel.findOne({ refreshToken: refreshToken });
  if (!teacher) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (error, decodedToken) => {
    if (error || teacher.username !== decodedToken.username) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      { username: decodedToken.username },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  });
};

export default handleRefreshToken;

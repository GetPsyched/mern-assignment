import TeacherModel from "../models/teacher.js";

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  const refreshToken = cookies.jwt;

  const teacher = await TeacherModel.findOne({ refreshToken: refreshToken });
  if (!teacher) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  await TeacherModel.findOneAndUpdate(
    { username: teacher.username },
    { refreshToken: null }
  );
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.sendStatus(204);
};

export default handleLogout;

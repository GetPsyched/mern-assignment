import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (error, decodedToken) => {
    if (error) {
      return res.sendStatus(403); // Invalid Token
    }
    req.user = decodedToken.username;
    next();
  });
};

export default verifyJWT;

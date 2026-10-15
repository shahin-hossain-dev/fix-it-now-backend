import jwt from "jsonwebtoken";
import config from "../config";

const jwtSecret = config.jwtSecret;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is missing");
}

export const createToken = (payload: {
  id: number;
  email: string;
  role: string;
}) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: "1d",
  });
};

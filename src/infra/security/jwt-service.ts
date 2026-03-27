import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET not found in environment variables");
}

export const jwtService = {
  sign(payload: any) {
    return jwt.sign(payload, SECRET, {
      expiresIn: "1h",
    });
  },
  

  verify(token: string) {
    return jwt.verify(token, SECRET);
  },
};

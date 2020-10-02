import jwt from "jsonwebtoken";
import { TUserLeanDocument } from "../../../database/models/User/user.types";

export const generateToken = (user: TUserLeanDocument): string => {
  return jwt.sign(
    user,
    process.env.PW_JWT_HASH as string,
    { expiresIn: process.env.PW_JWT_EXPIRATION }
  );
}

import { TUserRequest } from "../app/middlewares/auth/authMiddleware.types";

declare global {
  namespace Express {
    interface Request {
      user: TUserRequest
    }
  }
}
  
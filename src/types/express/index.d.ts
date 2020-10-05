import { TUserRequest } from "../../app/middlewares/auth/authMiddleware.types";

// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
declare module 'express-serve-static-core' {
  interface Request {
    user: TUserRequest;
  }
  // interface Response {
  //   myField?: string
  // }
}
export type TUserRequest = {
  _id: string;
  isAuth: boolean;
  // email: string;
}

export type TDecodedToken = {
  _id: string;
  email: string;
}

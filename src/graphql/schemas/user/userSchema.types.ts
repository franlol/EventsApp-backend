export type TAuth = {
  _id?: string;
  token: string;
  tokenExpiresIn?: string;
}

export type TUserInput = {
  email: string;
  password: string;
}

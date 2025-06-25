export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  nickname: string;
  email: string;
  password: string;
}

export interface User {
  uid: string;
  nickname: string;
  email: string;
}

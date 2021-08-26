export interface RegisterUserBody {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface VerifyUserBody {
  email: string;
  username: string;
  id: string;
}

export interface LoginUserBody {
  email: string;
  password: string;
}

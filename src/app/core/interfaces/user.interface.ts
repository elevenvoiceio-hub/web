export interface IUserRegister {
  username: string;
  email: string;
  password: string;
}

export interface IVerifyEmail {
  email: string;
  code: string;
}

export interface IUserLogin {
  login: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  role: string;
  is_active_user: boolean;
  is_subscribed: boolean;
  character_limit: number;
  voice_limit: number;
  plan_name: string;
}

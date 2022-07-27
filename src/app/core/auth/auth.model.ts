import { ERols } from '@pages/login/model/login.model';

export interface IReqUser {
  email: string;
  password: string;
  role: ERols;
}

export interface IUser {
  email: string;
  role: ERols;
  uid: string;
  createAt: string;
  useActivate: boolean;
}


import { ERols } from '@pages/login/model/login.model';

export interface IreqUser {
  email: string
  password: string
  role: ERols
}

export interface Iuser {
  email: string
  role: ERols
  uid: string
  createAt: string
  useActivate: boolean
}


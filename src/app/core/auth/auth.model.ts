import { ERols } from '@pages/login/model/login.model';

export interface Iuser {
  email: string
  password: string
  role: ERols
}

export interface IReqCreateBoard {
  title: string;
  content: string;
}

export interface IResBoard {
  id: string;
  title: string;
  content: string;
  email?: string | null;
  createAt: string;
}

export enum BORDER_TYPE {
  CREATE = 'create',
  MODIFY = 'modify',
  DETAIL = 'detail'
}

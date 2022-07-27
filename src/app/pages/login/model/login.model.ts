export enum ERols {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT'
}

export const FG_STATUS = {
  VALID: 'VALID',
  INVALID: 'INVALID',
  PENDING: 'PENDING',
  DISABLED: 'DISABLED'
} as const

export type T_FG_STATUS = keyof typeof FG_STATUS

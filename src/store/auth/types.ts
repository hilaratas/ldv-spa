export interface authState {
  token: string | null,
  refreshToken: string | null,
}

export interface User {
  user_id: string,
  email: string,
  email_verified: boolean,
  auth_time: number,
  exp_time: number
}

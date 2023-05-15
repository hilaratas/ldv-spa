export interface authState {
  token: string | null,
  refreshToken: string | null,
  user : User | null
}

export interface User {
  user_id: string,
  email: string,
  email_verified: boolean,
  auth_time: number,
  exp_time: number
}

//todo: уточнить у firebase точное определение jwt-token payload
//todo: избавиться от any
export type fbPayload = Object | any
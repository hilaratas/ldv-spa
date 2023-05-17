export interface ProfileState {
  profile: {
    userId?: string | null
    name?: string | null,
    surname?: string | null,
    tel?: string | null
  }

}

export interface Profile {
  userId: string,
  name: string | null,
  surname: string | null,
  tel: string | null
}
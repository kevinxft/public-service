interface UserData {
  name: string
  username: string
  desc: string
  updated: Date
  created: Date
}

export interface UserRes {
  data: UserData
}

export interface UsersRes {
  data: UserData[]
  count: number
}

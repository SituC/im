export interface ReigsterParams {
  username: string
  password: string
}

export interface User {
  id: string
  username: string
  status: string
  createdTime: string
  updateTime: string
}

export interface CreateGroupParams {
  groupName: string
}

export interface GroupResponse {
  createdTime: number
  groupName: string
  id: string
  updatedTime: number
  userId: string
}
export type UserStatus = 'online' | 'offline'

export type Chat = {
  id: number
  name: string
  status: UserStatus
  lastMessage: string
  lastTime: number
  unread: boolean
}

export type Message = {
  id: string
  chatId: number
  from: 'me' | 'them'
  text: string
  time: number
}

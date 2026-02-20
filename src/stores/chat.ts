import { defineStore } from 'pinia'
import type { Chat, Message, UserStatus } from '@/types'

type PersistedState = {
  chats: Chat[]
  messagesByChat: Record<number, Message[]>
  activeChatId: number | null
}

const LS_KEY = 'messenger_test_state_v1'

function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function randStatus(): UserStatus {
  return Math.random() > 0.5 ? 'online' : 'offline'
}

function makeFakeHistory(chatId: number, count = 24): Message[] {
  const now = Date.now()
  const res: Message[] = []
  for (let i = 0; i < count; i++) {
    const from = Math.random() > 0.5 ? 'them' : 'me'
    res.push({
      id: uid(),
      chatId,
      from,
      text: from === 'them' ? 'Привет! Как дела?' : 'Нормально, спасибо)',
      time: now - (count - i) * 60_000,
    })
  }
  return res
}

export const useChatStore = defineStore('chat', {
  state: (): PersistedState => ({
    chats: [],
    messagesByChat: {},
    activeChatId: null,
  }),

  getters: {
    activeChat(state): Chat | null {
      return state.chats.find(c => c.id === state.activeChatId) ?? null
    },
    activeMessages(state): Message[] {
      if (state.activeChatId == null) return []
      return state.messagesByChat[state.activeChatId] ?? []
    },
  },

  actions: {
    loadFromStorage() {
      const raw = localStorage.getItem(LS_KEY)
      if (!raw) return
      try {
        const data = JSON.parse(raw) as PersistedState
        this.chats = data.chats ?? []
        this.messagesByChat = data.messagesByChat ?? {}
        this.activeChatId = data.activeChatId ?? null
      } catch {
        // ignore
      }
    },

    persist() {
      const data: PersistedState = {
        chats: this.chats,
        messagesByChat: this.messagesByChat,
        activeChatId: this.activeChatId,
      }
      localStorage.setItem(LS_KEY, JSON.stringify(data))
    },

    async initChats() {
      // если уже есть в storage, то не перетираем
      if (this.chats.length) return

      const r = await fetch('https://jsonplaceholder.typicode.com/users')
      const users: Array<{ id: number; name: string }> = await r.json()

      const picked = users.slice(0, 5)
      this.chats = picked.map(u => ({
        id: u.id,
        name: u.name,
        status: randStatus(),
        lastMessage: 'Открой чат 🙂',
        lastTime: Date.now(),
        unread: false,
      }))

      this.persist()
    },

    openChat(chatId: number) {
      this.activeChatId = chatId

      // при открытии создаём историю если нет
      if (!this.messagesByChat[chatId]) {
        this.messagesByChat[chatId] = makeFakeHistory(chatId, 26)
      }

      // случайно меняем статус для демонстрации реактивности
      const chat = this.chats.find(c => c.id === chatId)
      if (chat && Math.random() > 0.4) {
        chat.status = randStatus()
      }

      if (chat) chat.unread = false

      this.persist()
    },

    sendMessage(chatId: number, text: string) {
      const trimmed = text.trim()
      if (!trimmed) return

      const msg: Message = {
        id: uid(),
        chatId,
        from: 'me',
        text,
        time: Date.now(),
      }

      const list = this.messagesByChat[chatId] ?? (this.messagesByChat[chatId] = [])
      list.push(msg)

      const chat = this.chats.find(c => c.id === chatId)
      if (chat) {
        chat.lastMessage = trimmed.replace(/\s+/g, ' ').slice(0, 60)
        chat.lastTime = msg.time
      }

      this.persist()

      // автоответ
      const delay = 1000 + Math.floor(Math.random() * 1000)
      window.setTimeout(() => {
        this.receiveAutoReply(chatId)
      }, delay)
    },

    receiveAutoReply(chatId: number) {
      const msg: Message = {
        id: uid(),
        chatId,
        from: 'them',
        text: 'Спасибо за сообщение!)',
        time: Date.now(),
      }

      const list = this.messagesByChat[chatId] ?? (this.messagesByChat[chatId] = [])
      list.push(msg)

      const chat = this.chats.find(c => c.id === chatId)
      if (chat) {
        chat.lastMessage = msg.text
        chat.lastTime = msg.time

        if (this.activeChatId !== chatId) {
          chat.unread = true
        }
      }

      this.persist()
    },
  },
})

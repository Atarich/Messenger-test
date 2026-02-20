<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'

const store = useChatStore()
const router = useRouter()

const isMobile = computed(() => window.matchMedia('(max-width: 760px)').matches)

function open(chatId: number) {
  store.openChat(chatId)
  if (isMobile.value) router.push(`/chat/${chatId}`)
}
</script>

<template>
  <div class="list">
    <div class="header">Чаты</div>

    <button
      v-for="c in store.chats"
      :key="c.id"
      class="item"
      :class="{ active: c.id === store.activeChatId }"
      @click="open(c.id)"
    >
      <div class="avatar">
        <span class="status" :class="c.status"></span>
      </div>

      <div class="meta">
        <div class="row">
          <div class="name">{{ c.name }}</div>
          <span v-if="c.unread" class="dot" title="Новое сообщение"></span>
        </div>
        <div class="last">{{ c.lastMessage }}</div>
      </div>
    </button>
  </div>
</template>

<style scoped lang="scss">
.list {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.header {
  padding: 12px;
  font-weight: 700;
  border-bottom: 1px solid #e6e6e6;
}
.item {
  border: 0;
  background: #fff;
  text-align: left;
  padding: 10px 12px;
  display: flex;
  gap: 10px;
  cursor: pointer;
  border-bottom: 1px solid #f1f1f1;
}
.item.active { background: #f7f7f7; }
.avatar {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  border: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.status.online { background: #22c55e; }
.status.offline { background: #9ca3af; }

.meta { flex: 1; min-width: 0; }
.row { display: flex; align-items: center; gap: 8px; }
.name { font-weight: 600; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #3b82f6;
}
.last {
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

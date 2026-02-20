<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import ChatWindow from '@/components/ChatWindow.vue'

const route = useRoute()
const router = useRouter()
const store = useChatStore()

const chatId = computed(() => Number(route.params.id))

onMounted(async () => {
  store.loadFromStorage()
  await store.initChats()
  if (Number.isFinite(chatId.value)) store.openChat(chatId.value)
})

function back() {
  router.push('/')
}
</script>

<template>
  <div class="mobile">
    <div class="topbar">
      <button class="back" @click="back">←</button>
      <div class="title">{{ store.activeChat?.name ?? 'Чат' }}</div>
      <div class="spacer"></div>
    </div>
    <ChatWindow :mobile="true" />
  </div>
</template>

<style scoped lang="scss">
.mobile {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.topbar {
  height: 52px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 10px;
}
.back {
  border: 1px solid #e6e6e6;
  background: #fff;
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
}
.title { font-weight: 600; }
.spacer { flex: 1; }
</style>

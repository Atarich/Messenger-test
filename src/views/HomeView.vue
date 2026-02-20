<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useChatStore } from '@/stores/chat'
import ChatList from '@/components/ChatList.vue'
import ChatWindow from '@/components/ChatWindow.vue'

const store = useChatStore()

onMounted(async () => {
  store.loadFromStorage()
  await store.initChats()
  if (store.activeChatId == null && store.chats.length) {
    store.openChat(store.chats[0].id)
  }
})

watch(
  () => [store.chats, store.messagesByChat, store.activeChatId],
  () => store.persist(),
  { deep: true }
)
</script>

<template>
  <div class="app">
    <aside class="left">
      <ChatList />
    </aside>
    <main class="right">
      <ChatWindow />
    </main>
  </div>
</template>

<style scoped lang="scss">
.app {
  height: 100vh;
  display: flex;
}
.left {
  width: 320px;
  border-right: 1px solid #e6e6e6;
  display: flex;
  min-width: 260px;
}
.right {
  flex: 1;
  display: flex;
  min-width: 0;
}
@media (max-width: 760px) {
  .left { width: 100%; }
  .right { display: none; }
}
</style>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useChatStore } from '@/stores/chat'
import MessageBubble from '@/components/MessageBubble.vue'

const props = defineProps<{ mobile?: boolean }>()

const store = useChatStore()
const text = ref('')
const listRef = ref<HTMLElement | null>(null)

const active = computed(() => store.activeChat)
const messages = computed(() => store.activeMessages)

async function scrollToBottom() {
  await nextTick()
  const el = listRef.value
  if (!el) return
  el.scrollTop = el.scrollHeight
}

function send() {
  if (!store.activeChatId) return
  if (!text.value.trim()) return
  store.sendMessage(store.activeChatId, text.value)
  text.value = ''
  scrollToBottom()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key !== 'Enter') return
  if (e.shiftKey) return // перенос строки
  e.preventDefault()
  send()
}

onMounted(() => {
  scrollToBottom()
})

watch(
  () => store.activeChatId,
  () => scrollToBottom()
)

watch(
  () => messages.value.length,
  () => scrollToBottom()
)
</script>

<template>
  <div class="chat">
    <div class="top" v-if="active">
      <div class="title">
        <span class="status" :class="active.status"></span>
        <span class="name">{{ active.name }}</span>
        <span class="sub">{{ active.status }}</span>
      </div>
    </div>

    <div class="empty" v-else>
      Выберите чат слева
    </div>

    <div v-if="active" class="history" ref="listRef">
      <transition-group name="msg" tag="div" class="stack">
        <MessageBubble v-for="m in messages" :key="m.id" :msg="m" />
      </transition-group>
    </div>

    <div v-if="active" class="composer">
      <textarea
        v-model="text"
        class="input"
        rows="2"
        placeholder="Написать сообщение…"
        @keydown="onKeydown"
      />
      <button class="send" :disabled="!text.trim()" @click="send">Отправить</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.top {
  height: 56px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  padding: 0 14px;
}
.title { display: flex; align-items: center; gap: 10px; }
.status { width: 10px; height: 10px; border-radius: 50%; }
.status.online { background: #22c55e; }
.status.offline { background: #9ca3af; }
.name { font-weight: 700; }
.sub { font-size: 12px; color: #666; }

.history {
  flex: 1;
  overflow: auto;
  padding: 12px;
  background: #fafafa;
}
.stack { display: flex; flex-direction: column; gap: 10px; }

.composer {
  border-top: 1px solid #e6e6e6;
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: flex-end;
}
.input {
  flex: 1;
  resize: none;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  padding: 10px;
  font: inherit;
}
.send {
  border: 1px solid #e6e6e6;
  background: #fff;
  border-radius: 10px;
  padding: 10px 12px;
  cursor: pointer;
}
.send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.msg-enter-active, .msg-leave-active {
  transition: all 160ms ease;
}
.msg-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
</style>

<script setup lang="ts">
import type { Message } from '@/types'
import { formatTime, formatMessageToHtml } from '@/utils/format'
import { computed } from 'vue'

const props = defineProps<{ msg: Message }>()
const mine = computed(() => props.msg.from === 'me')
const time = computed(() => formatTime(props.msg.time))
const html = computed(() => formatMessageToHtml(props.msg.text))
</script>

<template>
  <div class="row" :class="{ mine }">
    <div class="bubble">
      <div class="text" v-html="html"></div>
      <div class="time">{{ time }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
}
.row.mine {
  justify-content: flex-end;
}
.bubble {
  max-width: 70%;
  border: 1px solid #e6e6e6;
  background: #fff;
  border-radius: 14px;
  padding: 10px 10px 6px;
}
.row.mine .bubble {
  background: #f0f7ff;
}
.text {
  white-space: normal;
  word-break: break-word;
}
.time {
  font-size: 11px;
  color: #666;
  text-align: right;
  margin-top: 4px;
}
</style>

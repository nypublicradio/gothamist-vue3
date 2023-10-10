<script setup lang="ts">
import { ref } from 'vue'
import type { EmbedBlock } from '~~/composables/types/StreamfieldBlock'

defineProps<{
  block: EmbedBlock
}>()

const el = ref(null)

onMounted(() => {
  const js = document.createElement('script')
  js.src = 'https://www.tiktok.com/embed.js'
  el.value.appendChild(js)
})
</script>

<template>
  <div
    ref="el"
    class="streamfield-embed streamfield-embed-tiktok streamfield-paragraph mb-7"
    v-html="block.value.embed"
  />
</template>

<script setup lang="ts">
import type { EmbedBlock } from '../../composables/types/StreamfieldBlock'

const props = defineProps<{
  block: EmbedBlock
}>()
const el = ref(null)
const embedHtml = computed(() => useWnycAudioEmbeds(props.block.value.embed))
</script>

<template>
  <div
    ref="el"
    class="streamfield-embed streamfield-embed-default streamfield-paragraph mb-7"
    v-html="embedHtml"
  />
</template>

<style lang="scss">
.streamfield-embed {
  &.youtube {
    iframe {
      aspect-ratio: 16 / 9 !important;
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>

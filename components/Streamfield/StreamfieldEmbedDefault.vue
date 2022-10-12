<script setup lang="ts">
import { ref } from 'vue'
import { EmbedBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: EmbedBlock
}>()
const el = ref(null)
</script>

<template>
  <div
    class="streamfield-embed streamfield-embed-defualt mb-7"
    v-html="block.value.embed"
    ref="el"
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
  .instagram-media {
    @include media('<lg') {
      margin: auto !important;
    }
  }
}
</style>

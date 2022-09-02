<script setup lang="ts">
import { ref } from 'vue'
import { EmbedBlock } from '../../composables/types/StreamfieldBlock'
const props = defineProps<{
  block: EmbedBlock
}>()

const isYoutube = ref(
  props.block.value.embed.includes('https://www.youtube.com/embed')
)
</script>

<template>
  <div
    class="streamfield-embed mb-7"
    :class="[{ youtube: isYoutube }]"
    v-html="block.value.embed"
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
  .twitter-tweet {
    max-width: 100% !important;
    @include media('<lg') {
      justify-content: center;
    }
    iframe {
      width: 550px !important;
      max-width: 100% !important;
      flex-grow: unset !important;
    }
  }
}
</style>

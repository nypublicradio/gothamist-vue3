<script setup lang="ts">
import type { EmbedBlock } from '../../composables/types/StreamfieldBlock'

const props = defineProps<{
  block: EmbedBlock
}>()
const el = ref(null)
// Use the default formatting function to process the embed HTML before rendering it. As of now (11/26) it is just handling the WNYC on-demand player embeds.
const embedHtml = computed(() =>
  useStreamfieldEmbedDefaultFormatting(props.block.value.embed),
)
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

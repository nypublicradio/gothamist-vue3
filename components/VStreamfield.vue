<script setup lang="ts">
import type { StreamfieldBlock } from '../composables/types/StreamfieldBlock'

const props = withDefaults(defineProps<{
  streamfieldBlocks: StreamfieldBlock[]
  trackingComponentLocation?: string
}>(), {
  trackingComponentLocation: 'Streamfield',
})
const emit = defineEmits<{
  (e: 'allBlocksMounted', value: any): void
}>()
const el = ref(null)

let blocksMounted = 0

function countMountedBlock() {
  blocksMounted++
  if (blocksMounted === props.streamfieldBlocks.length)
    emit('allBlocksMounted', el)
}
</script>

<template>
  <div ref="el" class="streamfield">
    <template v-for="block in streamfieldBlocks">
      <StreamfieldBlockQuote
        v-if="block.type === 'block_quote'"
        :key="`${block.id}-block-quote`"
        :block="block"
        @vue:mounted="countMountedBlock"
      />

      <StreamfieldCode
        v-else-if="block.type === 'code'"
        :key="`${block.id}-code`"
        :block="block"
        @vue:mounted="countMountedBlock"
      />

      <StreamfieldContentCollection
        v-else-if="block.type === 'content_collection'"
        :key="`${block.id}-content-collection`"
        :block="block"
        :tracking-component-location="trackingComponentLocation"
        @vue:mounted="countMountedBlock"
      />

      <StreamfieldEmbed
        v-else-if="block.type === 'embed'"
        :key="`${block.id}-embed`"
        :block="block"
        @vue:mounted="countMountedBlock"
      />

      <StreamfieldHeading
        v-else-if="block.type === 'heading'"
        :key="`${block.id}-heading`"
        :block="block"
        @vue:mounted="countMountedBlock"
      />

      <StreamfieldImage
        v-else-if="block.type === 'image'"
        :key="`${block.id}-image`"
        :block="block"
        @vue:mounted="countMountedBlock"
      />

      <StreamfieldParagraph
        v-else-if="block.type === 'paragraph'"
        :key="`${block.id}-paragraph`"
        :block="block"
        @vue:mounted="countMountedBlock"
      />

      <StreamfieldPullQuote
        v-else-if="block.type === 'pull_quote'"
        :key="`${block.id}-pull-quote`"
        :block="block"
        @vue:mounted="countMountedBlock"
      />

      <StreamfieldFactbox
        v-else-if="block.type === 'factbox'"
        :key="`${block.id}-factbox`"
        :block="block"
        @vue:mounted="countMountedBlock"
      />
    </template>
  </div>
</template>

<style lang="scss">
.instagram-media {
  min-width: unset !important;
}
.twitter-tweet iframe {
  max-width: 300px;
}
</style>

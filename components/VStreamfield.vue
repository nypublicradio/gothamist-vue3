<script setup lang="ts">
import { StreamfieldBlock } from '../composables/types/StreamfieldBlock';
const props = defineProps<{
  streamfieldBlocks: StreamfieldBlock[]
}>()
const emit = defineEmits<{
  (e: 'allBlocksMounted', value: any): void
}>()
const el = ref(null)

let blocksMounted = 0

function countMountedBlock() {
  blocksMounted++
  if (blocksMounted === props.streamfieldBlocks.length) {
    emit('allBlocksMounted', el)
  }
}
</script>

<template>
  <div class="streamfield" ref="el">
    <template v-for="block in streamfieldBlocks">
      <StreamfieldBlockQuote
        v-if="block.type === 'block_quote'"
        :key="`${block.id}-block-quote`"
        :block="block"
        @vnodeMounted="countMountedBlock"
      />

      <StreamfieldCode
        v-else-if="block.type === 'code'"
        :key="`${block.id}-code`"
        :block="block"
        @vnodeMounted="countMountedBlock"
      />

      <StreamfieldContentCollection
        v-else-if="block.type === 'content_collection'"
        :key="`${block.id}-content-collection`"
        :block="block"
        @vnodeMounted="countMountedBlock"
      />

      <StreamfieldEmbed
        v-else-if="block.type === 'embed'"
        :key="`${block.id}-embed`"
        :block="block"
        @vnodeMounted="countMountedBlock"
      />

      <StreamfieldHeading
        v-else-if="block.type === 'heading'"
        :key="`${block.id}-heading`"
        :block="block"
        @vnodeMounted="countMountedBlock"
      />

      <StreamfieldImage
        v-else-if="block.type === 'image'"
        :key="`${block.id}-image`"
        :block="block"
        @vnodeMounted="countMountedBlock"
      />

      <StreamfieldParagraph
        v-else-if="block.type === 'paragraph'"
        :key="`${block.id}-paragraph`"
        :block="block"
        @vnodeMounted="countMountedBlock"
      />

      <StreamfieldPullQuote
        v-else-if="block.type === 'pull_quote'"
        :key="`${block.id}-pull-quote`"
        :block="block"
        @vnodeMounted="countMountedBlock"
      />
    </template>
  </div>
</template>
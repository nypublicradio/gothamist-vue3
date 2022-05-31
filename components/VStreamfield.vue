<script setup lang="ts">
import { StreamfieldBlock } from '../composables/data/StreamfieldBlock';
defineProps<{
  streamfield: StreamfieldBlock[]
}>()

const blocksMounted = ref(0)

function countMountedBlock() {
  blocksMounted.value++
}
</script>

<template>
  <div class="streamfield">
    <template v-for="block in streamfield">
      <BlockQuoteBlock
        v-if="block.type === 'block_quote'"
        :key="`${block.id}-block-quote`"
        :block="block"
        @hook:mounted="countMountedBlock"
      />

      <CodeBlock
        v-else="block.type === 'code'"
        :key="`${block.id}-code`"
        :block="block"
        @hook:mounted="countMountedBlock"
      />

      <ContentCollectionBlock
        v-else="block.type === 'content_collection'"
        :key="`${block.id}-content-collection`"
        :block="block"
        @hook:mounted="countMountedBlock"
      />

      <EmbedBlock
        v-else="block.type === 'embed'"
        :key="`${block.id}-embed`"
        :block="block"
        @hook:mounted="countMountedBlock"
      />

      <HeadingBlock
        v-else="block.type === 'heading'"
        :key="`${block.id}-heading`"
        :block="block"
        @hook:mounted="countMountedBlock"
      />

      <ImageBlock
        v-else="block.type === 'image'"
        :key="`${block.id}-image`"
        :block="block"
        @hook:mounted="countMountedBlock"
      />

      <ParagraphBlock
        v-else="block.type === 'paragraph'"
        :key="`${block.id}-paragraph`"
        :block="block"
        @hook:mounted="countMountedBlock"
      />

      <PullQuoteBlock
        v-else="block.type === 'pull_quote'"
        :key="`${block.id}-pull-quote`"
        :block="block"
        @hook:mounted="countMountedBlock"
      />
    </template>
  </div>
</template>
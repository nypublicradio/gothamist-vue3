<script setup lang="ts">
import { BlockQuoteBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: BlockQuoteBlock
}>()
</script>

<template>
  <div class="streamfield-block-quote mb-5">
    <blockquote>
      <p>
        {{ block.value.blockQuote }}
      </p>
    </blockquote>
  </div>
</template>

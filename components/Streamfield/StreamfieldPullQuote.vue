<script setup lang="ts">
import type { PullQuoteBlock } from '../../composables/types/StreamfieldBlock'

defineProps<{
  block: PullQuoteBlock
}>()
</script>

<template>
  <PullQuote
    class="streamfield-pull-quote"
    :quote="block.value.pullQuote"
    :author="block.value.attribution"
  />
</template>

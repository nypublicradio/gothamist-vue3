<script setup lang="ts">
import { PullQuoteBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: PullQuoteBlock
}>()
</script>

<template>
  <PullQuote
    class="streamfield-pull-quote mb-5"
    :quote="block.value.pullQuote"
    :author="block.value.attribution"
  />
</template>

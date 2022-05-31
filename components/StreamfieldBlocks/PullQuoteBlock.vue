<script setup lang="ts">
import { PullQuoteBlock } from '../../composables/data/StreamfieldBlock'
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
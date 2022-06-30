<script setup lang="ts">
import { ParagraphBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: ParagraphBlock
}>()
</script>

<template>
    <div 
      class="streamfield-paragraph u-spacing o-rte-text"
      v-html="block.value"
    />
</template>
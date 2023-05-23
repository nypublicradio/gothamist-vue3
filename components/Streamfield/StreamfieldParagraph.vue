<script setup lang="ts">
import type { ParagraphBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: ParagraphBlock
}>()
</script>

<template>
  <div class="streamfield-paragraph rte-text" v-html="block.value" />
</template>

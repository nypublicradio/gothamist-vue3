<script setup lang="ts">
import { ParagraphBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: ParagraphBlock
}>()
</script>

<template>
  <div class="streamfield-paragraph mb-5" v-html="block.value" />
</template>

<script setup lang="ts">
import { CodeBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: CodeBlock
}>()
</script>

<template>
  <div class="streamfield-code mb-5" v-html="block.value.code" />
</template>

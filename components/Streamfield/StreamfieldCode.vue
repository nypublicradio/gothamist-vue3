<script setup lang="ts">
import { CodeBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: CodeBlock
}>()
</script>

<template>
    <div
      class="streamfield-code u-spacing"
      :html="block.value.code"
    />
</template>
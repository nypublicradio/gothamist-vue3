<script setup lang="ts">
import { CodeBlock } from '../../composables/data/StreamfieldBlock'
defineProps<{
  block: CodeBlock
}>()
</script>

<template>
    <HtmlFragment
      class="streamfield-code u-spacing"
      :html="block.value.code"
    />
</template>
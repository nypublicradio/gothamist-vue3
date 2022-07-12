<script setup lang="ts">
import { HeadingBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: HeadingBlock
}>()
</script>

<template>
  <div class="streamfield-heading mb-5">
    <h2>{{ block.value }}</h2>
  </div>
</template>

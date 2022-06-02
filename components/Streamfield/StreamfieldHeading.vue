<script setup lang="ts">
import { HeadingBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: HeadingBlock
}>()
</script>

<template>
    <div class="streamfield-heading">
      <h3>{{ block.value }}</h3>
    </div>
</template>
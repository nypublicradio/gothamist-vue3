<script setup lang="ts">
import { EmbedBlock } from '../../composables/data/StreamfieldBlock'
defineProps<{
  block: EmbedBlock
}>()
</script>

<template>
    <div 
      class="streamfield-embed u-spacing o-rte-text"
      v-html="block.value.embed"
    />
</template>
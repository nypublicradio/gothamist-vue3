<script setup lang="ts">
import { EmbedBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: EmbedBlock
}>()
</script>

<template>
  <div class="streamfield-embed mb-5" v-html="block.value.embed" />
</template>

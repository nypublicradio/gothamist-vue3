<script setup lang="ts">
import { CodeBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: CodeBlock
}>()
</script>

<template>
  <div class="streamfield-code mb-7" v-html="block.value.code" />
</template>

<style lang="scss">
.streamfield-code {
  .instagram-media {
    @include media('<lg') {
      margin: auto !important;
    }
  }
}
</style>

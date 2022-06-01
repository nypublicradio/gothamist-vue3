<script setup lang="ts">
import { ImageBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: ImageBlock
}>()
</script>

<template>
  <GothamistImage
    class="streamfield-image"
    :image="block.value.image"
    :width="640"
  />
</template>
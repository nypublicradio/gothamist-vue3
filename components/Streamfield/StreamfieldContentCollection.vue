<script setup lang="ts">
import { ContentCollectionBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: ContentCollectionBlock
}>()
</script>

<template>
  <ContentCollection
    class="streamfield-content-collection mb-5"
    :articles="block.value.pages"
  />
</template>

<script setup lang="ts">
import type { ContentCollectionBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: ContentCollectionBlock
  trackingComponentLocation: string
}>()
</script>

<template>
  <ContentCollection
    class="streamfield-content-collection mb-5"
    :articles="block.value.pages"
    :trackingComponentLocation="trackingComponentLocation"
  />
</template>

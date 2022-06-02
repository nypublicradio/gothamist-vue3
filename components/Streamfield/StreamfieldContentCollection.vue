<script setup lang="ts">
import { ContentCollectionBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: ContentCollectionBlock
}>()
</script>

<template>
    <ContentCollection 
      class="streamfield-content-collection"
      :articles="block.value.pages"
    />
</template>
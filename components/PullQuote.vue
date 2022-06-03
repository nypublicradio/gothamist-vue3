<!-- Placeholder Component-->
<script setup lang="ts">
defineProps<{
  quote: string
  author?: string
}>()
</script>
<template>
    <blockquote>{{ quote }}</blockquote><span v-if="author">{{ author }}</span>
</template>
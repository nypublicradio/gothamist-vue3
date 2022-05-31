<!-- Placeholder Component-->
<script setup lang="ts">
defineProps<{
  quote: string
  author: string
}>()
</script>
<template>
    <blockquote>{{ quote }}</blockquote>-{{ author }}
</template>
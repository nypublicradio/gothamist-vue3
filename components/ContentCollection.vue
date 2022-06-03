<!-- Placeholder Component-->
<script setup lang="ts">
import { ArticlePage } from '../composables/types/Page'

defineProps<{
  articles: ArticlePage[]
}>()
</script>
<template>
    <div v-for="(article) in articles" :key="article.uuid">
      <!-- card here -->
    </div>
</template>
<script setup lang="ts">
  import { fuzzyDateTime } from '../utilities/date'
  const { data } = await findArticlePages("")
  const articles = normalizeFindArticlePagesResponse(data)
</script>

<template>
  <div>
    <h2>Featured Articles</h2>
    <div v-for="article in articles" :key="article.uuid">
      <NuxtLink :to="`/${article.section.slug}`">{{ article.section.name }}</NuxtLink><br>
      <NuxtLink :to="article.link"><b>{{ article.title }}</b></NuxtLink><br>
      <span>{{ article.description }}</span><br>
      <span>{{ fuzzyDateTime(article.publicationDate) }}</span><br>
      <span v-if="article.updatedDate">Updated: {{ fuzzyDateTime(article.updatedDate) }}</span><br>
    </div>  
  </div>
</template>

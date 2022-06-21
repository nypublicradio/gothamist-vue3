<script setup lang="ts">
  import { fuzzyDateTime } from '../utilities/date'

  const articles = await findArticlePages("")
    .then(({data}) => normalizeFindArticlePagesResponse(data))

  onMounted(() => {
    const { $analytics } = useNuxtApp()
    $analytics.sendPageView({ page_type: 'home_page' })
  })
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

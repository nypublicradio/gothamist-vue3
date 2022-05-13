<script setup>
  import { fuzzyDateTime } from '~~/utilities/date'
  const route = useRoute()
  const { data } = await findPage(`${route.params.sectionSlug}/${route.params.articleSlug}`)
  const article = normalizeFindPageResponse(data)
</script>

<template>
  <div>
    <h2>{{ article.title }}</h2>
    <NuxtLink :to="`/${article.section.slug}`">{{article.section.name}}</NuxtLink><br>
    <span>{{ article.description }}</span><br>
    <span>{{ fuzzyDateTime(article.publicationDate) }}</span><br>
    <span v-if="article.updatedDate">Updated: {{ fuzzyDateTime(article.updatedDate) }}</span><br>
  </div>
</template>

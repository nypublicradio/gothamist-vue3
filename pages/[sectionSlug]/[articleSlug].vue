<script setup lang="ts">
  import { ArticlePage } from '../../composables/types/Page'
  import { fuzzyDateTime } from '../../utilities/date'

  const route = useRoute()
  const article = await findPage(`${route.params.sectionSlug}/${route.params.articleSlug}`)
    .then(({data}) => normalizeFindPageResponse(data)) as ArticlePage
</script>

<template>
  <div>
    <h2>{{ article.title }}</h2>
    <NuxtLink :to="`/${article.section.slug}`">{{article.section.name}}</NuxtLink><br>
    <span>{{ article.description }}</span><br>
    <span>{{ fuzzyDateTime(article.publicationDate) }}</span><br>
    <span v-if="article.updatedDate">Updated: {{ fuzzyDateTime(article.updatedDate) }}</span><br>
    <VStreamfield :streamfieldBlocks="article.body" />
  </div>
</template>

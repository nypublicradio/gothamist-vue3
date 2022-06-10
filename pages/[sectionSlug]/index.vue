<script setup lang="ts">
  import { fuzzyDateTime } from '~~/utilities/date';

  const route = useRoute()
  const { title:sectionTitle, id:sectionId } = await findPage(route.params.sectionSlug as string) 
    .then(({data}) => normalizeFindPageResponse(data))
  const articles  =  await findArticlePages({ descendant_of: sectionId })
    .then(({data}) => normalizeFindArticlePagesResponse(data))

  onMounted(() => {
    const { $analytics } = useNuxtApp()
    $analytics.sendPageView({ page_type: 'section_page' })
  })
</script> 

<template>
  <div>
    <h1>{{ sectionTitle }}</h1>
    <div v-for="article in articles" :key="article.uuid">
      <NuxtLink :to="`/${article.section.slug}`">{{article.section.name}}</NuxtLink><br>
      <NuxtLink :to="article.link"><b>{{ article.title }}</b></NuxtLink><br>
      <span>{{ article.description }}</span><br>
      <span>{{ fuzzyDateTime(article.publicationDate) }}</span><br>
      <span v-if="article.updatedDate">Updated: {{ fuzzyDateTime(article.updatedDate) }}</span><br>
      <ul>
        <li v-for="tag in article.tags" :key="tag.slug"><NuxtLink :to='`/tags/${tag.slug}`'>{{ tag.name }}</NuxtLink></li>
      </ul>
    </div>
  </div>
</template>

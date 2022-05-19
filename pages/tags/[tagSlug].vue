<script setup lang="ts">
import { TagPage } from '~~/composables/data/types';
import { fuzzyDateTime } from '~~/utilities/date';
    const route = useRoute()
    const tagSlug = route.params.tagSlug
    const { data:tagPageData, error } = await findPage(`tags/${tagSlug}`)
    const curatedTagPage = tagPageData?.value ?
      normalizeFindPageResponse(tagPageData) as TagPage
      : undefined
    const { data:articleData } = await findArticlePages({tag_slug: tagSlug, limit:12, offset:0})
    const articles = normalizeFindArticlePagesResponse(articleData)
    const tagName = articles.length 
      ?
      articles[0].tags.find(tag => tag.slug === tagSlug)?.name
      : tagSlug
</script> 

<template>
  <div>
    <h1>{{ tagName  }}</h1>
    <div v-for="article in articles" :key="article.uuid">
      <div v-if="curatedTagPage?.topPageZone">
        <pre>{{curatedTagPage.topPageZone}}</pre>
      </div>
      <NuxtLink :to="`/${article.section.slug}`">{{article.section.name}}</NuxtLink><br>
      <NuxtLink :to="article.link"><b>{{ article.title }}</b></NuxtLink><br>
      <span>{{ article.description }}</span><br>
      <span>{{ fuzzyDateTime(article.publicationDate) }}</span><br>
      <span v-if="article.updatedDate">Updated: {{ fuzzyDateTime(article.updatedDate) }}</span><br>
      <ul>
        <li v-for="tag in article.tags" :key="tag.slug"><NuxtLink :to='`/tags/${tag.slug}`'>{{tag.name}}</NuxtLink></li>
      </ul>

    </div>
  </div>
</template>
  
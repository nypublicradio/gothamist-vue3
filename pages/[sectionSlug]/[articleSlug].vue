<script setup lang="ts">
  import { ArticlePage } from '../../composables/types/Page'
  import { fuzzyDateTime } from '../../utilities/date'

  const route = useRoute()
  const { $analytics, $htlbid } = useNuxtApp()
  const article = await findPage(`${route.params.sectionSlug}/${route.params.articleSlug}`)
    .then(({data}) => normalizeFindPageResponse(data)) as ArticlePage

  const trackingData = usePageTrackingData(article)
  const adTargetingData = usePageAdTargetingData(article)
  const sensitiveContent = useSensitiveContent()

  onMounted(() => {
    $analytics.sendPageView(trackingData)
    $htlbid.setTargeting(adTargetingData)
    sensitiveContent.value = article.sensitiveContent
  })

  onUnmounted(() => {
    $htlbid.clearTargeting(adTargetingData)
    sensitiveContent.value = false
  })

  function usePageTrackingData(article: ArticlePage): Record<string, any> {
    return {
      page_type: 'article',
      article_authors: article.authors.map(author => author.name).join(','),
      article_publish_date: article.publicationDate,
      article_updated_date: article.updatedDate,
      article_tags: article.tags.map(tag => tag.slug).join(','),
      article_title: article.title,
      article_primary_tag: article.tags[0]?.slug
    }
  }

  function usePageAdTargetingData(article: ArticlePage):Record<string, any> {
    return {
      Template: 'Article',
      tags: article?.tags?.map(tag => tag.name),
      racy: article?.provocativeContent ? 'true' : '',
      Sponsor: article?.sponsors?.map(tag => tag.name),
      Category: article?.section.name
    }
  }
</script>

<template>
  <div v-if="article">
    <h2>{{ article.title }}</h2>
    <NuxtLink :to="`/${article.section.slug}`">{{article.section.name}}</NuxtLink><br>
    <span>{{ article.description }}</span><br>
    <span>{{ fuzzyDateTime(article.publicationDate) }}</span><br>
    <span v-if="article.updatedDate">Updated: {{ fuzzyDateTime(article.updatedDate) }}</span><br>
    <VStreamfield :streamfieldBlocks="article.body" />
  </div>
</template>

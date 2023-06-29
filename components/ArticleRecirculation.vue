<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUpdateCommentCounts } from '~~/composables/comments';
import { ArticlePage } from '~~/composables/types/Page';

const props = withDefaults(defineProps<{
  // the article to filter out from the results if it exists
  article?: ArticlePage
  slug?: string
  trackingComponentLocation?: string
  nativoId?: string
}>(), {
  article: null,
  slug: 'news',
  trackingComponentLocation: "Recirculation Module",
  nativoId: ""
})

const trackingComponent = "Recirculation Module"

const routeSectionSlug = ref(props.slug)
const { title: sectionTitle, id: sectionId } = await findPage(
  routeSectionSlug.value as string
).then(({ data }) => normalizeFindPageResponse(data))

const articles = await findArticlePages({
  sponsored_content: false,
  descendant_of: sectionId,
  limit: 6,
}).then(({ data }) => data.value.items)

// remove the current article from the list of articles
const articlesFiltered = articles.filter(
  (article) => article.id !== props.article?.id
)

onMounted(async () => {
  await useUpdateCommentCounts(articles)
})
</script>

<template>
  <LeftFeature
    class="recirculation"
    :collection="{data: articlesFiltered}"
    trackingComponent="Recirculation Module"
    trackingComponentLocation="Recirculation Module"
    :nativoId="nativoId"
  />
</template>

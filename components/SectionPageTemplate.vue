<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { useUpdateCommentCounts } from '~~/composables/comments'
import { Page } from '~~/composables/types/Page'

const props = defineProps<{
  page: Page
}>()
const route = useRoute()

const initialStoryCount = ref(10)
const loadMoreStoryCount = ref(10)
const featuredStoryCount = ref(5)
const pageTitle = `${props.page.title} | Gothamist | News For New Yorkers`

useHead({
  title: pageTitle,
  meta: [{ property: 'og:title', content: pageTitle }],
})
const initialArticles = await findArticlePages({
  sponsored_content: false,
  descendant_of: props.page.id,
  offset: featuredStoryCount.value,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))
const articles = ref(initialArticles)
const loadMoreArticles = async () => {
  const newArticles = await useLoadMoreArticles({
    sponsored_content: false,
    limit: loadMoreStoryCount.value,
    offset: articles.value.length + featuredStoryCount.value,
    descendant_of: props.page.id,
  })
  articles.value.push(...newArticles)
}
const { $analytics } = useNuxtApp()
onMounted(() => {
  useUpdateCommentCounts(articles.value)
})
const newsletterSubmitEvent = () => {
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Footer - Newsletter',
    component: 'footer',
    event_label: 'Newsletter',
  })
}
</script>

<template>
  <section class="section-page">
    <div class="content">
      <h1 class="mb-5">{{ page.title }}</h1>
      <hr class="black" />
      <!-- featured area -->
      <h2 class="sr-only">Featured {{ page.title }} Stories</h2>
      <article-recirculation
        :slug="(route?.params?.sectionSlug as string)"
        id="article-recirculation"
        class="my-6"
      />
      <div class="mb-6">
        <HtlAd layout="rectangle" slot="htlad-gothamist_interior_midpage_1" />
      </div>
      <!-- articles -->
      <div v-if="articles" class="grid gutter-x-xl">
        <h2 class="sr-only">Latest {{ page.title }} Articles</h2>
        <div class="col-1 hidden xl:block"></div>
        <div class="col">
          <div
            v-for="(article, index) in articles"
            :key="`${article.id}-${index}`"
          >
            <gothamist-card
              :article="article"
              class="mod-horizontal mb-5"
              :width="318"
              :height="212"
              :trackClicks="true"
              trackingComponentLocation="Section Page River"
              trackingComponent="Section Page River"
              :trackingComponentPosition="index + 1"
            >
              <p>
                {{ article.description }}
              </p>
              <v-card-metadata :article="article" />
            </gothamist-card>
            <hr class="mb-5" />
          </div>
          <Button
            class="p-button-rounded mb-8"
            label="Load More"
            @click="loadMoreArticles"
          >
          </Button>
        </div>
        <div class="col-fixed mx-auto hidden xl:block">
          <HtlAd layout="rectangle" slot="htlad-gothamist_interior_river" />
        </div>
      </div>
      <!-- newsletter -->
      <div class="mt-8 mb-5">
        <hr class="black mb-4" />
        <newsletter-home @submit="newsletterSubmitEvent" />
      </div>
    </div>
  </section>
</template>

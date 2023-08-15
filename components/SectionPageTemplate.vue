<script setup lang="ts">
import { useUpdateCommentCounts } from '~~/composables/comments'
import { Page } from '~~/composables/types/Page'
import { nextTick } from 'vue'

const props = defineProps<{
  page: Page
}>()
const route = useRoute()
const config = useRuntimeConfig()
const sectionSlug = computed(() => route?.params?.sectionSlug as string)
const loadMoreStoryCount = ref(10)
const loadMoreContainer = ref('#articleList')
const featuredStoryCount = ref(5)
const pageTitle = `${props.page.title} | Gothamist | News For New Yorkers`

useHead({
  title: pageTitle,
})
useServerHead({
  meta: [{ property: 'og:title', content: pageTitle }],
  link: [{ rel: 'canonical', href: `https://${config.public.CANONICAL_HOST}/${sectionSlug}`}]
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
  await nextTick()
  if (newArticles.length) {
    ([...document.querySelectorAll(`${loadMoreContainer.value} .v-card .card-title-link`)]
      .slice(-newArticles.length)[0] as HTMLElement).focus()
  }
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
        :slug="sectionSlug"
        id="article-recirculation"
        trackingComponentLocation="Section Page Recirculation Module"
        class="my-6"
        :nativoId="`ntv-section-1`"
      />
      <div class="mb-6">
        <HtlAd layout="rectangle" slot="htlad-gothamist_interior_midpage_1" />
      </div>
      <!-- articles -->
      <div id="articleList" v-if="articles" class="grid gutter-x-xl section-river">
        <h2 class="sr-only">Latest {{ page.title }} Articles</h2>
        <div class="col-1 hidden xl:block"></div>
        <div class="col">
          <div
            v-for="(article, index) in articles"
            :key="`${article.id}-${index}`"
          >
            <gothamist-card
              v-slot="card"
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
              <v-card-metadata
                :article="article"
                @link-click="$event => card.trackClick($event)"
              />
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

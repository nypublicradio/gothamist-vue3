<script setup lang="ts">
import { TagPage } from '../../composables/types/Page'
import { StreamfieldBlock, ContentCollectionBlock } from '../../composables/types/StreamfieldBlock'
import { useUpdateCommentCounts } from '~~/composables/comments';
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import { nextTick } from 'vue'

/* preview */
import { usePreviewData } from '~/composables/states'
const previewData = usePreviewData()
const route = useRoute()
const isPreview = route.query.preview ? true : false
/* preview */

const { $analytics, $htlbid } = useNuxtApp()
const tagSlug = isPreview ? previewData.value.slug : route.params.tagSlug
const initialStoryCount = ref(10)
const loadMoreStoryCount = ref(10)
const loadMoreContainer = ref('#articleList')
const curatedTagPagePromise = isPreview
  ? previewData.value.data
  : findPage(`tags/${tagSlug}`).then(
      ({ data }) => data?.value && (normalizeFindPageResponse(data) as TagPage)
    )
const articlesPromise = findArticlePages({
  limit: initialStoryCount.value,
  tag_slug: tagSlug,
}).then(({ data }) => ({
  articles: normalizeFindArticlePagesResponse(data),
  count: data.value && Number(data.value.meta.totalCount)
}))

const [curatedTagPage, {articles: initialArticles, count: initalCount}] = await Promise.all([
  curatedTagPagePromise,
  articlesPromise,
])
const articleTotal = ref(initalCount)
const articles = ref(initialArticles)

const loadMoreArticles = async () => {
  const newArticles = await useLoadMoreArticles({
    limit: loadMoreStoryCount.value,
    offset: articles.value.length,
    tag_slug: tagSlug,
  })
  articles.value.push(...newArticles)
  await nextTick()
  if (newArticles.length) {
    ([...document.querySelectorAll(`${loadMoreContainer.value} .v-card .card-title-link`)]
      .slice(-newArticles.length)[0] as HTMLElement).focus()
  }
}

const tagName =
  articles[0]?.tags.find((tag) => tag.slug === tagSlug)?.name || tagSlug

onMounted(() => {
  $analytics.sendPageView({
    page_type: 'tag_page',
    content_group: 'tag-page'
  })
  $htlbid.setTargeting({ Template: 'Tag' })

  function getPagesFromZone(zone: StreamfieldBlock[]) {
    if (!zone) {
      return []
    }
    return zone.filter(block => block.type === "content_collection")
    .reduce((pages, collection: ContentCollectionBlock) => [...pages, ...collection.value.pages], [])
  }
  const topPageArticles = getPagesFromZone(curatedTagPage?.topPageZone)
  const midPageArticles = getPagesFromZone(curatedTagPage?.midPageZone)
  const allArticles = [...articles.value, ...topPageArticles, ...midPageArticles]
  useUpdateCommentCounts(allArticles)
})

onUnmounted(() => {
  $htlbid.clearTargeting({ Template: 'Tag' })
})

const newsletterSubmitEvent = () => {
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Footer - Newsletter',
    component: 'footer',
    event_label: 'Newsletter',
  })
}

const pageTitle = `Articles about ${tagName} | Gothamist`
useHead({
  title: curatedTagPage?.seoTitle || pageTitle,
  meta: [{ property: 'og:title', content: curatedTagPage?.socialTitle || pageTitle}]
})
</script>

<template>
  <div>
    <section class="tag-page-header py-1">
      <h1 class="m-3 lg:m-5 header-text">
        {{ curatedTagPage?.title || tagName }}
      </h1>
    </section>
    <section v-if="curatedTagPage?.headerImage" class="tag-page-header-image">
      <v-image-with-caption
        loading="eager"
        :image="useImageUrl(curatedTagPage.headerImage)"
        :width="1440"
        :height="288"
        :sizes="[1]"
        :alt-text="curatedTagPage.headerImage?.alt"
        :maxWidth="curatedTagPage.headerImage?.width"
        :maxHeight="curatedTagPage.headerImage?.height"
        :ratio="[5, 1]"
      />
    </section>
    <section
      v-if="curatedTagPage?.topPageZone.length"
      class="tag-page-top-zone"
    >
      <div class="content mt-0 lg:mt-3">
        <div class="grid gutter-x-30">
          <div class="col">
            <v-streamfield
              :streamfield-blocks="curatedTagPage.topPageZone"
              trackingComponentLocation="Tag Page Top Curated Zone"
              class="pt-4 lg:pt-6"
            />
          </div>
          <div class="col-fixed col-fixed-width-330 hidden xl:block"></div>
        </div>
      </div>
      <HtlAd layout="rectangle" slot="htlad-gothamist_interior_midpage_1" />
    </section>
    <section class="block xl:hidden">
      <div
        class="content"
        :class="curatedTagPage?.topPageZone.length ? 'py-0' : 'pb-0'"
      ></div>
    </section>
    <section v-if="articles">
      <div class="content">
        <div id="articleList" class="grid gutter-x-30 tag-river">
          <h2 class="sr-only">Latest Articles Tagged "{{ tagName }}"</h2>
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
                trackingComponentLocation="Tag Page River"
                trackingComponent="Tag Page River"
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
              <!-- mid page zone should go after the third article -->
              <div
                v-if="index === 2 && curatedTagPage?.midPageZone"
                class="tag-page-mid-zone my-8"
              >
                <v-streamfield
                  :streamfield-blocks="curatedTagPage.midPageZone"
                  trackingComponentLocation="Tag Page Middle Curated Zone"
                />
              </div>
            </div>
            <Button
              v-if="articles.length < articleTotal"
              class="p-button-rounded"
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
  </div>
</template>

<style lang="scss">
.tag-page-header {
  background: var(--black);
  .header-text {
    text-transform: uppercase;
    padding: 0.2rem 0rem;
    font-size: var(--font-size-16);
    line-height: var(--font-size-17);
    color: var(--soybean);
    white-space: normal;
    text-align: center;
    @include media('<md') {
      font-size: var(--font-size-10);
      line-height: var(--font-size-10);
    }
  }
}

.tag-page-top-zone .streamfield {
  border-top: 1px solid var(--black);
}

.tag-page-top-zone .streamfield p {
  font-size: var(--font-size-6);
  line-height: var(--font-size-9);
}
</style>

<script setup lang="ts">
import { useUpdateCommentCounts } from '~~/composables/comments'
import { ArticlePage } from '~~/composables/types/Page'
import { computed, ref, nextTick } from 'vue'

const riverStoryCount = ref(6)
const riverAdOffset = ref(2)
const riverAdRepeatRate = ref(6)
const riverContainer = ref('#latest')

const articlesPromise = findArticlePages({
  limit: riverStoryCount.value,
  sponsored_content: false,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))

const homePageCollectionsPromise = findPage('/').then(({ data }) => {
  return data.value.pageCollectionRelationship.map((collection) => {
    return {
      id: collection.id,
      layout: collection.layout,
      label: collection.label,
      data: collection.pages,
    }
  })
})

const [articles, homePageCollections] = await Promise.all([
  articlesPromise,
  homePageCollectionsPromise,
])
// the latest articles
const latestArticles = ref([...articles])

// the home page featured article should display only the first story in the home page content collection
const featuredArticle = normalizeArticlePage(homePageCollections?.[0].data?.[0])

const riverSegments = computed(() => {
  let riverCopy = latestArticles.value.slice()
  const segments = [] as ArticlePage[][]
  while (riverCopy.length) {
    segments.push(riverCopy.splice(0, riverStoryCount.value))
  }
  return segments
})

const loadMoreArticles = async () => {
  const newArticles = await useLoadMoreArticles({
    sponsored_content: false,
    limit: riverStoryCount.value,
    offset: latestArticles.value.length,
  })
  latestArticles.value.push(...newArticles)
  await nextTick()
  if (newArticles.length) {
    ([...document.querySelectorAll(`${riverContainer.value} .v-card .card-title-link`)]
      .slice(-newArticles.length)[0] as HTMLElement).focus()
  }
}

const { $analytics } = useNuxtApp()
const newsletterSubmitEvent = () => {
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Footer - Newsletter',
    component: 'footer',
    event_label: 'Newsletter',
  })
}
const navigation = useNavigation()

onMounted(() => {
  $analytics.sendPageView({
    page_type: 'home_page',
    content_group: 'homepage'
  })
  const collectionArticles = homePageCollections.reduce(
    (pages, collection) => [...pages, ...collection.data],
    []
  )
  const allArticles = [...articles, ...collectionArticles]
  useUpdateCommentCounts(allArticles)
})

const loadedNativoElements = []
const nativoSectionLoaded = (name) => {
  loadedNativoElements.push(name)
  if (
    loadedNativoElements.includes('ntv-stream-3') &&
    loadedNativoElements.includes('ntv-latest-1')
  ) {
    loadedNativoElements.length = 0
    if (typeof PostRelease !== 'undefined') {
      PostRelease.Start()
    }
  }
}
</script>

<template>
  <div>
    <section>
      <div class="content pt-1">
        <gothamist-homepage-topper
          :articles="[featuredArticle, ...latestArticles]"
          :navigation="navigation"
          @vue:mounted="nativoSectionLoaded('ntv-latest-1')"
        />
        <!-- newsletter -->
        <div class="mt-8">
          <hr class="black mb-4" />
          <newsletter-home
            source="gothamist_home"
            @submit="newsletterSubmitEvent"
          />
        </div>
      </div>
      <!-- home page collections -->
      <template v-if="homePageCollections && homePageCollections.length > 0">
        <template
          v-for="(collection, index) in homePageCollections"
          :key="`${collection.id}-${collection.data[0].id}`"
        >
          <single-story-feature
            v-if="collection.layout === 'single-story-feature'"
            :trackingComponentLocation="`Homepage Curation Module ${index + 1}`"
            :collection="collection"
          />
          <center-feature
            class="content"
            v-if="collection.layout === 'center-feature'"
            :trackingComponentLocation="`Homepage Curation Module ${index + 1}`"
            :collection="collection"
          />
          <skyline-feature
            class="content"
            v-if="collection.layout === 'skyline'"
            :trackingComponentLocation="`Homepage Curation Module ${index + 1}`"
            :collection="collection"
          />
          <div v-if="index === 0" id="ntv-stream-2"></div>
        </template>
      </template>
      <!-- If no homepage collections still include the nativo div -->
      <div v-else id="ntv-stream-2"></div>
      <boroughs class="mb-5 lg:mb-8" />
      <!-- river -->

      <div class="content">
        <template v-if="articles">
          <hr class="mb-4 black" />
          <div id="latest">
            <div
              v-for="(riverSegment, segmentIndex) in riverSegments"
              :key="riverSegment.map((article) => article.uuid).join('-')"
              class="grid gutter-x-xl"
            >
              <div class="col-12 xxl:col-1 type-label3">
                <div
                  v-if="segmentIndex === 0"
                  role="heading"
                  aria-level="2"
                >
                  LATEST
                </div>
              </div>
              <div class="col">
                <div
                  v-for="(article, itemIndex) in riverSegment.slice(
                    0,
                    riverStoryCount
                  )"
                  :key="article.uuid"
                >
                  <gothamist-card
                    v-slot="card"
                    :article="article"
                    :id="itemIndex === 1 ? 'ntv-stream-3' : ''"
                    class="mod-horizontal mb-3 lg:mb-5 tag-small"
                    :width="318"
                    :height="212"
                    @vue:mounted="
                      itemIndex === 1 && nativoSectionLoaded('ntv-stream-3')
                    "
                    :trackClicks="true"
                    trackingComponentLocation="Homepage River"
                    trackingComponent="Homepage River"
                    :trackingComponentPosition="(segmentIndex + 1) * riverStoryCount + itemIndex + 1"
                  >
                    <p class="desc">
                      {{ article.description }}
                    </p>
                    <v-card-metadata
                      :article="article"
                      @link-click="$event => card.trackClick($event)"
                    />
                  </gothamist-card>
                  <hr class="mb-5" />
                  <div
                    v-if="(itemIndex + riverAdOffset) % riverAdRepeatRate === 0"
                    class="xl:hidden"
                  >
                    <HtlAd
                      slot="htlad-gothamist_index_river"
                      layout="rectangle"
                    />
                    <hr class="mb-5" />
                  </div>
                </div>
              </div>
              <div class="col-fixed hidden xl:block mx-auto">
                <HtlAd slot="htlad-gothamist_index_river" layout="rectangle" />
              </div>
            </div>
            <div class="grid gutter-x-xl">
              <div class="col-12 xxl:col-1"></div>
              <div class="col">
                <Button
                  class="p-button-rounded"
                  label="Load More"
                  @click="loadMoreArticles"
                >
                </Button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

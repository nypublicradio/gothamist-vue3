<script setup lang="ts">
import { computed, nextTick, ref, toValue } from 'vue'
import { useUpdateCommentCounts } from '~~/composables/comments'
import type { ArticlePage } from '~~/composables/types/Page'

const { $features } = useNuxtApp()
const possibleDuplicateCount = ref(6) // from the topper
const actualDuplicateCount = ref(4)
const riverStoryCount = ref(6)
const riverAdOffset = ref(2)
const riverAdRepeatRate = ref(6)
const riverContainer = ref('#latest')

let findArticleLimit
if ($features.enabled['experiment-deduplicate-river'])
  findArticleLimit = riverStoryCount.value + possibleDuplicateCount.value
else
  findArticleLimit = riverStoryCount.value

const articlesPromise = findArticlePages({
  limit: findArticleLimit,
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

// the home page featured article should display only the first and second story in the home page content collection
const featuredArticles = homePageCollections?.[0].data.map(normalizeArticlePage)

actualDuplicateCount.value = 4
const firstFour = articles.slice(0, 6).map(article => article.uuid)
if (firstFour.includes(featuredArticles[0].uuid))
  actualDuplicateCount.value += 1
if (firstFour.includes(featuredArticles[1].uuid))
  actualDuplicateCount.value += 1

const filteredLatestArticles = computed(() => {
  if (toValue(latestArticles))
    return [...toValue(latestArticles)].slice(actualDuplicateCount.value)
  else
    return []
})

const riverArticles = $features.enabled['experiment-deduplicate-river']
  ? filteredLatestArticles
  : latestArticles

const mainImage = featuredArticles?.[0]?.listingImage
if (mainImage) {
  usePreloadResponsiveImage(
    useImageUrl(mainImage, {
      width: 700,
      height: 467,
      quality: 80,
    }),
    useResponsiveSrcset(mainImage, [1], {
      width: 700,
      height: 467,
      quality: 80,
    }),
  )
}

const riverSegments = computed(() => {
  const riverCopy = riverArticles.value.slice()
  const segments = [] as ArticlePage[][]
  while (riverCopy.length >= 6)
    segments.push(riverCopy.splice(0, riverStoryCount.value))

  return segments
})

async function loadMoreArticles() {
  let loadMoreOffset
  if ($features.enabled['experiment-deduplicate-river'])
    loadMoreOffset = latestArticles.value.length + actualDuplicateCount.value
  else
    loadMoreOffset = latestArticles.value.length

  const newArticles = await useLoadMoreArticles({
    sponsored_content: false,
    limit: riverStoryCount.value,
    offset: loadMoreOffset,
  })
  latestArticles.value.push(...newArticles)
  await nextTick()
  if (newArticles.length) {
    ([...document.querySelectorAll(`${riverContainer.value} .v-card .card-title-link`)]
      .slice(-newArticles.length)[0] as HTMLElement).focus()
  }
}

const { $analytics, $nativo } = useNuxtApp()
function newsletterSubmitEvent() {
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Footer - Newsletter',
    component: 'footer',
    event_label: 'Newsletter',
  })
}
const navigation = useNavigation()

useChartbeat()
useOptinMonster()

onMounted(() => {
  $analytics.sendPageView({
    page_type: 'home_page',
    content_group: 'homepage',
  })
  const collectionArticles = homePageCollections.reduce(
    (pages, collection) => [...pages, ...collection.data],
    [],
  )
  const allArticles = [...articles, ...collectionArticles]
  useUpdateCommentCounts(allArticles)
})

const loadedNativoElements = []
function nativoSectionLoaded(name) {
  loadedNativoElements.push(name)
  if (
    loadedNativoElements.includes('ntv-stream-3')
    && loadedNativoElements.includes('ntv-latest-1')
  ) {
    loadedNativoElements.length = 0
    $nativo.refresh()
  }
}
</script>

<template>
  <div>
    <section>
      <div class="content homepage pt-1">
        <gothamist-homepage-topper
          :feature-large="featuredArticles[0]"
          :feature-medium="featuredArticles[1]"
          :latest-articles="articles"
          tracking-component-location=""
          @vue:mounted="nativoSectionLoaded('ntv-latest-1')"
        />
        <!-- newsletter -->
        <div class="mt-8">
          <hr class="black mb-4">
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
            :tracking-component-location="`Homepage Curation Module ${index + 1}`"
            :collection="collection"
          />
          <left-feature
            v-if="collection.layout === 'left-feature'"
            class="content left-feature"
            :tracking-component-location="`Homepage Curation Module ${index + 1}`"
            :collection="collection"
          />
          <center-feature
            v-if="collection.layout === 'center-feature'"
            class="content center-feature"
            :tracking-component-location="`Homepage Curation Module ${index + 1}`"
            :collection="collection"
          />
          <skyline-feature
            v-if="collection.layout === 'skyline'"
            class="content skyline"
            :tracking-component-location="`Homepage Curation Module ${index + 1}`"
            :collection="collection"
          />
          <div v-if="index === 0" id="ntv-stream-2" />
        </template>
      </template>
      <!-- If no homepage collections still include the nativo div -->
      <div v-else id="ntv-stream-2" />
      <boroughs class="mb-5 lg:mb-8" />
      <!-- river -->

      <div id="articleList" class="content">
        <template v-if="articles">
          <hr class="mb-4 black">
          <div id="latest">
            <div
              v-for="(riverSegment, segmentIndex) in riverSegments"
              :key="riverSegment.map((article) => article.uuid).join('-')"
              class="grid gutter-x-xl latest-segment"
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
                    riverStoryCount,
                  )"
                  :key="article.uuid"
                >
                  <gothamist-card
                    :id="itemIndex === 1 ? 'ntv-stream-3' : ''"
                    v-slot="card"
                    :article="article"
                    class="mod-horizontal mb-3 lg:mb-5 tag-small"
                    :width="318"
                    :height="212"
                    :track-clicks="true"
                    tracking-component-location="Homepage River"
                    tracking-component="Homepage River"
                    :tracking-component-position="(segmentIndex + 1) * riverStoryCount + itemIndex + 1"
                    @vue:mounted="
                      itemIndex === 1 && nativoSectionLoaded('ntv-stream-3')
                    "
                  >
                    <p class="desc">
                      {{ article.description }}
                    </p>
                    <v-card-metadata
                      :article="article"
                      @link-click="$event => card.trackClick($event)"
                    />
                  </gothamist-card>
                  <hr class="mb-5">
                  <div
                    v-if="(itemIndex + riverAdOffset) % riverAdRepeatRate === 0"
                    class="xl:hidden"
                  >
                    <HtlAd
                      slot-name="htlad-gothamist_index_river"
                      layout="rectangle"
                    />
                    <hr class="mb-5">
                  </div>
                </div>
              </div>
              <div class="col-fixed hidden xl:block mx-auto">
                <HtlAd slot-name="htlad-gothamist_index_river" layout="rectangle" />
              </div>
            </div>
            <div class="grid gutter-x-xl">
              <div class="col-12 xxl:col-1" />
              <div class="col">
                <Button
                  class="p-button-rounded"
                  label="Load More"
                  @click="loadMoreArticles"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.homepage {
  .homepage-topper-latest {
    content-visibility: auto;
    contain-intrinsic-size: auto 842px;
    @include media('>=md') {
      contain-intrinsic-size: auto 936px;
    }
    @include media('>=lg') {
      contain-intrinsic-size: auto 737px;
    }
  }
  .newsletter-home {
    content-visibility: auto;
    contain-intrinsic-size: auto 278px;
    @include media('>=md') {
      contain-intrinsic-size: auto 209px;
    }
    @include media('>=lg') {
      contain-intrinsic-size: auto 218px;
    }
  }
  .left-feature {
    content-visibility: auto;
    contain-intrinsic-size: auto 1155px;
    @include media('>=md') {
      contain-intrinsic-size: auto 1506px;
    }
    @include media('>=lg') {
      contain-intrinsic-size: auto 969px;
    }
  }
  .boroughs {
    content-visibility: auto;
    contain-intrinsic-size: auto 462px;
    @include media('>=md') {
      contain-intrinsic-size: auto 326px;
    }
    @include media('>=lg') {
      contain-intrinsic-size: auto 413px;
    }
  }
  .latest-segment {
    content-visibility: auto;
    contain-intrinsic-size: auto 1800px;
  }
}
</style>

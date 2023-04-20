<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

const route = useRoute()
const { $analytics } = useNuxtApp()
const querySlug = ref(route.query.q)
const query = ref(querySlug.value || '')

let articles = ref(
  await searchArticlePages({ q: querySlug.value }).then(({ data }) =>
    normalizeSearchArticlePagesResponse(data)
  )
)
const articlesToShow = ref(10)
const loadMoreContainer = ref('#resultList')
const isSearching = ref(false)

async function getSearchResults() {
  if (query.value) await navigateTo({ query: { q: query.value } })
  isSearching.value = true
  articles.value = await searchArticlePages({ q: query.value }).then(
    ({ data }) => normalizeSearchArticlePagesResponse(data)
  )
  $analytics.sendEvent('event_tracking', {
    event_category: 'search query',
    content_group: 'search',
    component: 'search page',
    event_label: `${query.value}`,
  })
  isSearching.value = false
}

const loadMoreArticles = async () => {
  const topArticle = articlesToShow.value
  articlesToShow.value += 6
  await nextTick()
  if (topArticle < articles.value.length) {
    ([...document.querySelectorAll(`${loadMoreContainer.value} .v-card .card-title-link`)]
      .slice(topArticle)[0] as HTMLElement).focus()
  }
}

const pageTitle = () => querySlug.value ? `Search Results for "${querySlug.value}" | Gothamist` : "Search | Gothamist"

useHead({
  title: pageTitle,
  meta: [{ property: 'og:title', content: pageTitle}]
})

useChartbeat()

onMounted(() => {
  $analytics.sendPageView({ page_type: 'search_page' })
  getSearchResults()
})

// watch for a route change coming from the SearchButton component.
watch(route, (value) => {
  query.value = value.query.q
  getSearchResults()
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
  <div>
    <div class="search-page">
      <section>
        <div class="content">
          <div class="grid gutter-x-xl">
            <div class="col-1 hidden xxl:block"></div>
            <div class="col">
              <div class="search-page-results pt-2">
                <span v-if="articles">
                  <strong>{{ articles.length }}</strong> results for:
                </span>
              </div>
              <form id="search" class="mt-4 mb-2">
                <input
                  autofocus
                  class="search-page-input"
                  type="text"
                  placeholder="search"
                  aria-label="Search this site"
                  v-model="query"
                  name="q"
                  @keypress.enter.prevent="getSearchResults"
                />
                <Button
                  class="search-page-button p-button-rounded p-button-outlined"
                  :icon="
                    isSearching ? 'pi pi-spin pi-spinner' : 'pi pi-arrow-right'
                  "
                  iconPos="right"
                  @click="getSearchResults"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="content">
          <!-- search results article river -->
          <template v-if="articles">
            <div id="resultList" class="grid gutter-x-xl">
              <div class="col-1 hidden xxl:block"></div>
              <div class="col">
                <div
                  v-for="(article, index) in articles.slice(0, articlesToShow)"
                  :key="article.uuid"
                >
                  <gothamist-card
                    v-slot="card"
                    :article="article"
                    class="mod-horizontal mb-3 lg:mb-5 tag-small"
                    :width="318"
                    :height="212"
                    :trackClicks="true"
                    trackingComponentLocation="Search Results"
                    trackingComponent="Search Results"
                    :trackingComponentPosition="index + 1"
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
                </div>
                <Button
                  v-if="articlesToShow < articles.length"
                  class="p-button-rounded"
                  label="Load More"
                  @click="loadMoreArticles"
                >
                </Button>
              </div>
              <div class="col-fixed mx-auto hidden xl:block">
                <HtlAd
                  layout="rectangle"
                  slot="htlad-gothamist_interior_river"
                />
              </div>
            </div>
          </template>
          <!-- newsletter -->
          <div class="mt-8 mb-5">
            <hr class="black mb-4" />
            <newsletter-home @submit="newsletterSubmitEvent" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
.search {
  form {
    max-width: 894px;
    width: 100%;
    position: relative;
  }
  .v-card {
    background: transparent;
  }
  .search-page-input {
    border: none;
    border-bottom: solid 2px var(--black);
    width: 100%;
    background: transparent;
    display: inline-flex;
    justify-content: center;
    font-weight: 700;
    text-transform: uppercase;
    box-shadow: none;
    font-size: var(--font-size-17);
    line-height: var(--font-size-17);
    transition: var(--transition-duration);
    padding-right: 50px;
    @include media('<md') {
      font-size: var(--font-size-14);
      line-height: var(--font-size-14);
    }
    &:focus {
      outline: none;
      border-bottom: solid 2px var(--soybean);
    }
  }
  .search-page-button {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    padding: 0;
    border-radius: 20px !important;
    height: 1.4rem !important;
    width: 2rem !important;
    .pi {
      font-size: 0.75rem;
      margin: auto;
    }
  }
  .search-page-results {
    font-size: var(--font-size-6);
    line-height: var(--font-size-6);
    font-weight: 400;
    text-transform: uppercase;
    text-align: left;
    border-top: solid 1px var(--black);
    font-family: var(--font-family-header);
    @include media('>lg') {
      font-size: var(--font-size-6);
      line-height: var(--font-size-6);
    }
  }
}
</style>

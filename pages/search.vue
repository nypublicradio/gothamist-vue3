<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'
import useImageUrl from '~~/composables/useImageUrl'

const route = useRoute()
const { $analytics } = useNuxtApp()
const querySlug = route.query.q
const query = ref(querySlug || '')
const sensitiveContent = useSensitiveContent()

let articles = ref(
  await searchArticlePages({ q: querySlug }).then(({ data }) =>
    normalizeSearchArticlePagesResponse(data)
  )
)
const articlesToShow = ref(10)
const isSearching = ref(false)

async function getSearchResults() {
  isSearching.value = true
  articles.value = await searchArticlePages({ q: query.value }).then(
    ({ data }) => normalizeSearchArticlePagesResponse(data)
  )
  isSearching.value = false
}

onMounted(() => {
  $analytics.sendPageView({ page_type: 'search_page' })
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
            <div class="col-1 hidden xl:block"></div>
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
          <!-- <div v-for="(article, index) in articles" :key="index" class="mb-6">
          {{ article }}
        </div> -->
          <template v-if="articles">
            <div class="grid gutter-x-xl">
              <div class="col-1 hidden xl:block"></div>
              <div class="col">
                <div
                  v-for="article in articles.slice(0, articlesToShow)"
                  :key="article.uuid"
                >
                  <v-card
                    class="mod-horizontal mb-3 lg:mb-5 tag-small"
                    :image="useImageUrl(article.listingImage)"
                    :width="318"
                    :height="212"
                    :sizes="[1]"
                    :quality="80"
                    :title="article.listingTitle || article.title"
                    :titleLink="article.link"
                    :maxWidth="article.image?.width"
                    :maxHeight="article.image?.height"
                    :tags="[
                      {
                        name: article.section.name,
                        slug: `/${article.section.slug}`,
                      },
                    ]"
                  >
                    <p class="desc">
                      {{ article.description }}
                    </p>
                    <v-card-metadata :article="article" />
                  </v-card>
                  <hr class="mb-5" />
                </div>
                <Button
                  v-if="articlesToShow < articles.length"
                  class="p-button-rounded"
                  label="Load More"
                  @click="articlesToShow += 6"
                >
                </Button>
              </div>
              <div class="col-fixed mx-auto hidden xl:block">
                <HtlAd layout="rectangle" slot="htlad-gothamist_interior_river" />
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
  background: linear-gradient(
    180deg,
    #f3f3e4 0,
    rgba(255, 255, 255, 0) 720px,
    rgba(255, 255, 255, 0) 100%
  );
  form {
    max-width: 894px;
    width: 100%;
    position: relative;
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

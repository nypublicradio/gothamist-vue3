<script setup lang="ts">
import { nextTick, ref } from 'vue'

// import { StaffPage } from '../../composables/types/Page'
import type { ArticlePage } from '~~/composables/types/Page'
import { CacheControlAgeTime } from '~/composables/types/CacheControlAgeTime'

const { $analytics, $htlbid } = useNuxtApp()
const route = useRoute()
const cacheControlMaxAge = useCacheControlMaxAge()
const config = useRuntimeConfig()
const staffSlug = route.params.staffSlug
// const curatedStaffPage = await findPage(`staff/${staffSlug}`).then(
//   ({ data }) => data?.value && (normalizeFindPageResponse(data) as StaffPage)
// )

const initialStoryCount = ref(12)
const loadMoreStoryCount = ref(12)
const loadMoreContainer = ref('#articleList')

const initialArticles = await findArticlePages({
  author_slug: staffSlug,
  limit: initialStoryCount.value,
  offset: 0,
}).then(({ data }) => ({
  articles: normalizeFindArticlePagesResponse(data),
  count: data.value && Number(data.value.meta.totalCount),
})) as { articles: ArticlePage[], count: number }

const articleTotal = ref(initialArticles.count)
const articles = ref(initialArticles.articles)
if (!articleTotal.value) {
  cacheControlMaxAge.value = CacheControlAgeTime.MONTH
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
    fatal: true,
  })
}

async function loadMoreArticles() {
  const newArticles = await useLoadMoreArticles({
    author_slug: staffSlug,
    limit: loadMoreStoryCount.value,
    offset: articles.value.length,
  })
  articles.value.push(...newArticles)
  await nextTick()
  if (newArticles.length) {
    ([...document.querySelectorAll(`${loadMoreContainer.value} .v-card .card-title-link`)]
      .slice(-newArticles.length)[0] as HTMLElement).focus()
  }
}

// find a match of the slug in the articles' authors array and return the matched author's data
const authorProfileData = articles.value[1]?.authors.find((author) => {
  return author.slug === staffSlug ? author : false
})

// formats the name of the author by manipulating the slug. This is used when authorProfileData returns no data
function getAuthorNameFromSlug() {
  const splitStr = typeof staffSlug === 'string' && staffSlug.toLowerCase().split('-')
  for (let i = 0; i < splitStr.length; i++)
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)

  return splitStr.join(' ')
}

// emitted event from the newsletter submission form
function newsletterSubmitEvent() {
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Footer - Newsletter',
    component: 'footer',
    event_label: 'Newsletter',
  })
}

useChartbeat()
useOptinMonster()
useCacheControlMaxAge().value = 60 * 60 * 1000

onMounted(() => {
  $analytics.sendPageView({ page_type: 'staff_page' })
  $htlbid.setTargeting({ Template: 'Staff' })
})

onUnmounted(() => {
  $htlbid.clearTargeting({ Template: 'Staff' })
})

const authorName = authorProfileData?.name || getAuthorNameFromSlug()
const pageTitle = `Articles by ${authorName} | Gothamist`
useHead({
  title: pageTitle,
})
useServerHead({
  meta: [{ property: 'og:title', content: pageTitle }],
  link: [{ rel: 'canonical', href: `https://${config.public.CANONICAL_HOST}/staff/${staffSlug}` }],
})
</script>

<template>
  <div>
    <section>
      <div class="content">
        <div class="grid gutter-x-30">
          <div class="col-12">
            <h1 class="sr-only">
              {{ authorName }}
            </h1>
            <h2>Articles by {{ authorName }}</h2>
            <hr class="black mt-3 md:mt-6 mb-2">
          </div>
          <div class="col mb-6">
            <author-profile
              v-if="authorProfileData"
              :profile-data="authorProfileData"
              :show-cta="false"
              staff-page
            />
            <div v-else class="h5">
              {{ getAuthorNameFromSlug() }}
            </div>
          </div>
          <div class="col-fixed col-fixed-width-330 hidden xl:block" />
        </div>
        <div id="articleList" class="grid gutter-x-30">
          <div v-if="articles" class="col staff-articles">
            <div
              v-for="(article, index) in articles"
              :key="article.uuid"
            >
              <gothamist-card
                v-slot="card"
                :article="article"
                class="mod-horizontal mb-5"
                :width="318"
                :height="212"
                :track-clicks="true"
                tracking-component-location="Author Page River"
                tracking-component="Author Page River"
                :tracking-component-position="index + 1"
              >
                <p>
                  {{ article.description }}
                </p>
                <v-card-metadata
                  :article="article"
                  @link-click="$event => card.trackClick($event)"
                />
              </gothamist-card>
              <hr class="mb-5">
            </div>
          </div>
          <p v-else class="col">
            No articles available
          </p>
          <div class="col-fixed col-fixed-width-330 hidden xl:block">
            <HtlAd
              slot-name="htl-gothamist_interior_midpage_1"
              layout="rectangle"
              fineprint="Gothamist is funded by sponsors and member donations"
            />
          </div>
        </div>
        <div class="block xl:hidden mb-4">
          <HtlAd
            slot-name="htl-gothamist_interior_midpage_2"
            layout="rectangle"
            fineprint="Gothamist is funded by sponsors and member donations"
          />
        </div>
        <Button
          v-if="articles.length < articleTotal"
          class="p-button-rounded"
          label="Load More"
          @click="loadMoreArticles"
        />

        <div class="mt-8 mb-5">
          <hr class="black mb-4">
          <newsletter-home @submit="newsletterSubmitEvent" />
        </div>
      </div>
    </section>
  </div>
</template>

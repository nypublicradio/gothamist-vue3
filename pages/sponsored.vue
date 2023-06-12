<script setup lang="ts">
import { onMounted } from 'vue'
import { useIsArticlePage } from '~/composables/states'
const config = useRuntimeConfig()
const { $analytics, $nativo } = useNuxtApp()
const isArticlePage = useIsArticlePage()
const article = {
  title: '',
  socialTitle: '',
  url: '/sponsored',
  section: {
    name: 'Sponsored',
    slug: 'sponsored',
  },
  imageLink: '',
  body: [],
  tags: [],
  authors: [],
  disableComments: true,
}

const titleRef = ref(null)
const loadedTitle = ref(null)

const sensitiveContent = useSensitiveContent()

useChartbeat()
useOptinMonster()

onBeforeMount(() => {
  isArticlePage.value = true
})

onMounted(() => {
  $analytics.sendPageView({ page_type: 'sponsored_article' })
  sensitiveContent.value = true
  $nativo.refresh()

  // getting title from element after the sponsored content loads
  setTimeout(() => {
    loadedTitle.value = titleRef.value.innerText
  }, 1000)
})

onUnmounted(() => {
  sensitiveContent.value = false
  isArticlePage.value = false
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
    <HeaderScrollTrigger v-if="article" header-class="article-page-header">
      <ScrollTracker scrollTarget=".article-column" v-slot="scrollTrackerProps">
        <ArticlePageHeader
          class="article-page-header"
          :donateUrlBase="config.public.donateUrlBase"
          utmCampaign="goth_header"
          :progress="scrollTrackerProps.scrollPercentage"
          :title="loadedTitle"
          :shareUrl="article.url"
          :shareTitle="article.socialTitle"
        />
      </ScrollTracker>
    </HeaderScrollTrigger>
    <section class="top-section" v-if="article">
      <div class="content">
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block"></div>
          <div class="col">
            <v-tag
              v-if="article?.section"
              :name="article.section.name"
              :slug="`/${article.section.slug}`"
            />
            <h1 ref="titleRef" class="mt-4 mb-3 h2">{{ article.title }}</h1>
          </div>
          <div class="col-fixed hidden lg:block"></div>
        </div>
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block">
            <hr class="black" />
            <byline class="mb-3 pt-4" :article="article" />
          </div>
          <div class="col overflow-hidden" v-if="article">
            <div class="mb-4 xxl:mb-6 relative"></div>
            <div class="block xxl:hidden mb-5">
              <hr class="black" />
              <byline class="pt-4" :article="article" />
              <hr class="mt-3 mb-5" />
            </div>
            <article-donation-CTA
              title="Gothamist is funded by sponsors and member donations"
              :donateUrlBase="config.public.donateUrlBase"
              utmCampaign="article-top"
            />
          </div>
          <div class="col-fixed hidden lg:block">
            <HtlAd
              layout="rectangle"
              slot="htlad-gothamist_interior_rectangle_topper"
              fineprint="Gothamist is funded by sponsors and member donations"
            />
          </div>
        </div>
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block"></div>
          <div class="col overflow-hidden article-column">
            <v-streamfield
              class="article-body"
              :streamfield-blocks="article.body"
            />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="content">
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block"></div>
        </div>
        <hr class="black" />
        <p
          role="heading"
          aria-level="2"
          v-if="article?.section"
          class="type-label3 mt-2 mb-4"
        >
          MORE NEWS
        </p>
        <article-recirculation slug="news" trackingComponentLocation="Sponsored Landing Page Recirculation Module"/>
        <div class="mt-6 mb-5">
          <hr class="black mb-4" />
          <newsletter-home @submit="newsletterSubmitEvent()" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.page.sponsored {
  .v-tag .p-button {
    background: transparent;
    &:hover {
      background: var(--tag-hover-bg);
    }
  }
  .col-fixed {
    width: 100%;
    max-width: $col-fixed-width-330;
    min-width: $col-fixed-width-330;
  }
  @include media('>lg') {
    .article-body > * {
      flex-grow: 1;
      flex-basis: 0;
      padding: 0.5rem;
      width: calc(100% - 330px - 15px);
    }
    .article-body > *.rte-text {
      width: 100%;
    }
    .article-body > *.rte-text > * {
      width: calc(100% - 330px - 15px);
    }
    .article-body > *.wide-module,
    .article-body > streamfield-pull-quote,
    .article-body > streamfield-pull-quote-author,
    .article-body > *.rte-text > *.wide-module {
      width: 100%;
    }
  }
}
</style>

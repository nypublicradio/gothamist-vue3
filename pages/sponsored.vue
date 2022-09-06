<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useMediaQuery, useWindowScroll } from '@vueuse/core'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import VTag from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VTag.vue'
import { ArticlePage } from '../composables/types/Page'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const config = useRuntimeConfig()
const { $analytics } = useNuxtApp()
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
  disableComments: true
}
const topImage = {
  id: 33,
  alt: '',
  caption: '',
  width: 728,
  height: 485,
  credit: '',
  creditLink: ''
}
const topCaption = ''

const sensitiveContent = useSensitiveContent()
const { y: scrollY } = useWindowScroll()
const isMediumOrUpScreen = useMediaQuery(`(min-width: 768px)`)
// maybe these values should be calculated automatically by measuring on the position of the main header
// or something instead of hardcoding them here, but this works for now
const showHeaderAfter = computed(() => (isMediumOrUpScreen.value ? 374 : 68))
const showHeader = computed(() => scrollY.value > showHeaderAfter.value)

onMounted(() => {
  $analytics.sendPageView({page_type: 'sponosored_article'})
  sensitiveContent.value = true
})

onUnmounted(() => {
  sensitiveContent.value = false
})

const newsletterSubmitEvent = (e) => {
  $analytics.sendEvent('click_tracking', {
    event_category: `Click Tracking - ${e} - Newsletter`,
    component: e,
    event_label: 'Newsletter',
  })
}
</script>

<template>
  <div>
    <ScrollTracker scrollTarget=".article-body" v-slot="scrollTrackerProps">
      <ArticlePageHeader
        :class="`article-page-header ${showHeader ? '' : 'js-hidden'}`"
        :donateUrlBase="config.donateUrlBase"
        utmCampaign="goth_header"
        :progress="scrollTrackerProps.scrollPercentage"
        :title="article?.title"
        :shareUrl="article?.url"
        :shareTitle="article?.socialTitle"
      />
    </ScrollTracker>
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
            <h1 class="mt-4 mb-3 h2">{{ article.title }}</h1>
          </div>
          <div class="col-fixed hidden lg:block"></div>
        </div>
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block">
            <hr class="black" />
            <byline class="mb-3 pt-4" :article="article" />
            <div>
              <div id="pinned-newsletter" style="min-width: 300px">
                <hr class="mb-4" />
                <newsletter-article
                  class="pb-8"
                  triggerID="pinned-newsletter"
                  pinEndTriggerID="pinned-newsletter-end"
                  @submit="newsletterSubmitEvent('pinned')"
                />
              </div>
            </div>
          </div>
          <div class="col overflow-hidden" v-if="article">
            <div class="mb-4 xxl:mb-6 relative">
              <v-image-with-caption
                v-if="topImage"
                loading="eager"
                image="https://images.unsplash.com/photo-1662476894382-088ef55f059c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1721&q=80"
                :imageUrl="article.imageLink"
                :width="728"
                :height="485"
                :alt-text="topImage?.alt"
                :maxWidth="topImage?.width"
                :maxHeight="topImage?.height"
                :credit="topImage?.credit && `Photo by ${topImage?.credit}`"
                :credit-url="topImage?.creditLink"
                :sizes="[1, 2]"
                :ratio="[3, 2]"
                :caption="topCaption"
                :quality="90"
              />
            </div>
            <div class="block xxl:hidden mb-5">
              <hr class="black" />
              <byline class="pt-4" :article="article" />
              <hr class="mt-3 mb-5" />
            </div>
            <article-donation-CTA
              :donateUrlBase="config.donateUrlBase"
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
      <div id="pinned-newsletter-end" class="content">
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block"></div>
          <div class="col w-full">
            <article-footer v-if="article" :article="article" />
          </div>
        </div>
        <hr class="black" />
        <p v-if="article?.section" class="type-label3 mt-2 mb-4">
          MORE NEWS
        </p>
        <article-recirculation
          slug="news"
        />
        <div class="mt-6 mb-5">
          <hr class="black mb-4" />
          <newsletter-home @submit="newsletterSubmitEvent('footer')" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.page.sectionSlug-articleSlug {
  background: linear-gradient(
    180deg,
    #f3f3e4 0,
    rgba(255, 255, 255, 0) 720px,
    rgba(255, 255, 255, 0) 100%
  );
  .v-tag .p-button {
    background: transparent;
    &:hover {
      background: var(--tag-hover-bg);
    }
  }
  .col-fixed {
    width: 100%;
    max-width: $col-fixed-width-330;
  }

  .article-page-header {
    transition: opacity 0.4s ease-in;
  }
  .article-page-header.js-hidden {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.4s ease-in, visibility 0s 0.4s;
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
    
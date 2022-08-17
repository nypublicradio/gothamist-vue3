<script setup lang="ts">
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
const route = useRoute()

const props = defineProps({
  error: Object,
})

const navigation = await findNavigation().then(({ data }) =>
  normalizeFindNavigationResponse(data)
)

// const latestArticles = await findArticlePages({
//   show_as_feature: true,
// }).then(({ data }) => normalizeFindArticlePagesResponse(data))

onMounted(() => {
  const { $analytics } = useNuxtApp()
  $analytics.sendPageView({ page_type: 'error_page' })
})

const newsletterSubmitEvent = (e) => {
  //emitted newsletter submit event, @Matt, not exactly sure how to get this work like you mentioned.
  // sendEvent('click_tracking', {
  //   event_category: 'Click Tracking',
  //   component: 'Footer',
  //   event_label: 'Become a member',
  // })
}
</script>
<template>
  <div class="error-page">
    <Html>
      <Head>
        <Title>{{ error.statusCode }} Error | Gothamist</Title>
        <Meta
          name="og:title"
          :content="`${error.statusCode} Error | Gothamist`"
        />
        <Meta
          name="twitter:title"
          :content="`${error.statusCode} Error | Gothamist`"
        />
      </Head>
    </Html>
    <GothamistMainHeader
      :navigation="navigation"
      :showLogo="route.name !== 'index'"
      :donateUrl="config.donateUrlBase"
    />
    <main>
      <section>
        <div class="error-page-header p-6">
          <div class="error-page-error pt-2">
            {{ error.statusCode }} Error - {{ error.statusMessage }}
          </div>
          <div v-if="$config.DEBUG === 'true'" class="mt-4">
            <pre class="font-bold">{{ error.message }}</pre>
            <div v-html="error.description"></div>
          </div>
          <h2 class="text-center p-6">
            The page you're looking for doesn't appear to exist. Please check
            out our latest stories below.
          </h2>
        </div>
        <div class="content">
          <!-- featured area -->
          <!-- <template v-if="latestArticles">
            <div class="grid mb-6 gutter-x-30">
              <div v-if="latestArticles.length > 0" class="col-12 xl:col-8">
                <v-card
                  class="featured-article mod-vertical mod-featured mod-large"
                  :image="useImageUrl(latestArticles[0].listingImage)"
                  :sizes="[1]"
                  :width="897"
                  :height="598"
                  :title="latestArticles[0].title"
                  :titleLink="latestArticles[0].link"
                  :maxWidth="latestArticles[0].listingImage.width"
                  :maxHeight="latestArticles[0].listingImage.height"
                  :tags="[
                    {
                      name: latestArticles[0].section.name,
                      slug: latestArticles[0].section.slug,
                    },
                  ]"
                >
                  <p class="desc">
                    {{ latestArticles[0].description }}
                  </p>
                  <div class="article-metadata">
                    <span>
                      <v-byline :authors="latestArticles[0].authors" />
                    </span>
                    <span>comments</span>
                  </div>
                </v-card>
              </div>
              <div v-if="latestArticles.length > 4" class="col-12 xl:col-4">
                <v-card
                  class="mod-vertical mod-large mb-1 tag-small"
                  :image="useImageUrl(latestArticles[1].listingImage)"
                  :width="665"
                  :height="448"
                  :sizes="[1]"
                  :title="latestArticles[1].title"
                  :titleLink="latestArticles[1].link"
                  :maxWidth="latestArticles[1].listingImage.width"
                  :maxHeight="latestArticles[1].listingImage.height"
                  :tags="[
                    {
                      name: latestArticles[1].section.name,
                      slug: latestArticles[1].section.slug,
                    },
                  ]"
                >
                  <p class="desc">
                    {{ latestArticles[0].description }}
                  </p>
                  <div class="article-metadata">
                    <span>
                      <v-byline :authors="latestArticles[1].authors" />
                    </span>
                    <span>comments</span>
                  </div>
                </v-card>
                <div
                  v-for="article in latestArticles.slice(2, 5)"
                  :key="article.uuid"
                >
                  <hr class="mb-2" />
                  <v-card
                    class="mod-horizontal mod-left mod-small mb-1 tag-small latest-articles"
                    :title="article.title"
                    :titleLink="article.link"
                  >
                    <div class="article-metadata">
                      <span>
                        <v-byline :authors="article.authors" />
                      </span>
                      <span>comments</span>
                    </div>
                  </v-card>
                </div>
              </div>
            </div>
          </template> -->
          <!-- newsletter -->
          <div class="mt-8 mb-5">
            <hr class="black mb-4" />
            <newsletter-home @submit="newsletterSubmitEvent" />
          </div>
        </div>
      </section>
    </main>
    <scroll-to-top-button />
    <gothamist-footer :navigation="navigation" />
  </div>
</template>

<style lang="scss">
.error-page {
  background: linear-gradient(
    180deg,
    #f3f3e4 0,
    rgba(255, 255, 255, 0) 720px,
    rgba(255, 255, 255, 0) 100%
  );
  .error-page-header {
    background: var(--soybean200);
  }
  .error-page-error {
    font-size: var(--font-size-5);
    line-height: var(--font-size-5);
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
  .v-card.mod-large .card-details {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>

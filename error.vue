<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { Draggable } from '~/assets/gsap/Draggable.js'
import { InertiaPlugin } from '~/assets/gsap/InertiaPlugin.js'
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
const route = useRoute()

const props = defineProps({
  error: Object,
})

console.log(props.error)

const navigation = await findNavigation().then(({ data }) =>
  normalizeFindNavigationResponse(data)
)

const articles = await findArticlePages({
  limit: 5,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))

const articleLg = ref(articles[0])
const articleMd = ref(articles[1])
const articlesSm = ref([articles[2], articles[3], articles[4]])
const isMobile = ref(false)

onMounted(() => {
  // draggable setup
  if (window.innerWidth < 768 && articles) {
    isMobile.value = true
    setTimeout(() => {
      gsap.registerPlugin(InertiaPlugin)
      gsap.registerPlugin(Draggable)
      Draggable.create('.horz-scroll-content', {
        type: 'x',
        edgeResistance: 0.45,
        bounds: '.horz-scroll',
        inertia: true,
      })
    }, 1000)
  }
})
onBeforeUnmount(() => {
  // kill draggable
  if (isMobile.value) {
    Draggable.get('.horz-scroll-content').kill()
  }
})

const { $analytics } = useNuxtApp()
onMounted(() => {
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

          <div v-if="articles" class="recirculation">
            <div class="grid gutter-x-30">
              <div class="col-12 xl:col-8">
                <v-card
                  class="article-lg mod-vertical mod-featured2 mod-large mb-4"
                  :image="useImageUrl(articleLg.listingImage)"
                  :sizes="[1]"
                  :width="897"
                  :height="598"
                  :title="articleLg.listingTitle"
                  :titleLink="articleLg.link"
                  :maxWidth="articleLg.listingImage?.width"
                  :maxHeight="articleLg.listingImage?.height"
                >
                  <v-card-metadata
                    class="mt-0 md:mt-2"
                    altDesign
                    :article="articleLg"
                  />
                </v-card>
                <hr class="block xl:hidden mb-3" />
              </div>
              <div class="col-12 xl:col-4">
                <!-- md article desktop  -->
                <v-card
                  class="hidden xl:flex article-md mod-vertical mod-large mb-5"
                  :image="useImageUrl(articleMd.listingImage)"
                  :title="articleMd.listingTitle"
                  :titleLink="articleMd.link"
                  :ratio="[3, 2]"
                  :width="433"
                  :height="289"
                  :sizes="[1]"
                  :maxWidth="articleMd.listingImage?.width"
                  :maxHeight="articleMd.listingImage?.height"
                >
                  <p>
                    {{ articleMd.description }}
                  </p>
                  <v-card-metadata stack :article="articleMd" />
                </v-card>
                <!-- md article mobile  -->
                <v-card
                  class="flex xl:hidden article-md mod-horizontal mod-left tag-small mb-5"
                  :image="useImageUrl(articleMd.listingImage)"
                  :title="articleMd.listingTitle"
                  :titleLink="articleMd.link"
                  :width="318"
                  :height="212"
                  :sizes="[1]"
                  :maxWidth="articleMd.listingImage?.width"
                  :maxHeight="articleMd.listingImage?.height"
                >
                  <p>
                    {{ articleMd.description }}
                  </p>
                  <v-card-metadata :article="articleMd" />
                </v-card>
                <hr
                  class="my-5"
                  :class="
                    isMobile ? 'block xl:hidden' : 'hidden sm:block xl:hidden'
                  "
                />
                <div class="horz-scroll-holder" :class="[{ mobile: isMobile }]">
                  <div class="horz-scroll">
                    <div
                      class="grid gutter-x-xl keep-gutter horz-scroll-content"
                    >
                      <div
                        v-for="articleSm in articlesSm"
                        :key="articleSm.id"
                        class="v-hr flex"
                        :class="
                          isMobile
                            ? ' col-4 xl:col-12 xl:flex-column'
                            : 'col-12 sm:col-4 xl:col-12 flex-column sm:flex-row xl:flex-column'
                        "
                      >
                        <hr
                          class="w-full mb-3"
                          :class="
                            isMobile
                              ? 'hidden xl:block'
                              : 'block sm:hidden xl:block'
                          "
                        />
                        <v-card
                          class="article-sm mod-horizontal mod-small mb-3 tag-small"
                          :title="articleSm.listingTitle"
                          :titleLink="articleSm.link"
                        >
                          <v-card-metadata
                            :article="articleSm"
                            :showComments="false"
                          />
                        </v-card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
}
</style>

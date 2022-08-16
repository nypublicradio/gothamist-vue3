<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { Draggable } from '~/assets/gsap/Draggable.js'
import { InertiaPlugin } from '~/assets/gsap/InertiaPlugin.js'

// this component is used in the articleSlug at the bottom of the article page, and also as the topper in the section index page

const props = defineProps({
  // the article to fileter out from the results if it exists
  article: {
    type: Object,
    default: {},
  },
})

const route = useRoute()

const { title: sectionTitle, id: sectionId } = await findPage(
  route.params.sectionSlug as string
).then(({ data }) => normalizeFindPageResponse(data))

const articles = await findArticlePages({
  descendant_of: sectionId,
  limit: 6,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))

// remove the currcnt article from the list of articles
const articlesFiltered = articles.filter(
  (article) => article.id !== props.article?.id
)

const articleLg = ref(articlesFiltered[0])
const articleMd = ref(articlesFiltered[1])
const articlesSm = ref([
  articlesFiltered[2],
  articlesFiltered[3],
  articlesFiltered[4],
])
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
</script>

<template>
  <div>
    <div v-if="articles" class="recirculation">
      <div class="grid gutter-x-30">
        <div class="col-12 xl:col-8">
          <v-card
            class="article-lg mod-vertical mod-featured2 mod-large mb-4"
            :image="useImageUrl(articleLg.listingImage)"
            :sizes="[1]"
            :width="897"
            :height="598"
            :title="articleLg.listingTitle || articleLg.title"
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
            :title="articleMd.listingTitle || articleMd.title"
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
            <v-card-metadata :article="articleMd" />
          </v-card>
          <!-- md article mobile  -->
          <v-card
            class="flex xl:hidden article-md mod-horizontal mod-left tag-small mb-5"
            :image="useImageUrl(articleMd.listingImage)"
            :title="articleMd.title"
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
            :class="isMobile ? 'block xl:hidden' : 'hidden sm:block xl:hidden'"
          />
          <div class="horz-scroll-holder" :class="[{ mobile: isMobile }]">
            <div class="horz-scroll">
              <div class="grid gutter-x-xl keep-gutter horz-scroll-content">
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
                      isMobile ? 'hidden xl:block' : 'block sm:hidden xl:block'
                    "
                  />
                  <v-card
                    class="article-sm mod-horizontal mod-small mb-3 tag-small"
                    :title="articleSm.listingTitle || articleSm.title"
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
  </div>
</template>

<style lang="scss">
.recirculation {
  .v-card {
    &.article-sm {
      .card-title-link .h2 {
        font-weight: 600 !important;
      }
      .card-slot {
        justify-content: end;
      }
    }
    &.article-md {
      gap: 1rem !important;
    }
  }
  .v-hr:not(:last-child) {
    @include media('<xl') {
      border-right: 1px solid #ebebeb !important;
    }
  }
  .horz-scroll-holder.mobile {
    position: relative;
    @include media('<md') {
      margin-left: -1.5rem;
      margin-right: -1.5rem;
      &:after {
        content: '';
        z-index: 1;
        pointer-events: none;
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        height: 100%;
        width: 100%;
        background: -moz-linear-gradient(
          left,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0) 10%,
          rgba(255, 255, 255, 0) 65%,
          rgba(255, 255, 255, 1) 100%
        );
        background: -webkit-linear-gradient(
          left,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0) 10%,
          rgba(255, 255, 255, 0) 65%,
          rgba(255, 255, 255, 1) 100%
        );
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0) 10%,
          rgba(255, 255, 255, 0) 65%,
          rgba(255, 255, 255, 1) 100%
        );
      }
    }
    .horz-scroll {
      overflow-x: hidden;
      @include media('<md') {
        //overflow-x: scroll;

        .horz-scroll-content {
          padding: 0 24px;
          width: 733px;
        }
      }
    }
  }
}
</style>

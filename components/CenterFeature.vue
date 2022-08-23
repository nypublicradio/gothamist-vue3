<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
// this component is used in the articleSlug at the bottom of the article page, and also as the topper in the section index page

const props = defineProps({
  // the article to filter out from the results if it exists
  article: {
    type: Object,
    default: {},
  },
  slug: {
    type: String,
    default: 'food',
  },
})
const routeSectionSlug = ref(props.slug)

const centerFeatureCollections = []
const centerFeatureCollectionItems = await findPage(
  routeSectionSlug.value as string
).then(({ data }) => {
  //console.log('data', data.value)
  // data.value.pageCollectionRelationship.forEach((collection) => {
  //   centerFeatureCollections.push({
  //     id: collection.id,
  //     layout: collection.layout,
  //     data: normalizeArticlePage(collection.pages[0]),
  //   })
  // })
})
//console.log('centerFeatureCollections = ', centerFeatureCollections)

const { title: sectionTitle, id: sectionId } = await findPage(
  routeSectionSlug.value as string
).then(({ data }) => normalizeFindPageResponse(data))

const articles = await findArticlePages({
  descendant_of: sectionId,
  limit: 7,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))

// remove the current article from the list of articles
const articlesFiltered = articles.filter(
  (article) => article.id !== props.article?.id
)

const articleLg = ref(articlesFiltered[0])
const articleMd = ref(articlesFiltered[1])
const articlesSm = ref([
  articlesFiltered[2],
  articlesFiltered[3],
  articlesFiltered[4],
  articlesFiltered[5],
])
</script>

<template>
  <div>
    <div v-if="articles" class="center-feature">
      <div class="grid gutter-x-30">
        <div class="col-fixed flex-order-2 lg:flex-order-1">
          <!-- md article desktop  -->
          <v-card
            class="hidden lg:flex article-md mod-vertical mod-large mb-5 tag-small"
            :image="useImageUrl(articleMd.listingImage)"
            :title="articleMd.listingTitle"
            :titleLink="articleMd.link"
            :ratio="[3, 2]"
            :width="433"
            :height="289"
            :sizes="[1]"
            :maxWidth="articleMd.listingImage?.width"
            :maxHeight="articleMd.listingImage?.height"
            loading="eager"
            :tags="[
              {
                name: articleMd.section.name,
                slug: `/${articleMd.section.slug}`,
              },
            ]"
          >
            <p>
              {{ articleMd.description }}
            </p>
            <v-card-metadata stack :article="articleMd" />
          </v-card>
          <!-- md article mobile  -->
          <v-card
            class="flex lg:hidden article-md mod-horizontal mod-left tag-small"
            :image="useImageUrl(articleMd.listingImage)"
            :title="articleMd.listingTitle"
            :titleLink="articleMd.link"
            :width="318"
            :height="212"
            :sizes="[1]"
            :maxWidth="articleMd.listingImage?.width"
            :maxHeight="articleMd.listingImage?.height"
            loading="eager"
            :tags="[
              {
                name: articleMd.section.name,
                slug: `/${articleMd.section.slug}`,
              },
            ]"
          >
            <p>
              {{ articleMd.description }}
            </p>
            <v-card-metadata :article="articleMd" />
          </v-card>
          <img
            class="hidden lg:block mb-4 xl:mb-7"
            src="https://fakeimg.pl/300x250/?text=AD Here"
            width="300"
            height="250"
            alt="advertisement"
          />
        </div>
        <div class="col flex-order-1 lg:flex-order-2">
          <v-card
            class="article-lg mod-vertical mod-large mb-4"
            :image="useImageUrl(articleLg.listingImage)"
            :sizes="[1]"
            :width="897"
            :height="598"
            :title="articleLg.listingTitle"
            :titleLink="articleLg.link"
            :maxWidth="articleLg.listingImage?.width"
            :maxHeight="articleLg.listingImage?.height"
            loading="eager"
            :tags="[
              {
                name: articleLg.section.name,
                slug: `/${articleLg.section.slug}`,
              },
            ]"
          >
            <v-card-metadata
              class="mt-0 md:mt-2"
              altDesign
              :article="articleLg"
            />
          </v-card>
          <hr class="block lg:hidden mb-3" />
        </div>
        <div class="col-3 flex-order-3">
          <hr class="my-3 block xl:hidden" />
          <horizontal-drag :articles="articlesSm" v-slot="slotProps">
            <v-card
              class="mod-horizontal mod-left mod-small mb-0"
              :image="useImageUrl(slotProps.article.listingImage)"
              :width="106"
              :height="106"
              :ratio="[1, 1]"
              :sizes="[2]"
              :title="slotProps.article.listingTitle || slotProps.article.title"
              :titleLink="slotProps.article.link"
              :maxWidth="slotProps.article.listingImage?.width"
              :maxHeight="slotProps.article.listingImage?.height"
              :quality="80"
            >
              <div></div>
              <v-card-metadata
                :article="slotProps.article"
                :showComments="false"
              />
            </v-card>
          </horizontal-drag>
          <img
            class="block lg:hidden mb-4 xl:mb-7 m-auto mt-6"
            src="https://fakeimg.pl/300x250/?text=AD Here"
            width="300"
            height="250"
            alt="advertisement"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.center-feature {
  .col-fixed {
    width: $col-fixed-width-330;
    @include media('<lg') {
      width: 100%;
    }
  }
  .col {
    @include media('<xl') {
      width: auto;
    }
    @include media('<lg') {
      width: 100%;
    }
  }
  .col-3 {
    width: $col-fixed-width-330;
    @include media('<xl') {
      width: 100%;
    }
  }
  .v-card {
    background: transparent;
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
      // custom size of title and v-tag placement
      @include media('>=lg') {
        .card-details .card-title {
          .flexible-link {
            .h2 {
              @include font-config($type-header5);
            }
          }

          .v-tag {
            margin-top: -4px;
          }
        }
      }
    }
  }
}
</style>

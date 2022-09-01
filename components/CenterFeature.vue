<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { ref } from 'vue'

const props = defineProps({
  collection: {
    type: Object,
    default: {},
    required: true,
  },
})

// Note: the center feature should display the first 6 stories in the content collection
const articleLg = ref(normalizeArticlePage(props.collection.data[0]))
const articleMd = ref(normalizeArticlePage(props.collection.data[1]))
const articlesSm = ref([
  normalizeArticlePage(props.collection.data[2]),
  normalizeArticlePage(props.collection.data[3]),
  normalizeArticlePage(props.collection.data[4]),
  normalizeArticlePage(props.collection.data[5]),
])
</script>

<template>
  <div v-if="articleLg && articleMd && articlesSm" class="center-feature">
    <div class="content">
      <template v-if="collection.label">
        <hr class="mb-2 black" />
        <div class="type-label3 mb-5">{{ collection.label }}</div>
      </template>
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
          <div class="hidden lg:block mb-4 xl:mb-7">
            <HtlAd layout="rectangle" slot="htlad-gothamist_index_topper" />
          </div>
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
          <div class="block lg:hidden mb-4 xl:mb-7 m-auto mt-6">
            <HtlAd layout="rectangle" slot="htlad-gothamist_index_topper" />
          </div>
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

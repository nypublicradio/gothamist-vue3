<script setup lang="ts">
import { ref } from 'vue'
import { ArticlePage } from '~~/composables/types/Page';

const props = defineProps<{
  collection: {label: string, data: ArticlePage[]},
  trackingComponentLocation: string
}>()
const trackingComponent = "Center Feature"

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
    <template v-if="collection.label">
      <hr class="black" />
      <div class="type-label3 mt-2 mb-4" role="heading" aria-level="2">{{ collection.label }}</div>
    </template>
    <div class="grid gutter-x-30">
      <div class="col-fixed flex-order-2 lg:flex-order-1">
        <!-- md article desktop  -->
        <gothamist-card
          :article="articleMd"
          class="hidden lg:flex article-md mod-vertical mod-large mb-5 tag-small"
          :width="433"
          :height="289"
          loading="eager"
          :trackClicks="true"
          :trackingComponentLocation="trackingComponentLocation"
          trackingComponent="Center Feature"
          :trackingComponentPosition="2"
        >
          <p>
            {{ articleMd.description }}
          </p>
          <v-card-metadata stack :article="articleMd" />
        </gothamist-card>
        <!-- md article mobile  -->
        <gothamist-card
          :article="articleMd"
          class="flex lg:hidden article-md mod-horizontal mod-left tag-small"
          :width="318"
          :height="212"
          :trackClicks="true"
          :trackingComponentLocation="trackingComponentLocation"
          :trackingComponent="trackingComponent"
          :trackingComponentPosition="2"
        >
          <p>
            {{ articleMd.description }}
          </p>
          <v-card-metadata :article="articleMd" />
        </gothamist-card>
        <div class="hidden lg:block mb-4 xl:mb-7">
          <HtlAd layout="rectangle" slot="htlad-gothamist_index_topper" />
        </div>
      </div>
      <div class="col flex-order-1 lg:flex-order-2">
        <gothamist-card
          :article="articleLg"
          class="article-lg mod-vertical mod-large mb-4"
          :image="useImageUrl(articleLg.listingImage)"
          :width="700"
          :height="467"
          :trackClicks="true"
          :trackingComponentLocation="trackingComponentLocation"
          :trackingComponent="trackingComponent"
          :trackingComponentPosition="1"
        >
          <v-card-metadata
            class="mt-0 md:mt-2"
            altDesign
            :article="articleLg"
          />
        </gothamist-card>
        <hr class="block lg:hidden mb-3" />
      </div>
      <div class="col-3 flex-order-3">
        <hr class="my-3 block xl:hidden" />
        <horizontal-drag :items="articlesSm" v-slot="slotProps">
          <gothamist-card
            v-slot="card"
            :article="slotProps.item"
            class="mod-horizontal mod-left mod-small mb-0"
            :width="106"
            :height="106"
            :ratio="[1, 1]"
            :hide-tags="true"
            :sizes="[2]"
            :trackClicks="true"
            :trackingComponentLocation="trackingComponentLocation"
            :trackingComponent="trackingComponent"
            :trackingComponentPosition="slotProps.index + 3"
          >
            <div></div>
            <v-card-metadata
              :article="slotProps.item"
              :showComments="false"
            />
          </gothamist-card>
        </horizontal-drag>
        <div class="block lg:hidden mb-4 xl:mb-7 m-auto mt-6">
          <HtlAd layout="rectangle" slot="htlad-gothamist_index_topper" />
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

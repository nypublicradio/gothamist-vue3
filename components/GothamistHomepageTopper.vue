<script setup lang="ts">
import { ref,computed } from 'vue'
import { ArticlePage } from '~~/composables/types/Page';
import VTag from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VTag.vue'

const props = defineProps<{
  featureLarge: ArticlePage,
  featureMedium: ArticlePage,
  latestArticles: ArticlePage[],
  trackingComponentLocation: string,
}>()
const trackingComponent = "Homepage Topper"

const filteredLatestArticles = computed(() => {
  return props.latestArticles.filter(article =>
    article.id !== props.featureLarge?.id &&
    article.id !== props.featureMedium?.id
  )
})
</script>

<template>
  <div class="homepage-topper">
    <div class="sr-only" role="heading" aria-level="2">Featured Articles</div>
    <div class="grid gutter-x-30">
      <div class="col-fixed flex-order-2 lg:flex-order-1">
        <!-- md article desktop  -->
        <gothamist-card
          v-if="featureMedium"
          v-slot="card"
          :article="featureMedium"
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
            {{ featureMedium.description }}
          </p>
          <v-card-metadata
            stack
            :article="featureMedium"
            :showComments="false"
            @link-click="$event => card.trackClick($event)"
          />
        </gothamist-card>
        <!-- md article mobile  -->
        <gothamist-card
          v-if="featureMedium"
          v-slot="card"
          :article="featureMedium"
          class="flex lg:hidden article-md mod-horizontal mod-left tag-small mb-2"
          :width="318"
          :height="212"
          :trackClicks="true"
          :trackingComponentLocation="trackingComponentLocation"
          :trackingComponent="trackingComponent"
          :trackingComponentPosition="2"
        >
          <p>
            {{ featureMedium.description }}
          </p>
          <v-card-metadata
            :article="featureMedium"
            @link-click="$event => card.trackClick($event)"
          />
        </gothamist-card>
        <div class="hidden lg:block mb-4 xl:mb-7">
          <HtlAd layout="rectangle" slot="htlad-gothamist_index_topper" />
        </div>
      </div>
      <div class="col flex-order-1 lg:flex-order-2">
        <gothamist-card
          v-if="featureLarge"
          v-slot="card"
          :article="featureLarge"
          class="article-lg mod-vertical mod-large mb-4"
          :image="useImageUrl(featureLarge.listingImage)"
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
            :article="featureLarge"
            @link-click="$event => card.trackClick($event)"
          />
        </gothamist-card>
        <hr class="block lg:hidden black mb-4" />
      </div>

      <div class="col-3 flex-order-3">
        <hr class="block lg:hidden black mb-4" />
        <v-tag class="tag block mb-3" role="heading" aria-level="2" name="Latest" slug="/#latest" />
        <div v-for="(article, index) in filteredLatestArticles" :key="article.uuid" class="homepage-topper-latest">
          <gothamist-card
            v-slot="card"
            :article="article"
            :id="index === 3 ? 'ntv-latest-1' : ''"
            class="mod-horizontal mod-left mod-small mb-0"
            :width="106"
            :height="106"
            :ratio="[1, 1]"
            :sizes="[2]"
            :hide-tags="true"
            :trackClicks="true"
            :trackingComponentLocation="trackingComponentLocation"
            :trackingComponent="trackingComponent"
            :trackingComponentPosition="index + 3"
          >
            <div></div>
            <v-card-metadata
              :article="article"
              :showComments="false"
              @link-click="$event => card.trackClick($event)"
            />
          </gothamist-card>
          <hr v-if="index < 3" class="my-3 block" />
        </div>
        <div class="block lg:hidden mb-4 xl:mb-7 m-auto mt-6">
          <HtlAd layout="rectangle" slot="htlad-gothamist_index_topper" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.homepage-topper {
  --tag-bg: transparent;
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
  .homepage-topper-latest {
    .v-card.mod-small .image-with-caption {
      width: var(--img-width-mobile) !important;
    }
    @include media('<sm') {
      .v-card.mod-small .image-with-caption {
        width: 66px !important;
      }
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

<script setup lang="ts">
import type { ArticlePage } from '~~/composables/types/Page'

const props = withDefaults(defineProps<{
  collection: { label?: string, data: ArticlePage[] }
  trackingComponent?: string
  trackingComponentLocation?: string
  nativoId?: string
}>(), {
  trackingComponent: 'Left Feature',
  trackingComponentLocation: 'Left Feature',
  nativoId: '',
})

const { $nativo } = useNuxtApp()
const articleLg = ref(normalizeArticlePage(props.collection.data?.[0]))
const articleMd = ref(normalizeArticlePage(props.collection.data?.[1]))
const articlesSm = ref([])
props.collection.data?.[2] && articlesSm.value.push(normalizeArticlePage(props.collection.data?.[2]))
props.collection.data?.[3] && articlesSm.value.push(normalizeArticlePage(props.collection.data?.[3]))
props.collection.data?.[4] && articlesSm.value.push(normalizeArticlePage(props.collection.data?.[4]))
</script>

<template>
  <div>
    <template v-if="collection?.label?.length > 0">
      <hr class="black">
      <div class="type-label3 mt-2 mb-4" role="heading" aria-level="2">
        {{ collection.label }}
      </div>
    </template>
    <div v-if="articleLg && articleMd">
      <div class="left-feature">
        <div class="grid gutter-x-30">
          <div class="col-12 xl:col-8">
            <gothamist-card
              v-if="articleLg"
              v-slot="card"
              :article="articleLg"
              class="article-lg mod-vertical mod-featured2 mod-large mb-4"
              :width="897"
              :height="598"
              :hide-tags="true"
              loading="eager"
              :track-clicks="true"
              :tracking-component="trackingComponent"
              :tracking-component-location="trackingComponentLocation"
              :tracking-component-position="1"
            >
              <v-card-metadata
                class="mt-0 md:mt-2"
                alt-design
                :article="articleLg"
                @link-click="$event => card.trackClick($event)"
              />
            </gothamist-card>
            <hr class="block xl:hidden mb-3">
          </div>
          <div class="col-12 xl:col-4">
            <!-- md article desktop  -->
            <gothamist-card
              v-if="articleMd"
              :id="nativoId"
              v-slot="card"
              :article="articleMd"
              class="hidden xl:flex article-md mod-vertical mod-large mb-5"
              :width="433"
              :height="289"
              :hide-tags="true"
              loading="eager"
              :track-clicks="true"
              :tracking-component="trackingComponent"
              :tracking-component-location="trackingComponentLocation"
              :tracking-component-position="2"
              @vue:mounted="$nativo.refresh"
            >
              <p>
                {{ articleMd?.description }}
              </p>
              <v-card-metadata
                stack
                :article="articleMd"
                @link-click="$event => card.trackClick($event)"
              />
            </gothamist-card>
            <!-- md article mobile  -->
            <gothamist-card
              v-if="articleMd"
              :id="nativoId"
              v-slot="card"
              :article="articleMd"
              class="flex xl:hidden article-md mod-horizontal mod-left tag-small mb-5"
              :width="318"
              :height="212"
              loading="eager"
            >
              <p>
                {{ articleMd?.description }}
              </p>
              <v-card-metadata
                :article="articleMd"
                @link-click="$event => card.trackClick($event)"
              />
            </gothamist-card>
            <hr class="my-3">
            <lazy-horizontal-drag v-if="articlesSm" v-slot="slotProps" :items="articlesSm">
              <gothamist-card
                v-slot="card"
                :article="slotProps.item"
                class="article-sm mod-horizontal mod-small mb-3 tag-small"
                :hide-image="true"
                :hide-tags="true"
                :track-clicks="true"
                :tracking-component="trackingComponent"
                :tracking-component-location="trackingComponentLocation"
                :tracking-component-position="slotProps.index + 3"
              >
                <v-card-metadata
                  :article="slotProps.item"
                  @link-click="$event => card.trackClick($event)"
                />
              </gothamist-card>
            </lazy-horizontal-drag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.left-feature {
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
    }
  }
  .v-hr:not(:last-child) {
    @include media('<xl') {
      border-right: 1px solid #ebebeb !important;
    }
  }
}
</style>

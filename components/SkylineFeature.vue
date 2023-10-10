<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import breakpoint from '@nypublicradio/nypr-design-system-vue3/src/assets/library/breakpoints.module.scss'
import { ref } from 'vue'
import type { ArticlePage } from '~~/composables/types/Page'

const props = defineProps<{
  collection: { label: string; data: ArticlePage[] }
  trackingComponentLocation: string
}>()
const trackingComponent = 'Skyline Feature'

const breakpoints = useBreakpoints({
  md: Number(breakpoint.md),
})
const smallerThanMd = ref(breakpoints.smaller('md'))
// Note: the skyline feature should display the first 3 stories in the content collection
const articleLg = ref(
  props.collection.data[0]
    ? normalizeArticlePage(props.collection.data[0])
    : null,
)
const articleMd = ref(
  props.collection.data[1]
    ? normalizeArticlePage(props.collection.data[1])
    : null,
)
const articleSm = ref(
  props.collection.data[2]
    ? normalizeArticlePage(props.collection.data[2])
    : null,
)

const featureLabel = ref(props.collection.label)
const isOneOnly = !articleMd.value && !articleSm.value
</script>

<template>
  <div v-if="articleLg">
    <div class="skyline-feature">
      <template v-if="featureLabel">
        <hr class="black">
        <p role="heading" aria-level="2" class="type-label3 mt-2 mb-4">
          {{ featureLabel }}
        </p>
      </template>
      <template v-else>
        <h2 class="sr-only">
          Featured
        </h2>
      </template>
      <div class="grid gutter-x-30 justify-content-center">
        <div
          class="col-12 lg:col-12 flex-order-0 xl:flex-order-3"
          :class="isOneOnly ? 'xl:col-12' : 'xl:col-6'"
        >
          <gothamist-card
            v-slot="card"
            :article="articleLg"
            class="primary article-lg mod-vertical mod-featured2 mod-large mb-4"
            :width="isOneOnly ? 1360 : 665"
            :height="isOneOnly ? 453 : 443"
            :ratio="isOneOnly ? [6, 2] : [3, 2]"
            loading="eager"
            :track-clicks="true"
            :tracking-component-location="trackingComponentLocation"
            :tracking-component="trackingComponent"
            :tracking-component-position="1"
          >
            <v-card-metadata
              class="mt-0 md:mt-2"
              alt-design
              :article="articleLg"
              @link-click="$event => card.trackClick($event)"
            />
          </gothamist-card>
        </div>
        <!-- need to wrap in ClientOnly for breakpoint to initially work -->
        <ClientOnly>
          <div
            v-if="articleMd"
            class="col-12 md:col-6 xl:col-3 flex-order-1 lg:flex-order-0"
          >
            <!-- md article desktop  -->
            <gothamist-card
              v-slot="card"
              :article="articleMd"
              class="secondary article-md mb-5 tag-small"
              :class="
                smallerThanMd
                  ? 'mod-horizontal mod-left'
                  : 'mod-vertical mod-large'
              "
              :width="318"
              :height="318"
              :ratio="[1, 1]"
              loading="eager"
              :track-clicks="true"
              :tracking-component-location="trackingComponentLocation"
              :tracking-component="trackingComponent"
              :tracking-component-position="2"
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
          </div>
          <div
            v-if="articleSm"
            class="col-12 md:col-6 xl:col-3 flex-order-2 lg:flex-order-1"
          >
            <!-- sm article desktop  -->
            <gothamist-card
              v-slot="card"
              :article="articleSm"
              class="secondary article-sm mb-5 tag-small secondary"
              :class="
                smallerThanMd
                  ? 'mod-horizontal mod-left'
                  : 'mod-vertical mod-large'
              "
              :width="318"
              :height="212"
              loading="eager"
              :track-clicks="true"
              :tracking-component-location="trackingComponentLocation"
              :tracking-component="trackingComponent"
              :tracking-component-position="3"
            >
              <p>
                {{ articleSm?.description }}
              </p>
              <v-card-metadata
                stack
                :article="articleSm"
                @link-click="$event => card.trackClick($event)"
              />
            </gothamist-card>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.skyline-feature {
  .v-card {
    &.primary.mod-featured2 {
      .card-details {
        .card-title {
          .v-tag {
            margin-top: 0;
            // line-height: var(--font-size-2);
            @include media('<lg') {
              margin-top: 11px;
            }
            @include media('<md') {
              margin-top: 0;
            }
          }
          .h2 {
            @include font-config($type-header3);
          }
        }
      }
    }
    &.secondary {
      .card-details {
        .card-title {
          .v-tag {
            margin-top: 0;
            line-height: var(--font-size-2);
            @include media('<md') {
              line-height: inherit;
            }
          }
          .h2 {
            font-size: var(--font-size-7);
            line-height: 21px;
          }
        }
      }
    }
  }
}
</style>

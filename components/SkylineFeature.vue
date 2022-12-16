<script setup>
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { useBreakpoints } from '@vueuse/core'
import breakpoint from '@nypublicradio/nypr-design-system-vue3/src/assets/library/breakpoints.module.scss'
import { ref } from 'vue'

const props = defineProps({
  collection: {
    type: Object,
    default: {},
    required: true,
  },
})

const breakpoints = useBreakpoints({
  md: Number(breakpoint.md),
})
const smallerThanMd = ref(breakpoints.smaller('md'))
// Note: the skyline feature should display the first 3 stories in the content collection
const articleLg = ref(
  props.collection.data[0]
    ? normalizeArticlePage(props.collection.data[0])
    : null
)
const articleMd = ref(
  props.collection.data[1]
    ? normalizeArticlePage(props.collection.data[1])
    : null
)
const articleSm = ref(
  props.collection.data[2]
    ? normalizeArticlePage(props.collection.data[2])
    : null
)

const featureLabel = ref(props.collection.label)
const isOneOnly = !articleMd.value && !articleSm.value
</script>

<template>
  <div v-if="articleLg">
    <div class="skyline-feature">
      <template v-if="featureLabel">
        <hr class="black" />
        <p role="heading" aria-level="2" class="type-label3 mt-2 mb-4">
          {{ featureLabel }}
        </p>
      </template>
      <div class="grid gutter-x-30 justify-content-center">
        <div
          class="col-12 lg:col-12 flex-order-0 xl:flex-order-3"
          :class="isOneOnly ? 'xl:col-12' : 'xl:col-6'"
        >
          <v-card
            class="primary article-lg mod-vertical mod-featured2 mod-large mb-4"
            :image="useImageUrl(articleLg?.listingImage)"
            :sizes="[1]"
            :ratio="isOneOnly ? [6, 2] : [3, 2]"
            :width="isOneOnly ? 1360 : 665"
            :height="isOneOnly ? 453 : 443"
            :title="articleLg?.listingTitle"
            :titleLink="articleLg?.link"
            :maxWidth="articleLg?.listingImage?.width"
            :maxHeight="articleLg?.listingImage?.height"
            :tags="[
              {
                name: articleLg?.section.name,
                slug: `/${articleLg?.section.slug}`,
              },
            ]"
            loading="eager"
          >
            <v-card-metadata
              class="mt-0 md:mt-2"
              altDesign
              :article="articleLg"
            />
          </v-card>
          <!-- <hr class="block xl:hidden mb-3" /> -->
        </div>
        <!-- need to wrap in ClientOnly for breakpoint to initially work -->
        <ClientOnly>
          <div
            v-if="articleMd"
            class="col-12 md:col-6 xl:col-3 flex-order-1 lg:flex-order-0"
          >
            <!-- md article desktop  -->
            <v-card
              class="secondary article-md mb-5 tag-small"
              :class="
                smallerThanMd
                  ? 'mod-horizontal mod-left'
                  : 'mod-vertical mod-large'
              "
              :image="useImageUrl(articleMd?.listingImage)"
              :title="articleMd?.listingTitle"
              :titleLink="articleMd?.link"
              :ratio="[1, 1]"
              :width="318"
              :height="318"
              :sizes="[1]"
              :maxWidth="articleMd?.listingImage?.width"
              :maxHeight="articleMd?.listingImage?.height"
              :tags="[
                {
                  name: articleMd?.section.name,
                  slug: `/${articleMd?.section.slug}`,
                },
              ]"
              loading="eager"
            >
              <p>
                {{ articleMd?.description }}
              </p>
              <v-card-metadata stack :article="articleMd" />
            </v-card>
          </div>
          <div
            v-if="articleSm"
            class="col-12 md:col-6 xl:col-3 flex-order-2 lg:flex-order-1"
          >
            <!-- sm article desktop  -->

            <v-card
              class="secondary article-sm mb-5 tag-small secondary"
              :class="
                smallerThanMd
                  ? 'mod-horizontal mod-left'
                  : 'mod-vertical mod-large'
              "
              :image="useImageUrl(articleSm?.listingImage)"
              :title="articleSm?.listingTitle"
              :titleLink="articleSm?.link"
              :ratio="[3, 2]"
              :width="318"
              :height="212"
              :sizes="[1]"
              :maxWidth="articleSm?.listingImage?.width"
              :maxHeight="articleSm?.listingImage?.height"
              :tags="[
                {
                  name: articleSm?.section.name,
                  slug: `/${articleSm?.section.slug}`,
                },
              ]"
              loading="eager"
            >
              <p>
                {{ articleSm?.description }}
              </p>
              <v-card-metadata stack :article="articleSm" />
            </v-card>
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

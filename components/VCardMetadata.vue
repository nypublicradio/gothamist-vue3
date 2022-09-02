<script setup>
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'
const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
  stack: {
    type: Boolean,
    default: false,
  },
  altDesign: {
    type: Boolean,
    default: false,
  },
  showComments: {
    type: Boolean,
    default: false, // setting to false untill we have support for comment counts
  },
  showDescription: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div
    v-if="props.article"
    class="article-metadata v-card-metadata"
    :class="[{ stack: props.stack }, { 'alt-design': props.altDesign }]"
  >
    <!-- default byline and comments -->
    <template v-if="!props.altDesign">
      <span>
        <v-byline
          :authors="props.article.authors || props.article.relatedAuthors"
        />
      </span>
      <span class="comments" v-if="!props.article.comments && showComments">
        {{ props.article.comments || '##' }} Comments
      </span>
    </template>

    <!-- alt design blurb, byline w/photos and comments -->
    <template v-else>
      <div class="grid w-full gutter-x-xxl flex-grow-1">
        <div v-if="showDescription" class="col-12 md:col-6 separator">
          <p class="desc">
            {{ props.article.description }}
          </p>
        </div>
        <div :class="showDescription ? 'col-12 md:col-6' : 'col-12'">
          <byline
            :article="props.article"
            :showSocial="false"
            :showComments="false"
          />
        </div>
        <span
          class="col-12 comments"
          v-if="!props.article.comments && showComments"
        >
          {{ props.article.comments || '##' }} Comments
        </span>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.v-card-metadata {
  @mixin stackComments {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    margin-top: 0;
    .comments {
      border: none;
      margin: 0;
      padding: 0;
    }
  }
  &.article-metadata {
    display: flex;
    align-items: center;

    .byline,
    .comments {
      line-height: 1rem;
    }
    @include media('<md') {
      @include stackComments;
    }
  }
  &.stack {
    @include stackComments;
  }
  &.alt-design {
    .separator {
      @include media('>md') {
        border-right: solid 1px var(--black300);
      }
    }
  }
  .v-byline {
    line-height: normal;
  }
}
</style>

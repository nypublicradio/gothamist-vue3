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
  showComments: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div
    v-if="props.article"
    class="article-metadata v-card-metadata"
    :class="[{ stack: props.stack }]"
  >
    <span>
      <v-byline :authors="article.authors || article.relatedAuthors" />
    </span>
    <!-- remove "!" and "|| '##'"" when we support comments -->
    <span class="comments" v-if="!article.comments && showComments">
      {{ article.comments || '##' }} Comments
    </span>
  </div>
</template>

<style lang="scss">
.v-card-metadata {
  @mixin stackComments {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
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
}
</style>

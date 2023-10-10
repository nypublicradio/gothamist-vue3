<script setup lang="ts">
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'
import { computed, ref } from 'vue'
import { useCommentCounts } from '~~/composables/comments'
import type { ArticlePage } from '~~/composables/types/Page.js'

const props = withDefaults(defineProps<{
  article?: ArticlePage
  stack?: boolean
  altDesign?: boolean
  showComments?: boolean
  showDescription?: boolean
}>(), {
  article: null,
  stack: false,
  altDesign: false,
  showComments: true,
  showDescription: true,
})

const emit = defineEmits<{
  (e: 'link-click', value: any): void
}>()

const commentCounts = ref(useCommentCounts())
const commentCount = computed(() => {
  return commentCounts.value[props.article.commentId]
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
        <VByline
          :authors="props.article.authors || props.article.relatedAuthors"
          @name-click="$event => emit('link-click', $event?.url)"
          @organization-click="$event => emit('link-click', $event?.url)"
        />
      </span>
      <span
        v-if="!props.article.disableComments && showComments && commentCount"
        class="comments"
      >
        <NuxtLink
          :to="{ path: props.article.link, hash: '#comments' }"
          @click="$event => emit('link-click', `${props.article.link}#comments`)"
        >{{ String(Number(commentCount)) }}
          {{ commentCount === 1 ? 'comment' : 'comments' }}</NuxtLink>
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
            :show-social="false"
            :show-comments="false"
            @link-click="$event => emit('link-click', $event)"
          />
        </div>
        <span
          v-if="!props.article.disableComments && showComments && commentCount"
          class="col-12 comments"
        >
          <NuxtLink
            :to="{ path: props.article.link, hash: '#comments' }"
            @click="$event => emit('link-click', `${props.article.link}#comments`)"
          >
            {{ String(Number(commentCount)) }}
            {{ commentCount === 1 ? 'comment' : 'comments' }}
          </NuxtLink>
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
  @include media('<md') {
    .gutter-x-xxl > .comments {
      display: inline-block;
      padding: 0 0.5rem;
    }
  }
}
</style>

<script setup lang="ts">
import { ArticlePage } from '~/composables/types/Page';
import useTrackSeen from '~/composables/useTrackSeen';
const props = defineProps<{
  article: ArticlePage
}>()
const emit = defineEmits<{
  (e: 'wall-dismissed' | 'wall-seen' | 'all-blocks-mounted'): void
}>()
const handleSeen = () => {
  emit('wall-seen')
}
const handleDismissed = () => {
  emit('wall-dismissed')
}
const handleArticleMounted = () => {
  emit('all-blocks-mounted')
}
const contentWallRef = ref()
useTrackSeen(contentWallRef, handleSeen)
</script>

<template>
  <ContentWall class="content-wall" @dismissed="handleDismissed">
    <template #full>
        <v-streamfield
          class="article-body"
          :streamfield-blocks="article.body"
          @all-blocks-mounted="handleArticleMounted"
        />
      </template>
      <template #leadin>
        <v-streamfield
          class="article-body leadin"
          :streamfield-blocks="article.body"
        />
      </template>
      <template #wall="wall">
        <div class="wall-wrapper" ref="contentWallRef">
          <NewsletterContentWall @wallCleared="wall.dismiss" />
        </div>
      </template>
    </ContentWall>
  </template>

  <style lang="scss">
  .content-wall {
    --content-wall-height: 550px;
    position: relative;
    min-height: var(--content-wall-height);
  }
  .leadin  {
    max-height: var(--content-wall-height);
    overflow: hidden;
  }
  .wall-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    height: var(--content-wall-height);
    background: linear-gradient(rgba(255,255,255,0) 5%, rgba(255,255,255,1) 200px);
    @include media(">large") {
      width: calc(100% - 330px - 15px);
    }
  }
  </style>
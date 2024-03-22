<script setup lang="ts">
import type { ArticlePage } from '~/composables/types/Page'
import useTrackSeen from '~/composables/useTrackSeen'

defineProps<{
  article: ArticlePage
}>()
const emit = defineEmits<(e: 'wallDismissed' | 'wallSeen' | 'allBlocksMounted') => void>()
function handleSeen() {
  emit('wallSeen')
}
function handleDismissed() {
  emit('wallDismissed')
}
function handleArticleMounted() {
  emit('allBlocksMounted')
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
      <div ref="contentWallRef" class="wall-wrapper">
        <NewsletterContentWall @wall-cleared="wall.dismiss" @sign-up="wall.signUp" />
      </div>
    </template>
  </ContentWall>
</template>

  <style lang="scss">
  .content-wall {
    --content-wall-height: 650px;
    @media only screen and (min-width: 410px) {
      --content-wall-height: 600px;
    }
    @media only screen and (min-width: 440px) {
      --content-wall-height: 550px;
    }
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
    background: linear-gradient(rgba(255,255,255,0) 5%, rgba(255,255,255,1) 155px);
    @include media(">large") {
      width: calc(100% - 330px - 15px);
    }
  }
  </style>

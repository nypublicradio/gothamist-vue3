<script setup lang="ts">
import { computed } from 'vue'
import type { EmbedBlock } from '../../composables/types/StreamfieldBlock'

const props = defineProps<{
  block: EmbedBlock
}>()

const embedType = computed(() => {
  if (props.block.value.embed.includes('blockquote class="twitter-tweet"'))
    return 'twitter-tweet'
  else if (props.block.value.embed.includes('blockquote class="tiktok-embed"'))
    return 'tiktok-embed'
  else if (props.block.value.embed.includes('blockquote class="instagram-media"'))
    return 'instagram-media'
  else if (props.block.value.embed.includes('https://www.youtube.com/embed'))
    return 'youtube-video'

  return 'default'
})

const minHeight = computed(() => {
  let height: string
  switch (embedType.value) {
    case 'tiktok-embed':
      height = '740'
      break
    case 'instagram-media':
      height = '620'
      break
    default:
      height = '200'
  }
  return height
})
</script>

<template>
  <StreamfieldEmbedDefault
    v-if="embedType === 'default' || embedType === 'youtube-video'"
    :key="`${block.id}-embed-default`"
    :class="[{ youtube: embedType === 'youtube-video' }]"
    :block="block"
  />
  <LoadLazily
    v-else
    :style="`min-height: ${minHeight}px`"
  >
    <LazyStreamfieldEmbedTweet
      v-if="embedType === 'twitter-tweet'"
      :key="`${block.id}-embed-tweet`"
      :block="block"
    />
    <LazyStreamfieldEmbedTiktok
      v-else-if="embedType === 'tiktok-embed'"
      :key="`${block.id}-tiktok-embed`"
      :block="block"
    />
    <LazyStreamfieldEmbedInstagram
      v-else-if="embedType === 'instagram-media'"
      :key="`${block.id}-instagram-media`"
      :block="block"
    />
  </LoadLazily>
</template>

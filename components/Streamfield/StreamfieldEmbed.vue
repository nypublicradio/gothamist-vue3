<script setup lang="ts">
import { computed, ref } from 'vue'
import { EmbedBlock } from '../../composables/types/StreamfieldBlock'
const props = defineProps<{
  block: EmbedBlock
}>()

const embedType = computed(() => {
  if (props.block.value.embed.includes('blockquote class="twitter-tweet"')) {
    return 'twitter-tweet'
  }
  else if (props.block.value.embed.includes('https://www.youtube.com/embed')) {
    return 'youtube-video'
  }
  return 'default'
})
</script>

<template>
  <LoadLazily>
    <LazyStreamfieldEmbedTweet
      v-if="embedType === 'twitter-tweet'"
      :key="`${block.id}-embed-tweet`"
      :block="block"
    />
    <LazyStreamfieldEmbedDefault
      v-else
      :class="[{ youtube: embedType === 'youtube-video' }]"
      :key="`${block.id}-embed-default`"
      :block="block"
    />
  </LoadLazily>
</template>

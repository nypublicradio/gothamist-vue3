<script setup lang="ts">
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import { ImageBlock } from '../../composables/types/StreamfieldBlock'
defineProps<{
  block: ImageBlock
}>()
</script>

<template>
  <v-image-with-caption
    v-if="block.value.image"
    class="mb-7"
    :image="useImageUrl(block.value.image)"
    :alt-text="block.value.image.alt"
    :maxWidth="block.value.image.width"
    :maxHeight="block.value.image.height"
    :description="block.value.caption || block.value.image.caption"
    :credit="block.value.image.credit"
    :credit-url="block.value.image.creditLink"
    :sizes="[2]"
    :ratio="[block.value.image.width, block.value.image.height]"
  />
</template>

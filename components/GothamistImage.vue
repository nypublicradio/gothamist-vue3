<!-- Placeholder Component-->
<script setup lang="ts">
import Image from '../composables/types/Image'
const props = defineProps<{
  image: Image
  width: number
  height?: number
}>()

const config = useRuntimeConfig()
const imageSizing = 'fill'

/* Using  the ratio between the image's actual width and the 
   requested display width, return the actual height scaled by 
   the same amount */
const deriveDisplayHeight = (displayWidth: number, image: Image): number => {
  const scaling = displayWidth / image.width
  return image.height * scaling
}

const displayWidth = props.width
const displayHeight = props.height || deriveDisplayHeight(props.width, props.image)
const imageUrl =`${config.IMAGE_BASE_URL}${props.image.id}/${imageSizing}-${displayWidth}x${displayHeight}/`
</script>
<template>
    <img :src="imageUrl" :width="displayWidth" :height="displayHeight" />
</template>
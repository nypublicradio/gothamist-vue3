<script setup lang="ts">
import BasicGiftImage from './BasicGiftImage.vue'
const props = defineProps({
  maxHeight: {
    type: String,
    default: '300px',
  },
  maxWidth: {
    type: String,
    default: '100%',
  },
})
</script>

<template>
  <div>
    <BasicGiftImage
      filename="rat-tote.webp"
      alt="Gothamist rat totes bag"
      :maxWidth="props.maxWidth"
      :maxHeight="props.maxHeight"
    />
  </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import BasicGiftImage from './BasicGiftImage.vue'
defineProps({
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
    <slot name="before" />
    <BasicGiftImage
      filename="rat-tote.webp"
      alt="Gothamist rat totes bag"
      :maxWidth="maxWidth"
      :maxHeight="maxHeight"
    />
    <slot name="after" />
  </div>
</template>

<style lang="scss" scoped></style>

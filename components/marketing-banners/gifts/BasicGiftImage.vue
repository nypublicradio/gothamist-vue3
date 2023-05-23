<script setup lang="ts">
defineProps({
  filename: {
    type: String,
    default: 'rat-tote.webp',
    required: true,
  },
  alt: {
    type: String,
    default: 'Gothamist tote bag',
    required: true,
  },
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
  <img
    class="product-item-image"
    :src="`/marketing-modal/${filename}`"
    :alt="alt"
  />
</template>

<style lang="scss" scoped>
.product-item-image {
  position: relative;
  max-height: v-bind(maxHeight);
  max-width: v-bind(maxWidth);
}
</style>

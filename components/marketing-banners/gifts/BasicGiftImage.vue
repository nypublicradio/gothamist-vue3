<script setup lang="ts">
const props = defineProps({
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
})
</script>

<template>
  <img
    class="product-item-image"
    :src="`/marketing-modal/${props.filename}`"
    :alt="props.alt"
  />
</template>

<style lang="scss" scoped>
.product-item-image {
  position: relative;
  max-height: 300px;
}
</style>

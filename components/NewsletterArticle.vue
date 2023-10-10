<script setup lang="ts">
const emit = defineEmits(['submit'])
</script>

<template>
  <div class="newsletter-article">
    <newsletter-home
      source="gothamist_articleBody"
      small
      :show-blurb="false"
      alt-design
      outlined
      submit-button-icon="pi-arrow-right"
      @submit="emit('submit')"
    />
  </div>
</template>

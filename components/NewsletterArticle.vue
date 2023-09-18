<script setup lang="ts">
const emit = defineEmits(['submit'])
</script>

<template>
  <div class="newsletter-article">
    <newsletter-home
      source='gothamist_articleBody'
      @submit="emit('submit')"
      small
      :showBlurb="false"
      altDesign
      outlined
      submitButtonIcon="pi-arrow-right"
    />
  </div>
</template>

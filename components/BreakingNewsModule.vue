<script setup lang="ts">
import VTag from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VTag.vue';
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

defineProps<{
  title: string
  link: string
}>()

</script>
<template>
  <div class="breaking news">
    <v-tag
      class="breaking-news-tag"
      name="Breaking News!"
    />
    <span class="breaking-news-title">{{ title }}</span>
    <VFlexibleLink :to=link>Read more</VFlexibleLink>
  </div>
</template>
<style lang="scss">
</style>
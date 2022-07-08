<script setup>
import { ref } from 'vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const props = defineProps({
  navData: {
    type: Object,
    default: null,
    required: true,
  },
})

const secondaryNavigation = ref(props.navData.secondaryNavigation)
</script>

<template>
  <div class="menu-list">
    <v-flexible-link
      v-for="(item, index) in secondaryNavigation"
      :to="item.value.url"
      :key="`secondaryNavigation-${index}`"
    >
      {{ item.value.title }}
    </v-flexible-link>
  </div>
</template>

<style lang="scss" scoped>
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @include media('<lg') {
    gap: 1rem;
  }
  .flexible-link {
    text-transform: uppercase;
    text-decoration: none;
    color: var(--white);
    @include font-config($type-label2);
  }
}
</style>

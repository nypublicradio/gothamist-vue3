<script setup lang="ts">
import NavigationLink from './NavigationLink'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

defineProps<{
  navLinks: NavigationLink[]
}>()
const emit = defineEmits(['menu-list-click'])
</script>

<template>
  <div class="menu-list">
    <v-flexible-link
      v-for="(item, index) in navLinks"
      :to="item.value.url"
      :key="`primaryFooterLinks-${item.value.title}-${index}`"
      @click="emit('menu-list-click', item.value.title)"
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
  @include media('<md') {
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

<script setup lang="ts">
import type { PropType } from 'vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import type NavigationLink from '~/composables/types/NavigationLink'

const props = defineProps({
  navLinks: {
    type: Object as PropType<NavigationLink[]>,
    required: true,
  },
  isHeader: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['menu-list-click'])
</script>

<template>
  <div class="menu" :class="[{ header: isHeader }]">
    <hr v-if="isHeader" class="line black mb-4">
    <div class="menu-list">
      <VFlexibleLink
        v-for="(item, index) in props.navLinks"
        :key="`primaryFooterLinks-${item.value.title}-${index}`"
        :to="item.value.url"
        @click="emit('menu-list-click', item.value.title)"
      >
        {{ item.value.title }}
      </VFlexibleLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  .menu-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-wrap: wrap;
    @include media('<md') {
      gap: 1rem;
    }
    width: 225px;
    @include media('>lg') {
      width: 300px;
    }
    .flexible-link {
      text-transform: uppercase;
      text-decoration: none;
      color: var(--white);
      @include font-config($type-label2);
    }
  }
  &.header {
    .menu-list {
      flex-direction: row;
      justify-content: center;
      width: 100%;
      gap: 2rem;
      .flexible-link {
        font-weight: var(--font-weight-500);
      }
    }
  }
}
</style>

<script setup lang="ts">
import { PropType } from 'vue'
import NavigationLink from '~/composables/types/NavigationLink'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

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
const route = useRoute()
const isHomePage = computed(() => route.path == '/')
</script>

<template>
  <div class="menu" :class="[{ header: isHeader }]">
    <hr v-if="isHeader" class="line black mb-4" />
    <div class="menu-list">
      <v-flexible-link
        v-for="(item, index) in props.navLinks"
        :to="item.value.url"
        :key="`primaryFooterLinks-${item.value.title}-${index}`"
        @click="emit('menu-list-click', item.value.title)"
      >
        {{ item.value.title }}
      </v-flexible-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  .menu-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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

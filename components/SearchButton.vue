<script setup>
import { ref } from 'vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search...',
  },
  expanded: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['onSearch', 'onNavigate'])
const route = useRoute()

const searchTerm = ref('')
const onSearch = () => {
  emit('onSearch', searchTerm.value)
  return navigateTo({ path: '/search', query: { q: searchTerm.value } })
}
</script>

<template>
  <div class="search-button">
    <span v-if="expanded" class="p-input-icon-right w-full">
      <i style="top: 14px">
        <v-flexible-link raw aria-hidden="true" tabindex="-1" @click="onSearch">
          <Button
            icon="pi pi-search"
            class="p-button p-component p-button-icon-only p-button-text p-button-rounded -mr-2"
            aria-label="Go to search page"
            aria-expanded="false"
          />
        </v-flexible-link>
      </i>
      <InputText
        class="w-full alt-design dark"
        type="text"
        :placeholder="props.placeholder"
        :aria-label="props.placeholder"
        v-model="searchTerm"
        name="search"
        @keypress.enter="onSearch"
      />
    </span>
    <v-flexible-link
      v-else
      :to="route.query.q ? '' : '/search'"
      raw
      aria-hidden="true"
      tabindex="-1"
      @click="emit('onNavigate')"
    >
      <Button
        icon="pi pi-search"
        class="p-button p-component p-button-icon-only p-button-text p-button-rounded -mr-2"
        aria-label="Go to search page"
        aria-expanded="false"
      />
    </v-flexible-link>
  </div>
</template>

<style lang="scss">
.search-button {
  .p-inputtext {
    font-size: 1.8rem;
    font-weight: 600;
    text-transform: uppercase;
  }
}
</style>

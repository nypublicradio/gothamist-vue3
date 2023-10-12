<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

defineProps({
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
function onSearch() {
  emit('onSearch', searchTerm.value)
  return navigateTo({ path: '/search', query: { q: searchTerm.value } })
}
</script>

<template>
  <div class="search-button">
    <span v-if="expanded" class="p-input-icon-right w-full">
      <InputText
        v-model="searchTerm"
        class="w-full alt-design dark"
        type="text"
        :placeholder="placeholder"
        :aria-label="placeholder"
        name="search"
        @keypress.enter="onSearch"
      />
      <i style="top: 14px">
        <VFlexibleLink raw aria-hidden="true" tabindex="-1" @click="onSearch">
          <Button
            icon="pi pi-search"
            class="p-button p-component p-button-icon-only p-button-text p-button-rounded -mr-2"
            :aria-label="
              searchTerm
                ? `See search results for ${searchTerm}`
                : 'Go to search page'
            "
            aria-expanded="false"
          />
        </VFlexibleLink>
      </i>
    </span>
    <VFlexibleLink
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
    </VFlexibleLink>
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

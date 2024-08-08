<script setup>
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

function goToSearch() {
  emit('onNavigate')
  return navigateTo({ path: route.query.q ? '' : '/search' })
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
        <Button
          icon="pi pi-search"
          class="p-button p-component p-button-icon-only p-button-text p-button-rounded -mr-2"
          :aria-label="
            searchTerm
              ? `See search results for ${searchTerm}`
              : 'Go to search page'
          "
          @click="onSearch"
        />
      </i>
    </span>
    <Button
      v-else
      icon="pi pi-search"
      class="p-button p-component p-button-icon-only p-button-text p-button-rounded -mr-2"
      aria-label="Go to search page"
      aria-expanded="false"
      @click="goToSearch"
    />
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

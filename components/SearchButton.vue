<script setup>
import { ref, computed, onMounted } from 'vue'
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

const emit = defineEmits(['onSearch'])
const router = useRouter()

// lifecycle hooks
onMounted(() => {})

const searchTerm = ref('')
const onSearch = () => {
  emit('onSearch', searchTerm.value)
  router.push({ path: '/search', query: { q: searchTerm.value } })
}
</script>

<template>
  <div class="search-button">
    <span v-if="expanded" class="p-input-icon-right w-full">
      <i style="top: 6px">
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
    <v-flexible-link v-else to="/search" raw aria-hidden="true" tabindex="-1">
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
    text-transform: uppercase;
  }
}
</style>

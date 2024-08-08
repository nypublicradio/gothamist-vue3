<script setup>
import VTag from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VTag.vue'

defineProps({
  tags: {
    type: Array,
    default: null,
  },
  label: {
    type: String,
    default: 'Tagged',
  },
})
const emit = defineEmits(['tag-click'])
</script>

<template>
  <div v-if="tags" class="tags flex align-items-start mb-4 md:mb-6">
    <p v-if="label" class="type-caption mr-3">
      {{ label }}
    </p>
    <div class="flex gap-1 align-items-center flex-wrap">
      <VTag
        v-for="tag in tags"
        :key="tag.name"
        class="tag-small"
        :name="tag.name"
        :slug="`/tags/${tag.slug}`"
        @click="emit('tag-click', tag)"
      />
    </div>
  </div>
</template>

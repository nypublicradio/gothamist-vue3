<script setup>
import VTag from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VTag.vue'

const props = defineProps({
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
  <div v-if="props.tags" class="tags flex align-items-start mb-4 md:mb-6">
    <p v-if="props.label" class="type-caption mr-3">
      {{ props.label }}
    </p>
    <div class="flex gap-1 align-items-center flex-wrap">
      <VTag
        v-for="tag in props.tags"
        :key="tag.name"
        class="tag-small"
        :name="tag.name"
        :slug="`/tags/${tag.slug}`"
        @click="emit('tag-click', tag)"
      />
    </div>
  </div>
</template>

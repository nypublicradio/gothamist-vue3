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
const emit = defineEmits(['tag-clicked'])
</script>

<template>
  <div v-if="props.tags" class="tags flex align-items-start mb-4 md:mb-6">
    <p v-if="props.label" class="type-caption mr-3 mt-0 lg:mt-1">
      {{ props.label }}
    </p>
    <div class="flex gap-1 align-items-center flex-wrap">
      <v-tag
        v-for="tag in props.tags"
        :name="tag.name"
        :slug="`/news`"
        :key="tag.name"
        @click="emit('tag-clicked', tag)"
      />
    </div>
  </div>
</template>

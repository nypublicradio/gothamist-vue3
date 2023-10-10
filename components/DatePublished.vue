<script setup>
import { ref } from 'vue'
import { formatDateForByline, fuzzyDateTime } from '~/utilities/date'

const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
  fuzzy: {
    type: Boolean,
    default: false,
  },
  showPrefix: {
    type: Boolean,
    default: true,
  },
  typeClass: {
    type: String,
    default: 'type-caption',
  },
  prefix: {
    type: String,
    default: 'Published ',
  },
  prefixModified: {
    type: String,
    default: 'Modified ',
  },
})

// function to format the date based on being fuzzy or showing the prefix
function createDateLine(date, prefix) {
  if (date) {
    if (props.fuzzy)
      return `${prefix}${fuzzyDateTime(date)}`
    else
      return `${prefix}${formatDateForByline(date)}`
  }
  return null
}
const prefix = ref(props.showPrefix ? props.prefix : '')
const prefixModified = ref(props.showPrefix ? props.prefixModified : '')

const date = ref(createDateLine(props.article?.publicationDate, prefix.value))
const modifiedDate = ref(
  createDateLine(props.article?.updatedDate, prefixModified.value),
)
</script>

<template>
  <div class="date-published">
    <p :class="props.typeClass">
      {{ date }}
    </p>
    <p v-if="modifiedDate" :class="props.typeClass">
      {{ modifiedDate }}
    </p>
  </div>
</template>

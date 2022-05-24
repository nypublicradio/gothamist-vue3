<script setup lang="ts">
defineProps<{
  html?: string
}>()
onMounted (() => {
    const root = ref(null)
    const element = root.value
    const parent = element.parentNode

    // Move all children node to the parent
    while (element.firstChild) {
    element.firstChild.classList?.add('streamfield-block', 'o-rte-text')
    parent.insertBefore(element.firstChild, element)
    }

    // `element` becomes an empty element
    // Remove it from the parent
    parent.removeChild(element)
})
</script>

<template>
  <div class="o-rte-text" ref="root">
    <div v-html="html" />
  </div>
</template>

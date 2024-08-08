<script setup lang="ts">
const props = withDefaults(defineProps<{
  options?: {
    root?: HTMLElement
    rootMargin?: string
    threshold?: number | number[]
  }
}>(), {
  options() {
    return {
      root: null,
      rootMargin: '0px 0px 400px 0px',
      threshold: 0,
    }
  },
})
const element = ref(null)
const seen = ref(false)
function onVisible() {
  seen.value = true
}
function onNotVisible() { /* do nothing */ }
useVisibilityTracking(element, onVisible, onNotVisible, props.options)
</script>

<template>
  <div ref="element">
    <div v-if="seen">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{
    options?: {
      root?: HTMLElement
      rootMargin?: string
      threshold?: number | number[]
    }
  }>(), {
    options: {
      root: null,
      rootMargin: '1000px 0px 0px 0px',
      threshold: 0
    }
  })
  const element = ref(null)
  const seen = ref(false)
  const onVisible = () => {seen.value = true}
  const onNotVisible = () => { /*do nothing*/ }
  useVisibilityTracking(element, onVisible, onNotVisible, props.options )
</script>

<template>
  <div ref="element">
      <slot :seen="seen"/>
  </div>
</template>
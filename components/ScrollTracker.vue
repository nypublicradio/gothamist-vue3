<script setup lang="ts">
const props = defineProps<{
  scrollTarget: string
}>()

const scrollPercentage = ref(0)

const handleScroll = function () {
  const currentScrollPosition = window.scrollY

  let target = document.querySelector(props.scrollTarget) as HTMLElement
  if (!target)
    target = document.body

  let distanceToTargetBottom = target.offsetHeight + target.offsetTop
  let parent = target.offsetParent as HTMLElement
  while (parent) {
    distanceToTargetBottom += parent.offsetTop
    parent = parent.offsetParent as HTMLElement
  }
  const windowHeight = window.innerHeight
  const progress = currentScrollPosition / (distanceToTargetBottom - windowHeight)
  const percent = Math.min(Math.max(0, progress * 100), 100)

  scrollPercentage.value = percent
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <slot :scroll-percentage="scrollPercentage" />
</template>

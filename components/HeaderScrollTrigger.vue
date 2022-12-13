<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { useBreakpoints } from '@vueuse/core'
import { useCurrentHeaderAdHeight } from '~/composables/states'
import breakpoint from '@nypublicradio/nypr-design-system-vue3/src/assets/library/breakpoints.module.scss'
const props = defineProps({
  headerClass: {
    type: String,
    default: 'fixed-header',
  },
  triggerClass: {
    type: String,
    default: 'default-slot-holder',
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const breakpoints = useBreakpoints({
  md: Number(breakpoint.md),
})
const uid = `scrollTriggerID${Math.floor(Math.random() * 100001)}`
const smallerThanMd = breakpoints.smaller('md')
const currentHeaderAdHeight = useCurrentHeaderAdHeight()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  setTimeout(() => {
    gsap.to(`.${props.headerClass}`, {
      duration: 0.25,
      opacity: 1,
      display: 'block',
      ease: 'linear',
      scrollTrigger: {
        trigger: `.${props.triggerClass}`,
        id: uid,
        //markers: true,
        start: () =>
          `top ${smallerThanMd.value ? currentHeaderAdHeight.value : '90'}px`,
        toggleActions: 'restart complete pause reverse',
      },
    })
  }, 100)
})

onBeforeUnmount(() => {
  ScrollTrigger.getById(uid).kill()
})
const refreshScrollTrigger = () => {
  const scrollTriggerSelector = ScrollTrigger.getById(uid)
  if (scrollTriggerSelector) {
    scrollTriggerSelector.refresh()
  }
}
watch([currentHeaderAdHeight, route], (height) => {
  refreshScrollTrigger()
})
</script>

<template>
  <div class="scroll-trigger" :class="[{ hidden: props.isHidden }]">
    <slot />
  </div>
</template>

<style lang="scss">
.scroll-trigger {
  &.hidden {
    visibility: hidden;
    pointer-events: none;
  }
}
</style>

<script setup>
import { gsap } from 'gsap'

const props = defineProps({
  shadow: {
    type: Boolean,
    default: false,
  },
})
const shirt1 = ref(null)
const shirt2 = ref(null)
const shirt3 = ref(null)
const shirt4 = ref(null)

let tl = null
const initAnimation = () => {
  tl = gsap.timeline({ delay: 0.5, repeat: -1 })
  tl.to(shirt1.value, { delay: 1.5, opacity: 0 })
    .to(shirt2.value, { opacity: 1 }, '-=1')
    .to(shirt2.value, { delay: 1.5, opacity: 0 })
    .to(shirt3.value, { opacity: 1 }, '-=1')
    .to(shirt3.value, { delay: 1.5, opacity: 0 })
    .to(shirt4.value, { opacity: 1 }, '-=1')
    .to(shirt4.value, { delay: 1.5, opacity: 0 })
    .to(shirt1.value, { opacity: 1 }, '-=1')
}
onMounted(async () => {
  await nextTick()
  initAnimation()
})
onBeforeUnmount(() => {
  if (tl) {
    tl.pause()
    tl.kill()
  }
})
defineExpose({ initAnimation })
</script>

<template>
  <div>
    <div class="shirts" :class="[{ shadow: props.shadow }]">
      <img
        ref="shirt1"
        class="shirt"
        src="/marketing-modal/shirt-gray.webp"
        alt="gray shirt"
      />
      <img
        ref="shirt2"
        class="shirt"
        src="/marketing-modal/shirt-red.webp"
        alt="red shirt"
      />
      <img
        ref="shirt3"
        class="shirt"
        src="/marketing-modal/shirt-white.webp"
        alt="white shirt"
      />
      <img
        ref="shirt4"
        class="shirt"
        src="/marketing-modal/shirt-green.webp"
        alt="green shirt"
      />
      <img
        class="placeholder"
        src="/marketing-modal/shirt-gray.webp"
        alt="gray shirt"
      />
    </div>
  </div>
</template>

<style lang="scss">
.shirts {
  position: relative;
  &.shadow {
    -webkit-filter: drop-shadow(0px 0px 5px rgb(117, 117, 117));
    filter: drop-shadow(0px 0px 5px rgb(117, 117, 117));
  }
  img {
    position: absolute;
    opacity: 0;
    width: 100%;
    max-width: 400px;
    &:first-child {
      opacity: 1;
    }
    &.placeholder {
      position: relative;
      opacity: 0;
    }
  }
}
</style>

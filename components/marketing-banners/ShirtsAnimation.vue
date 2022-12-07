<script setup>
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  //   propVar: {
  //     type: Boolean,
  //     default: false,
  //   },
})

//const emit = defineEmits(["change", "click"]);

// lifecycle hooks
const initAnimation = () => {
  setTimeout(() => {
    tl = gsap.timeline({ repeat: -1 })
    tl.to('#shirt1', { delay: 1, opacity: 0 })
      .to('#shirt2', { opacity: 1 }, '-=0.5')
      .to('#shirt2', { delay: 1, opacity: 0 })
      .to('#shirt3', { opacity: 1 }, '-=0.5')
      .to('#shirt3', { delay: 1, opacity: 0 })
      .to('#shirt4', { opacity: 1 }, '-=0.5')
      .to('#shirt4', { delay: 1, opacity: 0 })
      .to('#shirt1', { opacity: 1 }, '-=0.5')
  }, 500)
}
defineExpose({ initAnimation })
</script>

<template>
  <div>
    <div class="shirts">
      <img
        id="shirt1"
        class="shirt"
        src="/marketing-modal/shirt-gray.webp"
        alt="gray shirt"
      />
      <img
        id="shirt2"
        class="shirt"
        src="/marketing-modal/shirt-red.webp"
        alt="red shirt"
      />
      <img
        id="shirt3"
        class="shirt"
        src="/marketing-modal/shirt-white.webp"
        alt="white shirt"
      />
      <img
        id="shirt4"
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
  -webkit-filter: drop-shadow(0px 0px 5px rgb(117, 117, 117));
  filter: drop-shadow(0px 0px 5px rgb(117, 117, 117));
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

<script setup>
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Draggable } from '~/assets/gsap/Draggable.js'
import { InertiaPlugin } from '~/assets/gsap/InertiaPlugin.js'

const props = defineProps({
  articles: {
    type: Array,
    default: [],
  },
})

const isMobile = ref(false)

onMounted(() => {
  // draggable setup
  if (window.innerWidth < 768 && articles) {
    isMobile.value = true
    setTimeout(() => {
      gsap.registerPlugin(InertiaPlugin)
      gsap.registerPlugin(Draggable)
      Draggable.create('.horz-scroll-content', {
        type: 'x',
        edgeResistance: 0.45,
        bounds: '.horz-scroll',
        inertia: true,
      })
    }, 1000)
  }
})
onBeforeUnmount(() => {
  // kill draggable
  if (isMobile.value) {
    Draggable.get('.horz-scroll-content').kill()
  }
})
</script>

<template>
  <div>
    <hr
      class="my-5"
      :class="isMobile ? 'block xl:hidden' : 'hidden sm:block xl:hidden'"
    />
    <div class="horz-scroll-holder" :class="[{ mobile: isMobile }]">
      <div class="horz-scroll">
        <div class="grid gutter-x-xl keep-gutter horz-scroll-content">
          <div
            v-for="article in articles"
            :key="article.id"
            class="v-hr flex"
            :class="
              isMobile
                ? ' col-4 xl:col-12 xl:flex-column'
                : 'col-12 sm:col-4 xl:col-12 flex-column sm:flex-row xl:flex-column'
            "
          >
            <hr
              class="w-full mb-3"
              :class="isMobile ? 'hidden xl:block' : 'block sm:hidden xl:block'"
            />
            <slot :isMobile="isMobile" :article="article" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.horz-scroll-holder.mobile {
  position: relative;
  @include media('<md') {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
    &:after {
      content: '';
      z-index: 1;
      pointer-events: none;
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      height: 100%;
      width: 100%;
      background: -moz-linear-gradient(
        left,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 10%,
        rgba(255, 255, 255, 0) 65%,
        rgba(255, 255, 255, 1) 100%
      );
      background: -webkit-linear-gradient(
        left,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 10%,
        rgba(255, 255, 255, 0) 65%,
        rgba(255, 255, 255, 1) 100%
      );
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 10%,
        rgba(255, 255, 255, 0) 65%,
        rgba(255, 255, 255, 1) 100%
      );
    }
  }
  .horz-scroll {
    overflow-x: hidden;
    @include media('<md') {
      //overflow-x: scroll;

      .horz-scroll-content {
        padding: 0 24px;
        width: 733px;
      }
    }
  }
}
</style>

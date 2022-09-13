<script setup>
const blockerDetected = useBlockerDetected()
</script>

<template>
  <div class="htl-ad-holder">
    <div v-if="blockerDetected">
      backup ad here, need to detect available width to see what version promo
      ad to load
    </div>
    <slot v-else />
  </div>
</template>

<style lang="scss">
.htl-ad-holder {
}
</style>

<script setup lang="ts">
const showContent = ref(false)
const dismiss = () => {
  showContent.value = true
}
</script>

<template>
  <div>
    <slot v-if="showContent" name="full" />
    <slot v-if="!showContent" name="leadin" />
    <slot v-if="!showContent" name="wall" :dismiss="dismiss" />
  </div>
</template>

<style lang="scss">
</style>
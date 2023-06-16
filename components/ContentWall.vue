<script setup lang="ts">
const showContent = ref(false)
const emit = defineEmits<{
  (e: 'dismissed'):void
}>()

const dismiss = () => {
  showContent.value = true
  emit('dismissed')
}

</script>

<template>
  <div>
    <slot v-if="showContent" name="full" />
    <slot v-if="!showContent" name="leadin" />
    <slot v-if="!showContent" name="wall" :dismiss="dismiss" />
  </div>
</template>
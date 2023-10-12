<script setup lang="ts">
const emit = defineEmits<(e: 'signUp' | 'dismissed') => void>()
const showContent = ref(false)
function signUp() {
  emit('signUp')
}

function dismiss() {
  showContent.value = true
  emit('dismissed')
}
</script>

<template>
  <div>
    <slot v-if="showContent" name="full" />
    <slot v-if="!showContent" name="leadin" />
    <slot v-if="!showContent" name="wall" :dismiss="dismiss" :sign-up="signUp" />
  </div>
</template>

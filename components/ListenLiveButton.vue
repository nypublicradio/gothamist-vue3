<script setup>
import { ref, computed, onMounted } from 'vue'
import { useIsEpisodePlaying, useTogglePlayTrigger } from '~/composables/states'
import { getLiveStream } from '~~/composables/data/liveStream'
const props = defineProps({
  label: {
    type: String,
    default: 'Listen Live',
  },
})

const emit = defineEmits(['stream-button-click'])

const isEpisodePlaying = useIsEpisodePlaying()
const togglePlayTrigger = useTogglePlayTrigger()

let gotStream = false

const togglePlay = async () => {
  if (!gotStream) {
    await getLiveStream('wnyc-fm939')
    gotStream = true
  }
  emit('stream-button-click')
  togglePlayTrigger.value = !togglePlayTrigger.value
}

// lifecycle hooks
onMounted(() => {})
</script>

<template>
  <div class="listen-live-button">
    <Button
      class="p-button-rounded p-button-danger w-full flex justify-content-center"
      @click="togglePlay"
    >
      <div class="flex align-items-center">
        <img
          v-if="isEpisodePlaying"
          alt="pause icon"
          src="pause.svg"
          class="mr-2"
        />
        <img v-else alt="play icon" src="play.svg" class="mr-2" />
        <img alt="WNYC logo" src="wnyc-logo-white.svg" class="mr-2" />
        {{ props.label }}
      </div>
    </Button>
  </div>
</template>

<style lang="scss">
.listen-live-button {
}
</style>

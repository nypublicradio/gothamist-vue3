<script setup>
import { ref, computed, onMounted } from 'vue'
import { useIsEpisodePlaying, useTogglePlayTrigger } from '~/composables/states'

const props = defineProps({
  label: {
    type: String,
    default: 'Listen Live',
  },
})

const isEpisodePlaying = useIsEpisodePlaying()

const togglePlay = () => {
  console.log('togglePlay')
  isEpisodePlaying.value = !isEpisodePlaying.value
}

//const emit = defineEmits(["change", "click"]);

// lifecycle hooks
onMounted(() => {})
</script>

<template>
  <div>
    <div class="listen-live-button">
      <Button class="p-button-rounded p-button-danger" @click="togglePlay">
        <img
          v-if="isEpisodePlaying"
          alt="pause icon"
          src="pause.svg"
          class="mr-2"
        />
        <img v-else alt="play icon" src="play.svg" class="mr-2" />
        <img alt="WNYC logo" src="wnyc-logo-white.svg" class="mr-2" />
        {{ props.label }}
      </Button>
    </div>
  </div>
</template>

<style lang="scss">
.listen-live-button {
}
</style>

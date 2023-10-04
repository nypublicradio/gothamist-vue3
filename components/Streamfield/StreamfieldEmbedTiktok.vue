<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core';
import { EmbedBlock } from '~~/composables/types/StreamfieldBlock';
import { computed, ref } from 'vue'

const props = defineProps<{
    block: EmbedBlock
}>()

const el = ref(null)

onMounted(() => {
    const js = document.createElement('script')
    js.src = 'https://www.tiktok.com/embed.js'
    el.value.appendChild(js)
})

</script>

<template>
    <div
    class="streamfield-embed streamfield-embed-tiktok streamfield-paragraph mb-7"
    v-html="block.value.embed"
    ref="el"
    />
</template>

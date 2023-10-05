<script setup lang="ts">
import { EmbedBlock } from '~~/composables/types/StreamfieldBlock';
import { ref } from 'vue'

defineProps<{
    block: EmbedBlock
}>()

const el = ref(null)

onMounted(() => {
    const js = document.createElement('script')
    js.src = '//www.instagram.com/embed.js'
    el.value.appendChild(js)
})

</script>

<template>
    <div
    class="streamfield-embed streamfield-embed- instagram streamfield-paragraph mb-7"
    v-html="block.value.embed"
    ref="el"
    />
</template>

<style lang="scss">
.streamfield-embed {
    .instagram-media {
        @include media('<lg') {
        margin: auto !important;
        }
    }
}
</style>
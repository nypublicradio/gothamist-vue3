<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core';
import { EmbedBlock } from '~~/composables/types/StreamfieldBlock';
import { computed, ref } from 'vue'
const props = defineProps<{
    block: EmbedBlock
}>()
const el = ref(null)

const isDark = usePreferredDark()

const tweetId = computed(() => {
    const matches = props.block.value.embed.match(/\/status\/(\d+)/)
    if (matches?.length > 1) {
    return matches[1]
    }
    return ''
})

onMounted(() => {
    // start with the original
    el.value.innerHTML = props.block.value.embed
    if (window.twttr) {
        window.twttr.widgets.createTweet(tweetId.value, el.value, {theme: isDark.value ? 'dark' : 'light'})
        .then((createdTweetEmbed) => {
            // remove the original blockquote if the tweet embed was created succesfully
            const original = el.value?.querySelector('blockquote.twitter-tweet')
            if (createdTweetEmbed && original) {
                original.parentNode.removeChild(original)
            }
        })
    }
})
</script>

<template>
    <div
    class="streamfield-embed streamfield-embed-tweet mb-7"
    ref="el"
    />
</template>

<style lang="scss">
.streamfield-embed {
    .twitter-tweet {
    max-width: 100% !important;
        @include media('<lg') {
            justify-content: center;
        }
        iframe {
            width: 550px !important;
            max-width: 100% !important;
            flex-grow: unset !important;
        }
    }
}
</style>
    
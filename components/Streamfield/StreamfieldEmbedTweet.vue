<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core';
import { EmbedBlock } from '~~/composables/types/StreamfieldBlock';
import { computed, ref } from 'vue'

const props = defineProps<{
    block: EmbedBlock
}>()
const el = ref(null)

const isDark = usePreferredDark()

const tweetRegExp = /<blockquote class="twitter-tweet.*?\/status\/(\d+)\?.*?\/blockquote>/g
const tweetIds = computed(() => {
    return [...props.block.value.embed.matchAll(tweetRegExp)].map(matches => matches[1])
})

// Remove tweet scripts included with blocks in the cms payload so they can't
// interfere, we're handling this manually
function stripTweetScripts(stringToStrip) {
    const tweetScriptMatcher = /<script async(="")? src="https:\/\/platform.twitter.com\/widgets.js" charset="utf-8"><\/script>/g
    return stringToStrip.replaceAll(tweetScriptMatcher, '')
}

// find the blockquote element for an unexpanded tweet embed
function findTweetElement(tweetId) {
    return [...el.value.querySelectorAll('blockquote.twitter-tweet')].filter(tweet => tweet.outerHTML.includes(tweetId))[0]
}

// replace a tweet blockquote with the expanded embed
function replaceTweet(tweetId) {
    return new Promise((resolve) => {
        if (window.twttr) {
            const originalTweetElement = findTweetElement(tweetId)
            if (!originalTweetElement) {
               resolve('error finding tweet element')
               return;
            }
            const newTweetDiv = document.createElement('DIV')
            originalTweetElement.parentNode.insertBefore(newTweetDiv, originalTweetElement)
            originalTweetElement.parentNode.removeChild(originalTweetElement);
            window.twttr.widgets.createTweet(tweetId, newTweetDiv, {theme: isDark.value ? 'dark' : 'light'})
            .then(createdTweet => {
                if (!createdTweet) {
                    newTweetDiv.parentNode.insertBefore(originalTweetElement, newTweetDiv)
                }
            })
            .catch(e => resolve(e))
            .finally(resolve(newTweetDiv))
        }
    })
}

onMounted(async () => {
    el.value.innerHTML = stripTweetScripts(props.block.value.embed)
    if (window.twttr) {
        await nextTick()
        const promises = tweetIds.value.map(id => {return replaceTweet(id)})
        Promise.all(promises)
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
    